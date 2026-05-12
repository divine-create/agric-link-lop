// Paystack Payment Edge Function
// Covers ALS-63 (Paystack Transfer API) and business wallet top-up

import { corsHeaders, corsResponse, json, error } from '../_shared/cors.ts';
import { verifyJwt, adminClient } from '../_shared/auth.ts';

const PAYSTACK_SECRET = Deno.env.get('PAYSTACK_SECRET_KEY')!;
const PAYSTACK_WEBHOOK_SECRET = Deno.env.get('PAYSTACK_WEBHOOK_SECRET')!;

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return corsResponse();

  const url = new URL(req.url);
  const action = url.pathname.split('/').pop();

  // ─── POST /payments/webhook (Paystack → LOP) ──────────────────────────
  if (action === 'webhook') {
    const rawBody = await req.text();
    const sig = req.headers.get('x-paystack-signature');

    // Verify HMAC
    const expected = await hmacSha512(rawBody, PAYSTACK_WEBHOOK_SECRET);
    if (sig !== expected) return error('UNAUTHORIZED', 'Invalid webhook signature', 401);

    const event = JSON.parse(rawBody);

    if (event.event === 'charge.success') {
      const { reference, amount, metadata } = event.data;
      const db = adminClient();

      // Credit client wallet (amount in kobo → naira)
      // In production, store wallet balance in a `wallets` table
      // For MVP, log the transaction
      await db.from('webhook_logs').insert({
        delivery_id: metadata?.delivery_id ?? '00000000-0000-0000-0000-000000000000',
        client_id:   metadata?.client_id ?? '00000000-0000-0000-0000-000000000000',
        event_type:  'paystack.charge.success',
        payload:     event.data,
      });
    }

    if (event.event === 'transfer.success') {
      const db = adminClient();
      await db.from('provider_payouts').update({
        status: 'paid',
        paid_at: new Date().toISOString(),
        bank_reference: event.data.reference,
      }).eq('bank_reference', event.data.reference);
    }

    if (event.event === 'transfer.failed') {
      const db = adminClient();
      await db.from('provider_payouts').update({ status: 'failed' })
        .eq('bank_reference', event.data.reference);
    }

    return json({ received: true });
  }

  // Remaining routes require auth
  const jwt = await verifyJwt(req);
  if (!jwt) return error('UNAUTHORIZED', 'Auth required', 401);

  // ─── POST /payments/transfer (admin payout to provider) ────────────────
  if (action === 'transfer' && jwt.role === 'admin') {
    const { provider_payout_id, amount_naira, provider_id } = await req.json();
    const db = adminClient();

    const { data: provider } = await db.from('providers')
      .select('bank_account_number, bank_code, name')
      .eq('id', provider_id).single();

    if (!provider?.bank_account_number) {
      return error('INVALID_REQUEST', 'Provider has no bank account on file', 422);
    }

    // Create transfer recipient
    const recipientRes = await paystackPost('/transferrecipient', {
      type: 'nuban',
      name: provider.name,
      account_number: provider.bank_account_number,
      bank_code: provider.bank_code,
      currency: 'NGN',
    });

    // Initiate transfer
    const transferRes = await paystackPost('/transfer', {
      source: 'balance',
      amount: amount_naira * 100, // convert to kobo
      recipient: recipientRes.data.recipient_code,
      reason: `AgriLink LOP Settlement`,
    });

    // Update payout record with bank reference
    await db.from('provider_payouts').update({
      bank_reference: transferRes.data.reference,
      status: 'pending',
    }).eq('id', provider_payout_id);

    return json({ transfer_reference: transferRes.data.reference });
  }

  return error('NOT_FOUND', 'Route not found', 404);
});

async function paystackPost(path: string, body: object) {
  const res = await fetch(`https://api.paystack.co${path}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${PAYSTACK_SECRET}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  return res.json();
}

async function hmacSha512(payload: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw', new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-512' }, false, ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(payload));
  return Array.from(new Uint8Array(sig)).map(b => b.toString(16).padStart(2, '0')).join('');
}
