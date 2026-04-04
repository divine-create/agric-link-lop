# Third-Party Integration Guide

## Embedding LOP into Your Platform

---

## Overview

LOP is designed as an API-first logistics infrastructure layer. Any business — an e-commerce platform, an SME tool, a food delivery app, a healthcare supply chain — can embed LOP's delivery capabilities directly into their product.

This guide walks through everything you need to go from zero to processing live deliveries.

---

## Getting Started

### 1. Request API Access

Email **api@lop.agrilink.ng** with:
- Your company name and website
- Estimated monthly delivery volume
- Intended use case

You will receive your `client_id` and `client_secret` within 2 business days, along with sandbox credentials for testing.

### 2. Explore the Sandbox

**Sandbox Base URL:** `https://sandbox.api.lop.agrilink.ng/v1`

The sandbox environment simulates the full delivery lifecycle. Deliveries created in sandbox are automatically progressed through statuses (ASSIGNED → PICKED_UP → IN_TRANSIT → DELIVERED) at accelerated intervals for testing purposes.

### 3. Review the API Reference

See [API Reference](../api/api-reference.md) for full endpoint documentation, request/response schemas, error codes, and webhook payload formats.

---

## Integration Checklist

Use this checklist before going live:

- [ ] Obtain production API credentials
- [ ] Implement token refresh logic (tokens expire after 1 hour)
- [ ] Set up your `callback_url` endpoint to receive webhooks
- [ ] Verify webhook signature validation is implemented
- [ ] Test the full delivery lifecycle in sandbox (create → assign → deliver)
- [ ] Handle `NO_PROVIDERS_AVAILABLE` error gracefully in your UI
- [ ] Implement retry logic for `500` errors (use exponential backoff)
- [ ] Set up monitoring for webhook delivery failures
- [ ] Review rate limits and confirm they match your expected volume

---

## Common Integration Patterns

### Pattern 1: Order-Triggered Delivery (E-Commerce)

Trigger a delivery request automatically when an order is placed:

```javascript
// Node.js example
async function createDeliveryForOrder(order) {
  const response = await fetch('https://api.lop.agrilink.ng/v1/deliveries', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${await getAccessToken()}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      pickup: {
        address: order.seller.address,
        latitude: order.seller.lat,
        longitude: order.seller.lng,
        contact_name: order.seller.name,
        contact_phone: order.seller.phone
      },
      dropoff: {
        address: order.buyer.address,
        latitude: order.buyer.lat,
        longitude: order.buyer.lng,
        contact_name: order.buyer.name,
        contact_phone: order.buyer.phone
      },
      package: {
        type: order.packageType,
        weight_kg: order.weightKg,
        description: order.description
      },
      urgency: 'standard',
      callback_url: 'https://yourplatform.com/webhooks/lop',
      client_reference: order.id
    })
  });

  const delivery = await response.json();
  await updateOrderWithDelivery(order.id, delivery.delivery_id, delivery.tracking_url);
}
```

---

### Pattern 2: Webhook Handler (Status Updates)

Process delivery status updates and sync them back to your platform:

```javascript
// Express.js webhook endpoint
app.post('/webhooks/lop', (req, res) => {
  // Validate signature
  const signature = req.headers['x-lop-signature'];
  const expected = crypto
    .createHmac('sha256', process.env.LOP_WEBHOOK_SECRET)
    .update(JSON.stringify(req.body))
    .digest('hex');

  if (signature !== expected) {
    return res.status(401).json({ error: 'Invalid signature' });
  }

  const { event, delivery_id, new_status, client_reference } = req.body;

  // Map LOP status to your platform's order status
  const statusMap = {
    'delivery.assigned':  'shipping_arranged',
    'delivery.picked_up': 'dispatched',
    'delivery.delivered': 'completed',
    'delivery.failed':    'delivery_failed'
  };

  if (statusMap[event]) {
    updateOrderStatus(client_reference, statusMap[event]);
  }

  res.status(200).json({ received: true });
});
```

---

### Pattern 3: Tracking Link Passthrough

Display real-time delivery tracking to your customers without building your own tracking UI:

```html
<!-- Embed the LOP tracking page in an iframe, or link directly -->
<a href="{{ delivery.tracking_url }}" target="_blank">
  Track your delivery →
</a>
```

LOP's tracking page is branded and mobile-optimized, and shows live GPS location, status timeline, and estimated delivery time.

---

## Error Handling Best Practices

| Scenario | Recommended Handling |
|---|---|
| `NO_PROVIDERS_AVAILABLE` | Show user a message: "Delivery scheduling in progress — you'll be notified shortly." Alert ops team to manually resolve. |
| `RATE_LIMIT_EXCEEDED` | Implement exponential backoff. Queue delivery requests if volume spikes. |
| `500 INTERNAL_ERROR` | Retry up to 3 times with 5-second intervals. If all fail, fall back to manual logistics. |
| Webhook not received | Poll `GET /deliveries/{id}` every 2 minutes for critical deliveries. |

---

## Going Live

Once you have completed sandbox testing and the integration checklist:

1. Request production API access upgrade from your account manager
2. Configure your production `callback_url` and update your webhook secret
3. Start with a small volume (≤100 deliveries/day) for the first week to monitor performance
4. Scale up once you have confirmed stability

---

## Support & SLAs

| Support Type | Contact | Response Time |
|---|---|---|
| Integration support | api@lop.agrilink.ng | 1 business day |
| Production incident | ops@lop.agrilink.ng | 2 hours (business hours) |
| Billing & accounts | accounts@lop.agrilink.ng | 2 business days |

---

*Last updated: 2025 | [Back to Repository Root](../../README.md)*
