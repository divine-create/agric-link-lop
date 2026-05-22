// Delivery CRUD Edge Function
// Covers ALS-40 (POST), ALS-41 (GET), ALS-42 (DELETE/cancel), ALS-72 (state machine)

import { corsHeaders, corsResponse, json, error } from '../_shared/cors.ts';
import { verifyJwt, verifyApiKey, adminClient } from '../_shared/auth.ts';

const VALID_TRANSITIONS: Record<string, string[]> = {
  pending:    ['assigned', 'cancelled'],
  assigned:   ['picked_up', 'cancelled'],
  picked_up:  ['in_transit'],
  in_transit: ['delivered', 'failed'],
  delivered:  [],
  failed:     [],
  cancelled:  [],
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return corsResponse();

  const url = new URL(req.url);
  const segments = url.pathname.replace('/deliveries', '').split('/').filter(Boolean);
  const deliveryId = segments[0];
  const action = segments[1]; // e.g. 'cancel'

  // Auth: accept either JWT (internal) or API key (AgriLink external)
  const jwt = await verifyJwt(req);
  const apiKeyCtx = jwt ? null : await verifyApiKey(req);
  if (!jwt && !apiKeyCtx) return error('UNAUTHORIZED', 'Invalid or missing credentials', 401);

  const clientId = jwt?.clientId ?? apiKeyCtx?.clientId;
  const isAdmin = jwt?.role === 'admin';
  const db = adminClient();

  // ─── POST /deliveries ───────────────────────────────────────────────
  if (req.method === 'POST' && !deliveryId) {
    const body = await req.json();
    const { pickup, dropoff, package: pkg, urgency, callback_url, client_reference } = body;

    if (!pickup?.address || !pickup?.latitude || !pickup?.longitude ||
        !dropoff?.address || !dropoff?.latitude || !dropoff?.longitude) {
      return error('INVALID_REQUEST', 'pickup and dropoff with address and coordinates are required', 400);
    }

    // Calculate fee
    const distKm = haversine(pickup.latitude, pickup.longitude, dropoff.latitude, dropoff.longitude);
    const deliveryFee = Math.max(Math.round(distKm * 250), 1500);
    const commissionRate = 0.065; // growth tier default
    const commissionAmount = Math.round(deliveryFee * commissionRate);
    const providerPayout = deliveryFee - commissionAmount;

    const trackingToken = crypto.randomUUID();
    const trackingUrl = `${Deno.env.get('APP_URL')}/public-track/${trackingToken}`;

    const { data: delivery, error: insertErr } = await db
      .from('deliveries')
      .insert({
        client_id:           clientId,
        client_reference,
        status:              'pending',
        pickup_address:      pickup.address,
        pickup_lat:          pickup.latitude,
        pickup_lng:          pickup.longitude,
        pickup_contact_name: pickup.contact_name,
        pickup_contact_phone: pickup.contact_phone,
        dropoff_address:      dropoff.address,
        dropoff_lat:          dropoff.latitude,
        dropoff_lng:          dropoff.longitude,
        dropoff_contact_name: dropoff.contact_name,
        dropoff_contact_phone: dropoff.contact_phone,
        package_type:         pkg?.type,
        package_weight_kg:    pkg?.weight_kg,
        package_description:  pkg?.description,
        requires_cold_chain:  pkg?.requires_cold_chain ?? false,
        urgency:              urgency ?? 'standard',
        delivery_fee:         deliveryFee,
        commission_amount:    commissionAmount,
        provider_payout:      providerPayout,
        tracking_url:         trackingUrl,
      })
      .select()
      .single();

    if (insertErr) return error('INTERNAL_ERROR', insertErr.message, 500);

    // Trigger decision engine asynchronously
    EdgeRuntime.waitUntil(
      fetch(`${Deno.env.get('SUPABASE_URL')}/functions/v1/decision-engine`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}`,
        },
        body: JSON.stringify({ delivery_id: delivery.id }),
      })
    );

    return json({
      delivery_id:              delivery.id,
      status:                   'PENDING',
      tracking_url:             trackingUrl,
      estimated_assignment_time: new Date(Date.now() + 30_000).toISOString(),
      created_at:               delivery.created_at,
    }, 201);
  }

  // ─── GET /deliveries ────────────────────────────────────────────────
  if (req.method === 'GET' && !deliveryId) {
    const status    = url.searchParams.get('status');
    const fromDate  = url.searchParams.get('from_date');
    const toDate    = url.searchParams.get('to_date');
    const limit     = Math.min(parseInt(url.searchParams.get('limit') ?? '20'), 100);
    const offset    = parseInt(url.searchParams.get('offset') ?? '0');

    let query = db.from('deliveries').select('*', { count: 'exact' });

    if (!isAdmin) query = query.eq('client_id', clientId);
    if (status)   query = query.eq('status', status.toLowerCase());
    if (fromDate) query = query.gte('created_at', fromDate);
    if (toDate)   query = query.lte('created_at', toDate);

    const { data, error: qErr, count } = await query
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (qErr) return error('INTERNAL_ERROR', qErr.message, 500);
    return json({ deliveries: data, total: count, limit, offset });
  }

  // ─── GET /deliveries/:id ────────────────────────────────────────────
  if (req.method === 'GET' && deliveryId) {
    let query = db.from('deliveries').select(`
      *,
      providers(id, name, phone, vehicle_types),
      tracking_events(latitude, longitude, event_type, status, recorded_at)
    `).eq('id', deliveryId);

    if (!isAdmin) query = query.eq('client_id', clientId);

    const { data, error: qErr } = await query.single();
    if (qErr) return error('NOT_FOUND', 'Delivery not found', 404);

    // Mask provider phone (ALS-74)
    if (data.providers) {
      data.providers.phone = '+234-LOP-SUPPORT';
    }

    return json(data);
  }

  // ─── PATCH /deliveries/:id/status ───────────────────────────────────────
  if (req.method === 'PATCH' && deliveryId) {
    const { status: newStatus } = await req.json();

    const { data: current } = await db.from('deliveries').select('status, client_id').eq('id', deliveryId).single();
    if (!current) return error('NOT_FOUND', 'Delivery not found', 404);
    if (!isAdmin && current.client_id !== clientId) return error('FORBIDDEN', 'Access denied', 403);

    // State machine guard (ALS-72)
    const allowed = VALID_TRANSITIONS[current.status] ?? [];
    if (!allowed.includes(newStatus)) {
      return error('INVALID_REQUEST',
        `Cannot transition from ${current.status} to ${newStatus}. Allowed: ${allowed.join(', ')}`, 422);
    }

    const timestamps: Record<string, string> = {};
    if (newStatus === 'assigned')   timestamps.assigned_at  = new Date().toISOString();
    if (newStatus === 'picked_up')  timestamps.picked_up_at = new Date().toISOString();
    if (newStatus === 'delivered')  timestamps.delivered_at = new Date().toISOString();

    const { data: updated } = await db.from('deliveries')
      .update({ status: newStatus, ...timestamps })
      .eq('id', deliveryId)
      .select().single();

    // Fire webhook async
    EdgeRuntime.waitUntil(
      fetch(`${Deno.env.get('SUPABASE_URL')}/functions/v1/webhooks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}`,
        },
        body: JSON.stringify({
          delivery_id: deliveryId,
          previous_status: current.status,
          new_status: newStatus,
        }),
      })
    );

    return json(updated);
  }

  // ─── DELETE /deliveries/:id (cancel) ────────────────────────────────────
  if (req.method === 'DELETE' && deliveryId) {
    const { data: current } = await db.from('deliveries').select('status, client_id').eq('id', deliveryId).single();
    if (!current) return error('NOT_FOUND', 'Delivery not found', 404);
    if (!isAdmin && current.client_id !== clientId) return error('FORBIDDEN', 'Access denied', 403);

    const cancellable = ['pending', 'assigned'];
    if (!cancellable.includes(current.status)) {
      return error('DELIVERY_NOT_CANCELLABLE',
        `Cannot cancel a delivery with status: ${current.status}`, 422);
    }

    await db.from('deliveries').update({ status: 'cancelled' }).eq('id', deliveryId);

    EdgeRuntime.waitUntil(
      fetch(`${Deno.env.get('SUPABASE_URL')}/functions/v1/notifications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}` },
        body: JSON.stringify({ event: 'delivery.cancelled', delivery_id: deliveryId }),
      })
    );

    return json({ delivery_id: deliveryId, status: 'cancelled', cancelled_at: new Date().toISOString() });
  }

  return error('NOT_FOUND', 'Route not found', 404);
});

function haversine(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a = Math.sin(dLat/2)**2 + Math.cos(toRad(lat1))*Math.cos(toRad(lat2))*Math.sin(dLng/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}
function toRad(d: number) { return d * Math.PI / 180; }
