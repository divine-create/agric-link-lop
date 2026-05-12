// Weekly Settlement Cron Edge Function
// Covers ALS-62 (aggregate deliveries + compute net payout per provider)
// Schedule via Supabase pg_cron: SELECT cron.schedule('weekly-settlement', '0 17 * * 5', $$...$$)

import { json } from '../_shared/cors.ts';
import { adminClient } from '../_shared/auth.ts';

const COMMISSION_RATES: Record<string, number> = {
  starter: 0.08, growth: 0.065, enterprise: 0.045,
};

Deno.serve(async (_req) => {
  const db = adminClient();
  const now = new Date();

  // Settlement period: last 7 days
  const periodEnd   = new Date(now);
  periodEnd.setHours(17, 0, 0, 0); // 5pm WAT
  const periodStart = new Date(periodEnd);
  periodStart.setDate(periodStart.getDate() - 7);

  // Fetch all delivered deliveries in period
  const { data: deliveries } = await db
    .from('deliveries')
    .select('id, provider_id, delivery_fee, commission_amount, provider_payout')
    .eq('status', 'delivered')
    .gte('delivered_at', periodStart.toISOString())
    .lt('delivered_at', periodEnd.toISOString())
    .not('provider_id', 'is', null);

  if (!deliveries?.length) return json({ message: 'No deliveries to settle this period' });

  // Group by provider
  const byProvider: Record<string, typeof deliveries> = {};
  for (const d of deliveries) {
    if (!byProvider[d.provider_id]) byProvider[d.provider_id] = [];
    byProvider[d.provider_id].push(d);
  }

  const totalPayout = deliveries.reduce((sum, d) => sum + (d.provider_payout ?? 0), 0);

  // Create settlement record
  const { data: settlement } = await db.from('payment_settlements').insert({
    period_start:     periodStart.toISOString().split('T')[0],
    period_end:       periodEnd.toISOString().split('T')[0],
    total_deliveries: deliveries.length,
    total_payout:     totalPayout,
    status:           'processing',
  }).select().single();

  // Create payout record per provider and initiate transfer
  const payoutPromises = Object.entries(byProvider).map(async ([providerId, provDeliveries]) => {
    const gross  = provDeliveries.reduce((s, d) => s + (d.delivery_fee ?? 0), 0);
    const deductions = provDeliveries.reduce((s, d) => s + (d.commission_amount ?? 0), 0);
    const net    = gross - deductions;

    const { data: payout } = await db.from('provider_payouts').insert({
      settlement_id:  settlement.id,
      provider_id:    providerId,
      delivery_count: provDeliveries.length,
      gross_amount:   gross,
      deductions,
      net_amount:     net,
      status:         'pending',
    }).select().single();

    // Trigger Paystack transfer
    await fetch(`${Deno.env.get('SUPABASE_URL')}/functions/v1/payments/transfer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}`,
      },
      body: JSON.stringify({
        provider_payout_id: payout.id,
        provider_id: providerId,
        amount_naira: net,
      }),
    });
  });

  await Promise.allSettled(payoutPromises);

  // Mark settlement completed
  await db.from('payment_settlements').update({ status: 'completed', processed_at: new Date().toISOString() })
    .eq('id', settlement.id);

  return json({
    settlement_id:    settlement.id,
    providers_paid:   Object.keys(byProvider).length,
    total_deliveries: deliveries.length,
    total_payout:     totalPayout,
  });
});
