// AgriLink External Integration API
// ALS-226: SSRF protection on webhook_url
// ALS-228: Direct DB insert instead of service-role proxy
// ALS-223: Idempotency keys, GET /v1/deliveries list, phone validation
// ALS-221: POST /v1/clients/register — self-service onboarding

import { corsHeaders, corsResponse, json, error } from '../_shared/cors.ts';
import { verifyApiKey, adminClient } from '../_shared/auth.ts';
import { withMetrics } from '../_shared/metrics.ts';
import { healthCheck } from '../_shared/health.ts';
import { checkRateLimit } from '../_shared/rateLimit.ts';

const E164_REGEX = /^\+[1-9]\d{7,14}$/;

Deno.serve(withMetrics('external-api', async (req) => {
  if (req.method === 'OPTIONS') return corsResponse();

  const url = new URL(req.url);
  if (req.method === 'GET' && url.pathname.endsWith('/health')) return healthCheck('external-api');

  const segments = url.pathname.replace('/external-api', '').split('/').filter(Boolean);
  const db = adminClient();

  // ─── POST /v1/clients/register — self-service (ALS-221, no auth required) ──
  if (req.method === 'POST' && segments[1] === 'clients' && segments[2] === 'register') {
    const { company_name, email, use_case, tier } = await req.json();

    if (!company_name || !email) {
      return error('INVALID_REQUEST', 'company_name and email are required', 400);
    }

    // Check email uniqueness
    const { data: existing } = await db.from('clients').select('id').eq('email', email).single();
    if (existing) return error('CONFLICT', 'An account with this email already exists', 409);

    // Generate API key
    const rawKey = `lop_${Array.from(crypto.getRandomValues(new Uint8Array(24)))
      .map((b) => b.toString(16).padStart(2, '0')).join('')}`;
    const prefix = rawKey.slice(0, 8);

    // Hash with SHA-256
    const hashBytes = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(rawKey));
    const apiKeyHash = Array.from(new Uint8Array(hashBytes)).map((b) => b.toString(16).padStart(2, '0')).join('');

    const subscriptionTier = ['starter', 'growth', 'enterprise'].includes(tier ?? '') ? tier : 'starter';

    const { data: client, error: insertErr } = await db.from('clients').insert({
      name: company_name,
      email,
      company_name,
      use_case,
      api_key_hash: apiKeyHash,
      api_key_prefix: prefix,
      subscription_tier: subscriptionTier,
      is_active: true,
    }).select('id, name, email, subscription_tier, created_at').single();

    if (insertErr) return error('INTERNAL_ERROR', insertErr.message, 500);

    return json({
      client_id: client.id,
      api_key: rawKey,
      subscription_tier: client.subscription_tier,
      message: 'Save your API key — it will not be shown again',
    }, 201);
  }

  // All remaining routes require API key auth
  const apiCtx = await verifyApiKey(req);
  if (!apiCtx) return error('UNAUTHORIZED', 'Invalid or missing X-API-Key', 401);

  // ALS-211/222: Enforce per-tier rate limits
  const rateLimited = await checkRateLimit(apiCtx.clientId, apiCtx.tier);
  if (rateLimited) return rateLimited;

  const clientId = apiCtx.clientId;

  // ─── POST /v1/deliveries ──────────────────────────────────────────────────
  if (req.method === 'POST' && segments[1] === 'deliveries' && segments.length === 2) {
    const idempotencyKey = req.headers.get('X-Idempotency-Key');

    // ALS-223: Return cached response for duplicate idempotency key
    if (idempotencyKey) {
      const { data: cached } = await db.from('idempotency_keys')
        .select('response, status_code')
        .eq('key', idempotencyKey)
        .eq('client_id', clientId)
        .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
        .single();

      if (cached) {
        return new Response(JSON.stringify(cached.response), {
          status: cached.status_code,
          headers: { ...corsHeaders, 'Content-Type': 'application/json', 'X-Idempotent-Replayed': 'true' },
        });
      }
    }

    const body = await req.json();
    const { pickup, dropoff, package: pkg, urgency, client_reference } = body;

    if (!pickup?.address || !pickup?.latitude || !pickup?.longitude ||
        !dropoff?.address || !dropoff?.latitude || !dropoff?.longitude) {
      return error('INVALID_REQUEST', 'pickup and dropoff with address and coordinates are required', 400);
    }

    // ALS-223: Phone number validation (E.164 format)
    if (pickup.contact_phone && !E164_REGEX.test(pickup.contact_phone)) {
      return error('INVALID_REQUEST', 'pickup.contact_phone must be E.164 format (e.g. +2348012345678)', 400);
    }
    if (dropoff.contact_phone && !E164_REGEX.test(dropoff.contact_phone)) {
      return error('INVALID_REQUEST', 'dropoff.contact_phone must be E.164 format (e.g. +2348012345678)', 400);
    }

    const distKm = haversine(pickup.latitude, pickup.longitude, dropoff.latitude, dropoff.longitude);
    const deliveryFee = Math.max(Math.round(distKm * 250), 1500);
    const commissionRate = 0.065;
    const commissionAmount = Math.round(deliveryFee * commissionRate);
    const providerPayout = deliveryFee - commissionAmount;
    const trackingToken = crypto.randomUUID();
    const trackingUrl = `${Deno.env.get('APP_URL')}/public-track/${trackingToken}`;

    const { data: delivery, error: insertErr } = await db.from('deliveries').insert({
      client_id:             clientId,
      client_reference,
      status:                'pending',
      pickup_address:        pickup.address,
      pickup_lat:            pickup.latitude,
      pickup_lng:            pickup.longitude,
      pickup_contact_name:   pickup.contact_name,
      pickup_contact_phone:  pickup.contact_phone,
      dropoff_address:       dropoff.address,
      dropoff_lat:           dropoff.latitude,
      dropoff_lng:           dropoff.longitude,
      dropoff_contact_name:  dropoff.contact_name,
      dropoff_contact_phone: dropoff.contact_phone,
      package_type:          pkg?.type,
      package_weight_kg:     pkg?.weight_kg,
      package_description:   pkg?.description,
      requires_cold_chain:   pkg?.requires_cold_chain ?? false,
      urgency:               urgency ?? 'standard',
      delivery_fee:          deliveryFee,
      commission_amount:     commissionAmount,
      provider_payout:       providerPayout,
      tracking_url:          trackingUrl,
    }).select().single();

    if (insertErr) return error('INTERNAL_ERROR', insertErr.message, 500);

    EdgeRuntime.waitUntil(
      fetch(`${Deno.env.get('SUPABASE_URL')}/functions/v1/decision-engine`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}`,
        },
        body: JSON.stringify({ delivery_id: delivery.id }),
      }),
    );

    const responseBody = {
      delivery_id: delivery.id,
      status: 'PENDING',
      tracking_url: trackingUrl,
      estimated_assignment_time: new Date(Date.now() + 30_000).toISOString(),
      created_at: delivery.created_at,
    };

    // Store idempotency key result
    if (idempotencyKey) {
      await db.from('idempotency_keys').insert({
        key: idempotencyKey,
        client_id: clientId,
        response: responseBody,
        status_code: 201,
      }).on('conflict', (qb: any) => qb.nothing());
    }

    return json(responseBody, 201);
  }

  // ─── GET /v1/deliveries (list with filters + pagination — ALS-223) ─────────
  if (req.method === 'GET' && segments[1] === 'deliveries' && segments.length === 2) {
    const status   = url.searchParams.get('status');
    const fromDate = url.searchParams.get('from_date');
    const toDate   = url.searchParams.get('to_date');
    const limit    = Math.min(Math.max(parseInt(url.searchParams.get('limit') ?? '20'), 1), 100);
    const offset   = Math.max(parseInt(url.searchParams.get('offset') ?? '0'), 0);

    let query = db
      .from('deliveries')
      .select('id, status, client_reference, tracking_url, delivery_fee, urgency, created_at, assigned_at, delivered_at', { count: 'exact' })
      .eq('client_id', clientId)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (status) query = query.eq('status', status.toLowerCase());
    if (fromDate) query = query.gte('created_at', fromDate);
    if (toDate) query = query.lte('created_at', toDate);

    const { data, count, error: qErr } = await query;
    if (qErr) return error('INTERNAL_ERROR', qErr.message, 500);

    return json({ deliveries: data, total: count, limit, offset });
  }

  // ─── GET /v1/deliveries/:id/status ─────────────────────────────────────────
  if (req.method === 'GET' && segments[1] === 'deliveries' && segments[3] === 'status') {
    const deliveryId = segments[2];
    const { data } = await db.from('deliveries')
      .select('id, status, client_reference, assigned_at, picked_up_at, delivered_at, tracking_url')
      .eq('id', deliveryId)
      .eq('client_id', clientId)
      .single();

    if (!data) return error('NOT_FOUND', 'Delivery not found', 404);
    return json({ delivery_id: data.id, status: data.status.toUpperCase(), ...data });
  }

  // ─── POST /v1/webhooks/register ────────────────────────────────────────────
  if (req.method === 'POST' && segments[1] === 'webhooks' && segments[2] === 'register') {
    const { webhook_url, webhook_secret } = await req.json();
    if (!webhook_url) return error('INVALID_REQUEST', 'webhook_url is required', 400);

    const ssrfError = validateWebhookUrl(webhook_url);
    if (ssrfError) return error('INVALID_WEBHOOK_URL', ssrfError, 400);

    await db.from('clients').update({ webhook_url, webhook_secret }).eq('id', clientId);
    return json({ registered: true, webhook_url });
  }

  return error('NOT_FOUND', 'Route not found', 404);
}));

function validateWebhookUrl(rawUrl: string): string | null {
  let parsed: URL;
  try { parsed = new URL(rawUrl); } catch { return 'webhook_url must be a valid URL'; }

  if (parsed.protocol !== 'https:') return 'webhook_url must use HTTPS';

  const host = parsed.hostname.toLowerCase();
  const blocked = ['localhost', '0.0.0.0', 'metadata.google.internal', '[::1]', '::1'];
  if (blocked.includes(host)) return `webhook_url hostname "${host}" is not allowed`;

  const ipv4 = parseIpv4(host);
  if (ipv4) {
    const [a, b] = ipv4;
    if (a === 10) return 'Private IP range not allowed (10.x.x.x)';
    if (a === 127) return 'Loopback IP not allowed (127.x.x.x)';
    if (a === 169 && b === 254) return 'Link-local IP not allowed (169.254.x.x)';
    if (a === 192 && b === 168) return 'Private IP range not allowed (192.168.x.x)';
    if (a === 172 && b >= 16 && b <= 31) return 'Private IP range not allowed (172.16–31.x.x)';
    if (a === 0) return 'IP 0.x.x.x not allowed';
  }
  return null;
}

function parseIpv4(host: string): [number, number, number, number] | null {
  const parts = host.split('.');
  if (parts.length !== 4) return null;
  const nums = parts.map(Number);
  if (nums.some((n) => isNaN(n) || n < 0 || n > 255)) return null;
  return nums as [number, number, number, number];
}

function haversine(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = toRad(lat2 - lat1), dLng = toRad(lng2 - lng1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
function toRad(d: number) { return d * Math.PI / 180; }
