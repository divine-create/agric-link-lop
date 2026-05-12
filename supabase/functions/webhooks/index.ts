// Outbound Webhook Delivery Edge Function
// Covers ALS-46 (HMAC-SHA256 signing), ALS-47 (retry with backoff), ALS-75 (webhook_logs)

import { json } from '../_shared/cors.ts';
import { adminClient } from '../_shared/auth.ts';

const WEBHOOK_EVENTS: Record<string, string> = {
  assigned:   'delivery.assigned',
  picked_up:  'delivery.picked_up',
  in_transit: 'delivery.in_transit',
  delivered:  'delivery.delivered',
  failed:     'delivery.failed',
  cancelled:  'delivery.cancelled',
};

Deno.serve(async (req) => {
  const { delivery_id, previous_status, new_status } = await req.json();
  const db = adminClient();

  const event = WEBHOOK_EVENTS[new_status];
  if (!event) return json({ skipped: true });

  const { data: delivery } = await db
    .from('deliveries')
    .select('*, clients(webhook_url, webhook_secret, id)')
    .eq('id', delivery_id)
    .single();

  if (!delivery?.clients?.webhook_url) return json({ skipped: true, reason: 'no webhook_url' });

  const { webhook_url, webhook_secret, id: clientId } = delivery.clients;

  const payload = {
    event,
    delivery_id,
    client_reference: delivery.client_reference,
    previous_status,
    new_status,
    timestamp: new Date().toISOString(),
    provider: delivery.provider_id ? {
      id:   delivery.provider_id,
      name: delivery.providers?.name,
    } : null,
  };

  const payloadStr = JSON.stringify(payload);

  // HMAC-SHA256 signing (ALS-46)
  const signature = webhook_secret
    ? await sign(payloadStr, webhook_secret)
    : null;

  // Create log entry
  const { data: logEntry } = await db.from('webhook_logs').insert({
    delivery_id,
    client_id: clientId,
    event_type: event,
    payload,
    attempt_count: 0,
  }).select().single();

  // Deliver with retry (ALS-47)
  let delivered = false;
  let lastStatus: number | null = null;

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (signature) headers['X-LOP-Signature'] = signature;

      const res = await fetch(webhook_url, { method: 'POST', headers, body: payloadStr });
      lastStatus = res.status;

      await db.from('webhook_logs').update({
        attempt_count: attempt,
        last_attempt_at: new Date().toISOString(),
        response_status: res.status,
        ...(res.ok ? { delivered_at: new Date().toISOString() } : {}),
      }).eq('id', logEntry.id);

      if (res.ok) { delivered = true; break; }
    } catch (_) { /* network error, retry */ }

    // Exponential backoff: 2s, 4s, 8s
    if (attempt < 3) await sleep(2 ** attempt * 1000);
  }

  return json({ delivered, attempts: 3, last_status: lastStatus });
});

async function sign(payload: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(payload));
  return Array.from(new Uint8Array(sig)).map(b => b.toString(16).padStart(2, '0')).join('');
}

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));
