# Tracking & Visibility

## Real-Time Delivery Tracking System

---

## Overview

LOP's tracking system provides real-time visibility into every delivery on the platform. It serves three audiences simultaneously:
- **Clients** (e.g., AgriLink) — via webhook updates and the dashboard
- **End recipients** (buyers/customers) — via a public tracking link
- **Internal ops team** — via the admin monitoring dashboard

---

## How Tracking Works

### GPS Data Ingestion
The LOP Driver App sends GPS pings to the Tracking Service every **30 seconds** while a delivery is in `IN_TRANSIT` status. Each ping is recorded as a `tracking_event` with:
- Latitude and longitude
- Timestamp
- Delivery ID and provider ID

### Status Transitions
Beyond GPS, the system records discrete status events when the driver takes actions in the app:

| Driver Action | Delivery Status |
|---|---|
| Accepts assignment | `ASSIGNED` |
| Marks pickup complete (+ photo) | `PICKED_UP` |
| Taps "Start Delivery" | `IN_TRANSIT` |
| Marks delivery complete (+ photo + recipient confirmation) | `DELIVERED` |
| Reports failed delivery | `FAILED` |

---

## Customer-Facing Tracking Link

Each delivery generates a unique public tracking URL:

```
https://track.lop.agrilink.ng/{delivery_id}
```

This page displays:
- Current delivery status and timeline
- Live map with driver location (when in transit)
- Estimated time of arrival
- Driver's first name and vehicle type
- Contact button (triggers SMS to driver through masked number)

The tracking link is mobile-optimized and requires no login.

### Sharing the Tracking Link

LOP automatically sends the tracking link to the recipient's phone via SMS when the delivery is assigned. Clients can also access the tracking URL in the delivery creation response and pass it to their users.

---

## Webhook Status Updates

Clients receive real-time status updates at their registered `callback_url`. See [API Reference](../api/api-reference.md#webhooks) for full webhook payload specification.

---

## Admin Monitoring Dashboard

The internal ops dashboard provides:

### Live Delivery Map
- All active deliveries plotted on a real-time map
- Color-coded by status (pending, assigned, in transit, delivered, failed)
- Click any delivery to see full detail

### Alerts
- Deliveries in `PENDING` status for >5 minutes without assignment
- Deliveries in `IN_TRANSIT` with no GPS ping for >15 minutes (possible app issue or accident)
- Deliveries approaching SLA breach

### Delivery Detail View
- Full status timeline with timestamps
- GPS trail for the delivery
- Provider contact information
- Option to manually update status or escalate

---

## Data Retention

| Data Type | Retention Period |
|---|---|
| GPS ping coordinates | 30 days (then anonymized) |
| Status event records | 2 years |
| Delivery photos (pickup/dropoff) | 90 days |
| Aggregated route data (anonymized) | Indefinite (used for optimization) |

---

## Privacy Considerations

- Driver GPS location is only visible to the recipient when the delivery is `IN_TRANSIT`
- Precise GPS coordinates are not exposed to clients via API — only the tracking link
- Driver phone numbers are masked in all customer-facing communications (calls routed through platform)
- All tracking data transmitted over TLS 1.3

---

*Last updated: 2025 | [Back to Repository Root](../../README.md)*
