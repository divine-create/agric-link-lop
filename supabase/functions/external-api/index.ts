// AgriLink External Integration API
// Covers ALS-29 (AgriLink integration), ALS-65 (E2E test entry point)
// Entry points used by AgriLink to submit deliveries and poll status

import { corsHeaders, corsResponse, json, error } from '../_shared/cors.ts';
import { verifyApiKey, adminClient } from '../_shared/auth.ts';
import { withMetrics } from '../_shared/metrics.ts';

Deno.serve(withMetrics('external-api', async (req) => {
  if (req.method === 'OPTIONS') return corsResponse();

  const url = new URL(req.url);
  const segments = url.pathname.replace('/external-api', '').split('/').filter(Boolean);
  // Expected paths: /v1/deliveries, /v1/deliveries/:id/status, /v1/webhooks/register

  const apiCtx = await verifyApiKey(req);
  if (!apiCtx) return error('UNAUTHORIZED', 'Invalid or missing X-API-Key', 401);

  const db = adminClient();
  const clientId = apiCtx.clientId;

  // ─── POST /v1/deliveries ──────────────────────────────────────────────
  if (req.method === 'POST' && segments[1] === 'deliveries' && segments.length === 2) {
    // Delegate to internal deliveries function with client context injected
    const body = await req.json();
    const internalRes = await fetch(`${Deno.env.get('SUPABASE_URL')}/functions/v1/deliveries`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Use service role to bypass auth — clientId is set in body
        'Authorization': `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}`,
        'X-Client-Id': clientId,
      },
      body: JSON.stringify({ ...body, _client_id: clientId }),
    });
    return new Response(await internalRes.text(), {
      status: internalRes.status,
      headers: corsHeaders,
    });
  }

  // ─── GET /v1/deliveries/:id/status ─────────────────────────────────────
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

  // ─── POST /v1/webhooks/register ────────────────────────────────────────
  if (req.method === 'POST' && segments[1] === 'webhooks' && segments[2] === 'register') {
    const { webhook_url, webhook_secret } = await req.json();
    if (!webhook_url) return error('INVALID_REQUEST', 'webhook_url is required', 400);

    await db.from('clients').update({ webhook_url, webhook_secret }).eq('id', clientId);
    return json({ registered: true, webhook_url });
  }

  return error('NOT_FOUND', 'Route not found', 404);
}));
