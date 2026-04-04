# API Reference

## LOP REST API — v1

**Base URL:** `https://api.lop.agrilink.ng/v1`
**Authentication:** Bearer token (JWT) in `Authorization` header
**Content-Type:** `application/json`

---

## Authentication

### Obtain Access Token

```http
POST /auth/token
```

**Request Body:**
```json
{
  "client_id": "your_client_id",
  "client_secret": "your_client_secret"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "token_type": "Bearer",
  "expires_in": 3600
}
```

---

## Deliveries

### Create a Delivery Request

```http
POST /deliveries
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "pickup": {
    "address": "No. 5 Market Road, Calabar",
    "latitude": 4.9757,
    "longitude": 8.3417,
    "contact_name": "John Farmer",
    "contact_phone": "+2348012345678"
  },
  "dropoff": {
    "address": "15 Bode Thomas Street, Lagos",
    "latitude": 6.5244,
    "longitude": 3.3792,
    "contact_name": "Jane Buyer",
    "contact_phone": "+2348087654321"
  },
  "package": {
    "type": "perishable",
    "weight_kg": 120,
    "description": "Fresh tomatoes — handle with care",
    "requires_cold_chain": true
  },
  "urgency": "standard",
  "callback_url": "https://agrilink.ng/webhooks/delivery-updates",
  "client_reference": "agrilink_order_9812"
}
```

**Response — 201 Created:**
```json
{
  "delivery_id": "del_abc123xyz",
  "status": "PENDING",
  "estimated_assignment_time": "2025-06-01T08:32:00Z",
  "tracking_url": "https://track.lop.agrilink.ng/del_abc123xyz",
  "created_at": "2025-06-01T08:30:00Z"
}
```

---

### Get Delivery Status

```http
GET /deliveries/{delivery_id}
Authorization: Bearer {token}
```

**Response — 200 OK:**
```json
{
  "delivery_id": "del_abc123xyz",
  "status": "IN_TRANSIT",
  "provider": {
    "id": "prv_xyz789",
    "name": "Chidi Express Logistics",
    "phone": "+2348055566677",
    "vehicle_type": "van",
    "current_location": {
      "latitude": 5.8800,
      "longitude": 5.0000,
      "updated_at": "2025-06-01T10:15:00Z"
    }
  },
  "timeline": [
    { "status": "PENDING",    "timestamp": "2025-06-01T08:30:00Z" },
    { "status": "ASSIGNED",   "timestamp": "2025-06-01T08:32:45Z" },
    { "status": "PICKED_UP",  "timestamp": "2025-06-01T09:05:00Z" },
    { "status": "IN_TRANSIT", "timestamp": "2025-06-01T09:05:00Z" }
  ],
  "estimated_delivery": "2025-06-02T14:00:00Z",
  "tracking_url": "https://track.lop.agrilink.ng/del_abc123xyz"
}
```

---

### Cancel a Delivery

```http
DELETE /deliveries/{delivery_id}
Authorization: Bearer {token}
```

> Only cancellable if status is `PENDING` or `ASSIGNED`. Cannot cancel once `IN_TRANSIT`.

**Response — 200 OK:**
```json
{
  "delivery_id": "del_abc123xyz",
  "status": "CANCELLED",
  "cancelled_at": "2025-06-01T08:31:00Z"
}
```

---

### List Deliveries

```http
GET /deliveries?status=IN_TRANSIT&limit=50&offset=0
Authorization: Bearer {token}
```

**Query Parameters:**

| Parameter | Type | Description |
|---|---|---|
| `status` | string | Filter by status: PENDING, ASSIGNED, IN_TRANSIT, DELIVERED, FAILED, CANCELLED |
| `from_date` | ISO 8601 | Filter deliveries created after this date |
| `to_date` | ISO 8601 | Filter deliveries created before this date |
| `limit` | integer | Results per page (max 100, default 20) |
| `offset` | integer | Pagination offset |

---

## Providers

### List Available Providers

```http
GET /providers?latitude=4.9757&longitude=8.3417&radius_km=20
Authorization: Bearer {token}
```

**Response — 200 OK:**
```json
{
  "providers": [
    {
      "id": "prv_xyz789",
      "name": "Chidi Express Logistics",
      "vehicle_types": ["van", "truck"],
      "cold_chain_certified": true,
      "reliability_score": 94.2,
      "distance_km": 3.4,
      "available": true
    }
  ],
  "total": 14
}
```

---

## Webhooks

LOP delivers delivery status updates to your `callback_url` via HTTP POST.

### Webhook Payload

```json
{
  "event": "delivery.status_changed",
  "delivery_id": "del_abc123xyz",
  "client_reference": "agrilink_order_9812",
  "previous_status": "ASSIGNED",
  "new_status": "PICKED_UP",
  "timestamp": "2025-06-01T09:05:00Z",
  "provider": {
    "id": "prv_xyz789",
    "name": "Chidi Express Logistics"
  }
}
```

### Webhook Events

| Event | Trigger |
|---|---|
| `delivery.assigned` | Provider matched and notified |
| `delivery.picked_up` | Provider confirmed pickup |
| `delivery.in_transit` | Delivery is en route |
| `delivery.delivered` | Delivery confirmed complete |
| `delivery.failed` | Delivery could not be completed |
| `delivery.cancelled` | Delivery cancelled by client |

### Webhook Security

LOP signs all webhook payloads with an HMAC-SHA256 signature. Verify using your webhook secret:

```javascript
const crypto = require('crypto');
const signature = req.headers['x-lop-signature'];
const expected = crypto
  .createHmac('sha256', process.env.WEBHOOK_SECRET)
  .update(JSON.stringify(req.body))
  .digest('hex');

if (signature !== expected) {
  return res.status(401).send('Invalid signature');
}
```

---

## Error Codes

| Code | HTTP Status | Description |
|---|---|---|
| `INVALID_REQUEST` | 400 | Missing or invalid request parameters |
| `UNAUTHORIZED` | 401 | Invalid or expired access token |
| `FORBIDDEN` | 403 | Client does not have permission for this action |
| `NOT_FOUND` | 404 | Delivery or resource not found |
| `NO_PROVIDERS_AVAILABLE` | 422 | No eligible providers found for this request |
| `DELIVERY_NOT_CANCELLABLE` | 422 | Delivery is in a state that cannot be cancelled |
| `RATE_LIMIT_EXCEEDED` | 429 | Too many requests — retry after the indicated period |
| `INTERNAL_ERROR` | 500 | Unexpected server error — contact support |

---

## Rate Limits

| Plan | Requests per Minute | Deliveries per Day |
|---|---|---|
| Starter | 30 | 500 |
| Growth | 150 | 5,000 |
| Enterprise | Unlimited | Unlimited |

---

## SDKs & Sandbox

- **Sandbox Base URL:** `https://sandbox.api.lop.agrilink.ng/v1`
- **Postman Collection:** Available on request
- **Node.js SDK:** Coming in Phase 2
- **Python SDK:** Coming in Phase 2

---

*Last updated: 2025 | [Back to Repository Root](../../README.md)*
