// GPS Tracking Ingestion Edge Function
// Covers ALS-50 (GPS ping endpoint) — Supabase Realtime broadcasts to subscribers automatically
// ALS-51 (public tracking) is handled by the web frontend reading from tracking_events via Realtime
// ALS-74 (mask provider phone) is handled in deliveries/index.ts

import { corsHeaders, corsResponse, json, error } from '../_shared/cors.ts';
import { verifyJwt, adminClient } from '../_shared/auth.ts';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return corsResponse();

  const jwt = await verifyJwt(req);
  if (!jwt || !['provider', 'admin'].includes(jwt.role)) {
    return error('UNAUTHORIZED', 'Provider auth required', 401);
  }

  const db = adminClient();

  if (req.method === 'POST') {
    const { delivery_id, latitude, longitude } = await req.json();

    if (!delivery_id || latitude == null || longitude == null) {
      return error('INVALID_REQUEST', 'delivery_id, latitude, and longitude are required', 400);
    }

    // Verify the delivery belongs to this provider
    if (jwt.role === 'provider') {
      const { data: delivery } = await db
        .from('deliveries')
        .select('provider_id, status')
        .eq('id', delivery_id)
        .single();

      if (!delivery || delivery.provider_id !== jwt.providerId) {
        return error('FORBIDDEN', 'Delivery not assigned to this provider', 403);
      }
      if (!['assigned', 'picked_up', 'in_transit'].includes(delivery.status)) {
        return error('INVALID_REQUEST', 'Cannot track a delivery with status: ' + delivery.status, 422);
      }
    }

    // Insert tracking event — Supabase Realtime will broadcast this to all subscribers
    const { data, error: insertErr } = await db.from('tracking_events').insert({
      delivery_id,
      event_type: 'gps_ping',
      latitude,
      longitude,
    }).select().single();

    if (insertErr) return error('INTERNAL_ERROR', insertErr.message, 500);

    // Update provider's last known position
    if (jwt.providerId) {
      await db.from('provider_availability').update({
        current_lat: latitude,
        current_lng: longitude,
        last_ping_at: new Date().toISOString(),
      }).eq('provider_id', jwt.providerId);
    }

    return json({ tracked: true, event_id: data.id });
  }

  return error('NOT_FOUND', 'Route not found', 404);
});
