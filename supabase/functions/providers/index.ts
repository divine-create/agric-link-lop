// Provider Registry Edge Function
// Covers ALS-19 (registration, approval), ALS-20 (availability toggle + nearby search)

import { corsResponse, json, error } from '../_shared/cors.ts';
import { verifyJwt, adminClient } from '../_shared/auth.ts';
import { withMetrics } from '../_shared/metrics.ts';

Deno.serve(withMetrics('providers', async (req) => {
  if (req.method === 'OPTIONS') return corsResponse();

  const url = new URL(req.url);
  const segments = url.pathname.replace('/providers', '').split('/').filter(Boolean);
  const providerId = segments[0];
  const action = segments[1]; // 'availability' | 'verify'

  const jwt = await verifyJwt(req);
  const isAdmin = jwt?.role === 'admin';
  const db = adminClient();

  // ─── POST /providers/register (public — no auth required) ───────────────────
  if (req.method === 'POST' && segments[0] === 'register') {
    const body = await req.json();
    const { name, phone, email, vehicle_types, cold_chain_certified, bank_account_number, bank_code, coverage_zones } = body;

    if (!name || !phone || !vehicle_types?.length) {
      return error('INVALID_REQUEST', 'name, phone, and vehicle_types are required', 400);
    }

    const { data: provider, error: insertErr } = await db
      .from('providers')
      .insert({
        name, phone, email, vehicle_types,
        cold_chain_certified: cold_chain_certified ?? false,
        bank_account_number, bank_code, coverage_zones,
        status: 'pending_review',
      })
      .select().single();

    if (insertErr) return error('INTERNAL_ERROR', insertErr.message, 500);

    await db.from('provider_availability').insert({ provider_id: provider.id });

    return json({ provider_id: provider.id, status: 'pending_review' }, 201);
  }

  // ─── POST /providers/:id/verify (admin only) ─────────────────────────────
  if (req.method === 'POST' && providerId && action === 'verify') {
    if (!isAdmin) return error('FORBIDDEN', 'Admin access required', 403);

    const { approved, reason } = await req.json();
    const newStatus = approved ? 'active' : 'inactive';

    await db.from('providers').update({ status: newStatus }).eq('id', providerId);

    EdgeRuntime.waitUntil(
      fetch(`${Deno.env.get('SUPABASE_URL')}/functions/v1/notifications`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}`,
        },
        body: JSON.stringify({
          event: approved ? 'provider.approved' : 'provider.rejected',
          provider_id: providerId,
          reason,
        }),
      }),
    );

    return json({ provider_id: providerId, status: newStatus });
  }

  // ─── PATCH /providers/availability (ALS-20) ───────────────────────────────
  // Provider JWT required. Upserts a single row per provider_id.
  if (req.method === 'PATCH' && segments[0] === 'availability') {
    if (!jwt || jwt.role !== 'provider') return error('FORBIDDEN', 'Provider auth required', 403);

    const { is_available, latitude, longitude } = await req.json();

    await db.from('provider_availability').upsert(
      {
        provider_id: jwt.providerId,
        is_available: is_available ?? false,
        current_lat: latitude ?? null,
        current_lng: longitude ?? null,
        last_ping_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'provider_id' },
    );

    return json({ provider_id: jwt.providerId, is_available });
  }

  // ─── GET /providers (nearby active+available providers — ALS-20) ──────────
  // Client or admin JWT required.
  // Query params: latitude, longitude, radius_km (default 20), status (admin only)
  if (req.method === 'GET' && !providerId) {
    if (!jwt) return error('UNAUTHORIZED', 'Authentication required', 401);

    const lat = parseFloat(url.searchParams.get('latitude') ?? '0');
    const lng = parseFloat(url.searchParams.get('longitude') ?? '0');
    const radiusKm = parseFloat(url.searchParams.get('radius_km') ?? '20');
    const statusFilter = url.searchParams.get('status') ?? 'active';

    if (statusFilter !== 'active' && !isAdmin) {
      return error('FORBIDDEN', 'Admin access required to filter by non-active status', 403);
    }

    const query = db
      .from('providers')
      .select('*, provider_availability(*)')
      .eq('status', statusFilter);

    // For the active list, only return available providers (ALS-20 requirement)
    const { data: providers } = statusFilter === 'active'
      ? await query.eq('provider_availability.is_available', true)
      : await query;

    const nearby = (providers ?? [])
      .filter((p: any) => {
        const avail = p.provider_availability?.[0];
        // For active list: double-check is_available (the .eq filter above is a PostgREST join filter)
        if (statusFilter === 'active' && !avail?.is_available) return false;
        return true;
      })
      .map((p: any) => {
        const avail = p.provider_availability?.[0];
        const dist = avail?.current_lat != null
          ? haversine(lat, lng, avail.current_lat, avail.current_lng)
          : Infinity;
        return { ...p, distance_km: Math.round(dist * 10) / 10, is_available: avail?.is_available ?? false };
      })
      .filter((p: any) => statusFilter !== 'active' || p.distance_km <= radiusKm)
      .sort((a: any, b: any) => a.distance_km - b.distance_km);

    return json({ providers: nearby, total: nearby.length });
  }

  // ─── GET /providers/:id ───────────────────────────────────────────────────
  if (req.method === 'GET' && providerId) {
    if (!jwt) return error('UNAUTHORIZED', 'Authentication required', 401);
    const { data } = await db.from('providers').select('*, provider_availability(*)').eq('id', providerId).single();
    if (!data) return error('NOT_FOUND', 'Provider not found', 404);
    return json(data);
  }

  return error('NOT_FOUND', 'Route not found', 404);
}));

function haversine(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
