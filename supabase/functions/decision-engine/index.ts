// Decision Engine Edge Function
// Covers ALS-17 (eligibility filter, scoring, assignment, retry timer)

import { json } from '../_shared/cors.ts';
import { adminClient } from '../_shared/auth.ts';
import { withMetrics } from '../_shared/metrics.ts';

const MIN_SCORE = 60;
const ACCEPTANCE_TIMER_MS = 120_000;
const PERISHABLE_TIMER_MS = 60_000;
const MAX_RETRIES = 3;

const URGENCY_RADIUS: Record<string, number> = {
  urgent: 5, standard: 20, scheduled: 50,
};

const WEIGHTS = {
  proximity: 0.30, reliability: 0.25, cost: 0.20, capacity: 0.15, load: 0.10,
};

Deno.serve(withMetrics('decision-engine', async (req) => {
  const { delivery_id, excluded_provider_ids = [], attempt = 1 } = await req.json();
  const db = adminClient();

  // Fetch delivery
  const { data: delivery } = await db.from('deliveries').select('*').eq('id', delivery_id).single();
  if (!delivery || delivery.status !== 'pending') return json({ skipped: true });

  const maxRadius = URGENCY_RADIUS[delivery.urgency] ?? 20;
  const isPerishable = delivery.package_type === 'perishable' || delivery.requires_cold_chain;

  // Fetch eligible providers with availability
  const { data: providers } = await db
    .from('providers')
    .select('*, provider_availability(*)')
    .eq('status', 'active')
    .not('id', 'in', `(${excluded_provider_ids.join(',') || 'null'})`)
    .eq('provider_availability.is_available', true);

  if (!providers?.length) {
    await escalateToOps(db, delivery_id, 'No eligible providers found');
    return json({ assigned: false, reason: 'NO_PROVIDERS_AVAILABLE' });
  }

  // Filter by hard constraints + haversine radius
  const eligible = providers
    .filter((p: any) => {
      const avail = p.provider_availability?.[0];
      if (!avail?.is_available) return false;
      if (delivery.requires_cold_chain && !p.cold_chain_certified) return false;
      const dist = haversine(
        avail.current_lat, avail.current_lng,
        delivery.pickup_lat, delivery.pickup_lng,
      );
      return dist <= maxRadius;
    })
    .map((p: any) => ({
      ...p,
      avail: p.provider_availability[0],
      distKm: haversine(
        p.provider_availability[0].current_lat,
        p.provider_availability[0].current_lng,
        delivery.pickup_lat, delivery.pickup_lng,
      ),
    }));

  if (!eligible.length) {
    await escalateToOps(db, delivery_id, 'No providers within radius after filtering');
    return json({ assigned: false, reason: 'NO_PROVIDERS_AVAILABLE' });
  }

  // Score each provider
  const scored = eligible.map((p: any) => {
    let proximityScore = Math.max(0, 1 - p.distKm / maxRadius) * 100;
    if (isPerishable) proximityScore = Math.min(100, proximityScore * 1.2);

    const reliabilityScore = Math.min(100, p.reliability_score);
    const costScore = 80; // placeholder until dynamic quoting (ALS-TODO)
    const capacityScore = p.vehicle_types?.length > 0 ? 100 : 0;
    const loadScore = Math.max(0, 100 - p.avail.active_count * 20);

    return {
      provider: p,
      score:
        proximityScore * WEIGHTS.proximity +
        reliabilityScore * WEIGHTS.reliability +
        costScore * WEIGHTS.cost +
        capacityScore * WEIGHTS.capacity +
        loadScore * WEIGHTS.load,
    };
  })
    .filter((s: any) => s.score >= MIN_SCORE)
    .sort((a: any, b: any) => b.score - a.score);

  if (!scored.length) {
    await escalateToOps(db, delivery_id, 'All providers scored below threshold');
    return json({ assigned: false, reason: 'NO_PROVIDERS_AVAILABLE' });
  }

  // 5% random assignment for learning (A/B)
  const top =
    Math.random() < 0.05
      ? scored[Math.floor(Math.random() * Math.min(scored.length, 3))]
      : scored[0];

  const providerId = top.provider.id;

  // Assign delivery + record status change
  await db.from('deliveries').update({
    provider_id: providerId,
    status: 'assigned',
    assigned_at: new Date().toISOString(),
  }).eq('id', delivery_id);

  await db.from('provider_availability')
    .update({ active_count: (top.provider.avail.active_count ?? 0) + 1 })
    .eq('provider_id', providerId);

  await db.from('tracking_events').insert({
    delivery_id,
    event_type: 'status_change',
    status: 'assigned',
    metadata: { provider_id: providerId, score: top.score, attempt },
  });

  // Notify provider
  EdgeRuntime.waitUntil(
    fetch(`${Deno.env.get('SUPABASE_URL')}/functions/v1/notifications`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}`,
      },
      body: JSON.stringify({ event: 'delivery.assigned', delivery_id, provider_id: providerId }),
    }),
  );

  // Schedule 120s acceptance timeout (ALS-17 retry logic)
  const timerMs = isPerishable ? PERISHABLE_TIMER_MS : ACCEPTANCE_TIMER_MS;
  if (attempt < MAX_RETRIES) {
    EdgeRuntime.waitUntil(
      new Promise<void>((resolve) => setTimeout(resolve, timerMs)).then(async () => {
        const { data: current } = await db
          .from('deliveries')
          .select('status, provider_id')
          .eq('id', delivery_id)
          .single();

        if (current?.status === 'assigned' && current.provider_id === providerId) {
          await fetch(`${Deno.env.get('SUPABASE_URL')}/functions/v1/decision-engine`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}`,
            },
            body: JSON.stringify({
              delivery_id,
              excluded_provider_ids: [...excluded_provider_ids, providerId],
              attempt: attempt + 1,
            }),
          });
        }
      }),
    );
  } else {
    // attempt === MAX_RETRIES — all 3 providers timed out or declined
    EdgeRuntime.waitUntil(
      new Promise<void>((resolve) => setTimeout(resolve, timerMs)).then(async () => {
        const { data: current } = await db
          .from('deliveries')
          .select('status, provider_id')
          .eq('id', delivery_id)
          .single();

        if (current?.status === 'assigned' && current.provider_id === providerId) {
          await escalateToOps(db, delivery_id, 'All 3 providers declined or timed out');
        }
      }),
    );
  }

  return json({ assigned: true, provider_id: providerId, score: top.score });
}));

async function escalateToOps(db: any, deliveryId: string, reason: string) {
  await db.from('deliveries').update({ status: 'failed' }).eq('id', deliveryId);
  await db.from('tracking_events').insert({
    delivery_id: deliveryId,
    event_type: 'status_change',
    status: 'failed',
    metadata: { ops_alert: true, reason },
  });
}

function haversine(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function toRad(d: number) {
  return (d * Math.PI) / 180;
}
