// Outbound Webhook Delivery Edge Function
// Covers ALS-18: HMAC-SHA256 signing, exponential backoff retry, webhook_logs

import { json } from '../_shared/cors.ts';
import { adminClient } from '../_shared/auth.ts';
import { withMetrics } from '../_shared/metrics.ts';

const STATUS_EVENTS: Record<string, string> = {
  assigned:   'delivery.assigned',
  picked_up:  'delivery.picked_up',
  in_transit: 'delivery.in_transit',
  delivered:  'delivery.delivered',
  failed:     'delivery.failed',
  cancelled:  'delivery.cancelled',
};

// Backoff delays in ms: attempt 1→2 waits 1s, attempt 2→3 waits 2s, then done
const BACKOFF_MS = [1000, 2000];

Deno.serve(withMetrics('webhooks', async (req) => {
  const body = await req.json();
  const { delivery_id } = body;

  // Accept either a status transition or an explicit event type (e.g. dispute_raised)
  const event: string | undefined = body.event_type ?? STATUS_EVENTS[body.new_status];
  if (!event) return json({ skipped: true });

  const db = adminClient();

  const { data: delivery } = await db
    .from('deliveries')
    .select('*, clients(id, webhook_url, webhook_secret), providers(name)')
    .eq('id', delivery_id)
    .single();

  if (!delivery?.clients?.webhook_url) return json({ skipped: true, reason: 'no webhook_url' });

  const { webhook_url, webhook_secret, id: clientId } = delivery.clients;

  const payload = {
    event,
    delivery_id,
    client_reference: delivery.client_reference ?? null,
    previous_status:  body.previous_status ?? null,
    new_status:       body.new_status ?? null,
    timestamp:        new Date().toISOString(),
    provider: delivery.provider_id
      ? { id: delivery.provider_id, name: delivery.providers?.name ?? null }
      : null,
    ...(body.dispute_id ? { dispute_id: body.dispute_id } : {}),
  };

  const payloadStr = JSON.stringify(payload);

  // Sign the raw payload bytes with HMAC-SHA256 (ALS-18)
  const signature = webhook_secret ? await sign(payloadStr, webhook_secret) : null;

  const { data: logEntry } = await db.from('webhook_logs').insert({
    delivery_id,
    client_id:   clientId,
    event_type:  event,
    payload,
    attempt_count: 0,
  }).select().single();

  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (signature) headers['X-LOP-Signature'] = `sha256=${signature}`;

  let delivered = false;
  let lastStatus: number | null = null;

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(webhook_url, { method: 'POST', headers, body: payloadStr });
      lastStatus = res.status;

      await db.from('webhook_logs').update({
        attempt_count:    attempt,
        last_attempt_at:  new Date().toISOString(),
        response_status:  res.status,
        ...(res.ok ? { delivered_at: new Date().toISOString() } : {}),
      }).eq('id', logEntry.id);

      if (res.ok) { delivered = true; break; }
    } catch (err) {
      await db.from('webhook_logs').update({
        attempt_count:   attempt,
        last_attempt_at: new Date().toISOString(),
        response_status: 0,
      }).eq('id', logEntry.id);
    }

    if (attempt < 3) await new Promise((r) => setTimeout(r, BACKOFF_MS[attempt - 1]));
  }

  return json({ delivered, event, last_status: lastStatus });
}));

// Sign raw payload bytes with HMAC-SHA256; returns hex string
async function sign(payload: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(payload));
  return Array.from(new Uint8Array(sig)).map((b) => b.toString(16).padStart(2, '0')).join('');
}
