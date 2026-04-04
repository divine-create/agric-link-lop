# AgriLink Integration Guide

## How LOP Powers AgriLink's Farm-to-Market Delivery

---

## Overview

AgriLink is LOP's anchor client and the primary integration for which the MVP is built. This guide documents how the two platforms connect, what delivery scenarios LOP handles for AgriLink, and the operational agreements that govern the relationship.

---

## Why AgriLink Needs LOP

AgriLink connects Nigerian farmers directly with buyers — restaurants, hotels, retailers, processors, and exporters. The core transaction is a farm-to-buyer sale, but without reliable, trackable delivery, the marketplace cannot scale.

Before LOP, AgriLink faced:
- No central coordination of logistics across its growing network
- Inconsistent delivery quality affecting buyer trust
- Significant time spent manually matching farmers with transporters
- No real-time tracking for buyers or farmers
- Particular difficulty with perishable goods on rural-to-urban routes

LOP resolves all of these by making delivery programmable.

---

## Integration Architecture

```
AgriLink Platform
       │
       │  POST /v1/deliveries (REST API)
       │
       ▼
   LOP API Gateway
       │
       ├── Delivery Service (creates delivery record)
       ├── Decision Engine (matches best provider)
       └── Notification Service
                │
                ├── Notifies matched provider (push notification)
                └── Sends webhook back to AgriLink callback URL
```

---

## Delivery Scenarios Handled

### 1. Farm-to-Buyer (Standard)
The most common scenario. A buyer places an order on AgriLink, and the farmer needs to ship produce to the buyer's location.

- **Package types:** Perishable, bulk agricultural goods
- **Typical weight:** 10 – 500 kg
- **Routes:** Rural farm → urban buyer (cross-state common)
- **Vehicle types:** Van, truck, refrigerated truck (for cold-chain)
- **Special considerations:** Perishability urgency multiplier applied

### 2. Farm-to-Processor
Farmers supplying raw produce to processing facilities (mills, packaging plants).

- **Package types:** Bulk commodity
- **Typical weight:** 500 kg – 5,000 kg
- **Routes:** Farm → industrial area
- **Vehicle types:** Truck, articulated lorry (via contracted partner)

### 3. Agrilink Warehouse → Buyer
Where AgriLink holds consolidated inventory, LOP handles last-mile from warehouse to buyer.

- **Package types:** Mixed produce, packaged goods
- **Typical weight:** 1 – 50 kg
- **Routes:** Urban warehouse → buyer address
- **Vehicle types:** Motorcycle, van

---

## AgriLink-Specific Configuration

LOP applies the following custom rules for all AgriLink deliveries:

```json
{
  "client_id": "agrilink_prod",
  "custom_rules": {
    "perishable_acceptance_timer_seconds": 60,
    "cold_chain_priority_boost": 1.2,
    "minimum_reliability_score_for_perishable": 85,
    "max_assignment_attempts": 5,
    "escalation_contact": "ops@lop.agrilink.ng"
  }
}
```

---

## Webhook Configuration

AgriLink receives all delivery status updates at:

**Callback URL:** `https://agrilink.ng/webhooks/lop/delivery-updates`
**Events subscribed:**
- `delivery.assigned`
- `delivery.picked_up`
- `delivery.in_transit`
- `delivery.delivered`
- `delivery.failed`

AgriLink uses these webhooks to:
- Update order status in the buyer and farmer dashboards
- Trigger payment release to farmers upon delivery confirmation
- Alert buyers with tracking links

---

## SLA Commitments (AgriLink ↔ LOP)

| Metric | Target |
|---|---|
| Delivery request → assignment time | ≤ 3 minutes |
| On-time delivery rate (standard) | ≥ 88% |
| On-time delivery rate (perishable) | ≥ 92% |
| Platform uptime | 99.5% |
| Webhook delivery latency | ≤ 30 seconds after event |
| Support response time (ops issues) | ≤ 2 hours (business hours) |

---

## Billing

AgriLink is on a **blended commission model**:

- Standard deliveries: 6% commission on delivery fee
- Cold-chain / refrigerated: 8% commission
- Bulk freight (>500kg): Negotiated per delivery

Invoicing occurs monthly. AgriLink has 14-day payment terms.

---

## Emergency Escalation

If LOP cannot assign a provider after 5 attempts:
1. Ops team is automatically alerted via PagerDuty
2. AgriLink operations contact is notified via SMS
3. Ops team manually coordinates an alternative provider
4. Incident is logged for Decision Engine retraining

**AgriLink Ops Contact:** ops@agrilink.ng | +234 800 AGRILINK

---

*Last updated: 2025 | [Back to Repository Root](../../README.md)*
