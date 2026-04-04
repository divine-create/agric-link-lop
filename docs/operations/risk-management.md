# Risk & Fraud Detection

## Trust Mechanisms and Fraud Mitigation

---

## Overview

LOP operates as a marketplace connecting businesses with logistics providers. Trust is foundational — clients must trust that deliveries will be completed, and providers must trust that payments will be made. The risk and fraud framework protects all parties.

---

## Risk Categories

### 1. Delivery Fraud
**Definition:** A provider claims to have completed a delivery that was not actually made.

**Detection Mechanisms:**
- Mandatory delivery photo capture at dropoff (timestamped, GPS-tagged)
- Recipient confirmation (OTP sent to recipient's phone; provider must enter it to mark complete)
- GPS trail analysis — system verifies provider was physically at the dropoff location
- Anomaly detection: provider completing deliveries significantly faster than route distance allows

**Response:** Auto-flagged for ops review. Provider payout withheld for flagged delivery pending investigation.

---

### 2. Identity Fraud / Account Takeover
**Definition:** A fraudulent actor registers as a provider using false documents, or gains unauthorized access to a legitimate account.

**Detection Mechanisms:**
- Document verification at onboarding (government ID cross-checked via third-party verification API)
- Vehicle registration verification
- Unusual login patterns (new device, new location) trigger 2FA re-verification
- Account activity anomalies (accepting deliveries in geographically impossible sequences)

**Response:** Immediate account suspension. Ops team manually reviews. Law enforcement referral for confirmed fraud.

---

### 3. Client API Abuse
**Definition:** A client uses the API to create fraudulent or spam delivery requests to game the system or exhaust provider capacity.

**Detection Mechanisms:**
- Rate limiting per client (see [API Reference](../api/api-reference.md))
- Volume anomaly detection — spike >300% of 30-day average triggers review
- Billing holds: clients with outstanding invoices cannot create new deliveries

**Response:** Temporary API access suspension. Finance team contacts client for resolution.

---

### 4. Collusion (Provider + Buyer Fraud)
**Definition:** A provider and recipient collude to mark a delivery complete without actual delivery, or to falsely claim non-delivery for a refund.

**Detection Mechanisms:**
- Cross-referencing GPS data with delivery confirmation OTP timing
- Pattern analysis: same provider + same recipient combination flagged after 2 disputes in 60 days
- Random photo audits — ops team manually reviews a sample of delivery photos weekly

**Response:** Both provider and recipient accounts flagged. Delivery outcome reversed if fraud confirmed.

---

## Platform Trust Mechanisms

### For Clients
- **Delivery confirmation receipts** — photo + GPS + OTP confirmation available for every delivery
- **SLA-backed commitments** — contractual on-time delivery rate targets
- **Dispute resolution process** — clear, time-bound resolution for all delivery issues
- **Transparent pricing** — no hidden fees; all commissions disclosed upfront

### For Providers
- **Reliable weekly payouts** — no arbitrary payment holds without documented cause
- **Formal dispute process** — providers can appeal deductions or suspensions
- **Performance visibility** — providers can see their own score in the Driver App
- **Masked contact info** — provider's personal phone number never shared with clients or recipients

### For Recipients
- **OTP delivery confirmation** — recipient controls when delivery is marked complete
- **Masked driver contact** — calls routed through platform, not directly to driver's personal number
- **Tracking link** — real-time visibility without sharing personal data

---

## Fraud Scoring Model

Each delivery is assigned a **fraud risk score (0–100)** at the time of completion:

| Signal | Weight |
|---|---|
| GPS at dropoff location at time of confirmation | 35% |
| Recipient OTP correctly entered | 30% |
| Delivery photo metadata valid (timestamp + location) | 20% |
| Provider has <2 disputes in last 30 days | 10% |
| Delivery time within expected range | 5% |

Deliveries with fraud risk score <70 are automatically flagged for ops review before payout is released.

---

## Reporting & Response SLAs

| Incident Type | Detection Method | Response SLA |
|---|---|---|
| Suspected delivery fraud | Automated scoring | Review within 24 hours |
| Provider identity fraud | Manual report or verification failure | Account suspended immediately; review within 48 hours |
| API abuse | Automated rate limit + volume anomaly | Suspension within 1 hour |
| Collusion pattern detected | Weekly pattern analysis | Investigation within 5 business days |

---

## Regulatory & Legal

- LOP maintains records of all provider identity verification for a minimum of 5 years
- All fraud cases resulting in losses above ₦500,000 are reported to relevant Nigerian law enforcement (EFCC, NFIU) as required
- LOP cooperates with law enforcement investigations on presentation of valid court orders

---

*Last updated: 2025 | [Back to Repository Root](../../README.md)*
