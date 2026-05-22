// Notifications Edge Function — ALS-22
// SMS via Termii + Expo push notifications for provider and recipient events

import { json } from '../_shared/cors.ts';
import { adminClient } from '../_shared/auth.ts';

const TERMII_API_KEY    = Deno.env.get('TERMII_API_KEY')!;
const TERMII_BASE_URL   = Deno.env.get('TERMII_BASE_URL') ?? 'https://api.ng.termii.com';
const TERMII_SENDER     = Deno.env.get('TERMII_SENDER_ID') ?? 'AgriLink';
const EXPO_ACCESS_TOKEN = Deno.env.get('EXPO_ACCESS_TOKEN')!;

Deno.serve(async (req) => {
  const { event, delivery_id, provider_id, reason } = await req.json();
  const db = adminClient();

  switch (event) {
    case 'delivery.assigned': {
      const { data: delivery } = await db
        .from('deliveries')
        .select('*, providers(id, phone, name), provider_availability(push_token)')
        .eq('id', delivery_id)
        .single();

      if (!delivery || delivery.status === 'cancelled') break;

      const provider = delivery.providers;
      const pushToken = delivery.provider_availability?.[0]?.push_token;

      if (provider?.phone) {
        await sendSms(provider.phone, 'New delivery assigned. Accept in the LOP app within 2 minutes.');
      }
      if (pushToken) {
        await sendExpoPush(pushToken, 'New Delivery', 'Tap to accept within 2 minutes', {
          screen: 'delivery-detail',
          delivery_id,
        });
      }
      if (delivery.dropoff_contact_phone && delivery.tracking_url) {
        await sendSms(
          delivery.dropoff_contact_phone,
          `Your AgriLink delivery is being arranged. Track at: ${delivery.tracking_url}`,
        );
      }
      break;
    }

    case 'delivery.picked_up': {
      const { data: delivery } = await db
        .from('deliveries')
        .select('dropoff_contact_phone, tracking_url, status')
        .eq('id', delivery_id)
        .single();

      if (!delivery || delivery.status === 'cancelled') break;
      if (delivery.dropoff_contact_phone && delivery.tracking_url) {
        await sendSms(
          delivery.dropoff_contact_phone,
          `Your order is on the way. Track: ${delivery.tracking_url}`,
        );
      }
      break;
    }

    case 'delivery.delivered': {
      const { data: delivery } = await db
        .from('deliveries')
        .select('dropoff_contact_phone, status')
        .eq('id', delivery_id)
        .single();

      if (!delivery || delivery.status === 'cancelled') break;
      if (delivery.dropoff_contact_phone) {
        await sendSms(
          delivery.dropoff_contact_phone,
          'Your order has been delivered. Reply DISPUTE to raise a complaint.',
        );
      }
      break;
    }

    case 'delivery.cancelled': {
      const { data: delivery } = await db
        .from('deliveries')
        .select('provider_id, provider_availability(push_token)')
        .eq('id', delivery_id)
        .single();

      const pushToken = (delivery as any)?.provider_availability?.[0]?.push_token;
      if (pushToken) {
        await sendExpoPush(pushToken, 'Delivery Cancelled', 'A delivery assigned to you has been cancelled.', {
          screen: 'home',
        });
      }
      break;
    }

    case 'provider.approved': {
      const { data: provider } = await db.from('providers').select('phone, name').eq('id', provider_id).single();
      if (provider?.phone) {
        await sendSms(
          provider.phone,
          `Welcome to AgriLink Logistics, ${provider.name}! Your account is approved. Go online to start accepting hauls.`,
        );
      }
      break;
    }

    case 'provider.rejected': {
      const { data: provider } = await db.from('providers').select('phone').eq('id', provider_id).single();
      if (provider?.phone) {
        await sendSms(
          provider.phone,
          `Your AgriLink Logistics application was not approved. Reason: ${reason ?? 'Please contact support.'}`,
        );
      }
      break;
    }
  }

  return json({ sent: true });
});

async function sendSms(phone: string, message: string) {
  if (!TERMII_API_KEY) return;
  await fetch(`${TERMII_BASE_URL}/api/sms/send`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      api_key: TERMII_API_KEY,
      to: phone,
      from: TERMII_SENDER,
      sms: message,
      type: 'plain',
      channel: 'dnd',
    }),
  });
}

async function sendExpoPush(
  expoPushToken: string,
  title: string,
  body: string,
  data?: Record<string, unknown>,
) {
  if (!EXPO_ACCESS_TOKEN) return;
  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${EXPO_ACCESS_TOKEN}`,
    },
    body: JSON.stringify({ to: expoPushToken, title, body, sound: 'default', data }),
  });
}
