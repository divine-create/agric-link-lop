// Notifications Edge Function
// Covers ALS-52 (Termii SMS), ALS-53 (Expo Push)

import { json } from '../_shared/cors.ts';
import { adminClient } from '../_shared/auth.ts';

const TERMII_API_KEY  = Deno.env.get('TERMII_API_KEY')!;
const TERMII_BASE_URL = Deno.env.get('TERMII_BASE_URL') ?? 'https://api.ng.termii.com';
const TERMII_SENDER   = Deno.env.get('TERMII_SENDER_ID') ?? 'AgriLink';
const EXPO_ACCESS_TOKEN = Deno.env.get('EXPO_ACCESS_TOKEN')!;

Deno.serve(async (req) => {
  const { event, delivery_id, provider_id, reason } = await req.json();
  const db = adminClient();

  switch (event) {
    case 'delivery.assigned': {
      const { data: delivery } = await db
        .from('deliveries')
        .select('*, providers(phone, name)')
        .eq('id', delivery_id).single();

      if (!delivery) break;

      // SMS to provider
      if (delivery.providers?.phone) {
        await sendSms(
          delivery.providers.phone,
          `AgriLink Logistics: New haul assigned to you! Pickup: ${delivery.pickup_address.substring(0, 60)}. Accept within 2 minutes.`
        );
      }

      // SMS to dropoff recipient
      if (delivery.dropoff_contact_phone) {
        await sendSms(
          delivery.dropoff_contact_phone,
          `Your AgriLink delivery is being arranged. Track at: ${delivery.tracking_url}`
        );
      }
      break;
    }

    case 'delivery.picked_up': {
      const { data: delivery } = await db
        .from('deliveries').select('dropoff_contact_phone, tracking_url').eq('id', delivery_id).single();

      if (delivery?.dropoff_contact_phone) {
        await sendSms(
          delivery.dropoff_contact_phone,
          `Your AgriLink delivery has been picked up and is on the way! Track: ${delivery.tracking_url}`
        );
      }
      break;
    }

    case 'delivery.delivered': {
      const { data: delivery } = await db
        .from('deliveries').select('dropoff_contact_phone').eq('id', delivery_id).single();

      if (delivery?.dropoff_contact_phone) {
        await sendSms(
          delivery.dropoff_contact_phone,
          'Your AgriLink delivery has been completed. Please rate your experience in the app.'
        );
      }
      break;
    }

    case 'provider.approved': {
      const { data: provider } = await db.from('providers').select('phone, name').eq('id', provider_id).single();
      if (provider?.phone) {
        await sendSms(provider.phone, `Welcome to AgriLink Logistics, ${provider.name}! Your account is approved. You can now go online and accept hauls.`);
      }
      break;
    }

    case 'provider.rejected': {
      const { data: provider } = await db.from('providers').select('phone').eq('id', provider_id).single();
      if (provider?.phone) {
        await sendSms(provider.phone, `Your AgriLink Logistics application was not approved. Reason: ${reason ?? 'Please contact support.'}`);
      }
      break;
    }
  }

  return json({ sent: true });
});

async function sendSms(phone: string, message: string) {
  if (!TERMII_API_KEY) return; // skip in local dev
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

async function sendExpoPush(expoPushToken: string, title: string, body: string) {
  if (!EXPO_ACCESS_TOKEN) return;
  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${EXPO_ACCESS_TOKEN}`,
    },
    body: JSON.stringify({ to: expoPushToken, title, body, sound: 'default' }),
  });
}
