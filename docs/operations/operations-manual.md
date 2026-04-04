# Operations Manual

## Standard Operating Procedures

---

## Operations Team Overview

The LOP operations team is responsible for:
- Monitoring active deliveries and intervening when automated systems fail
- Managing provider onboarding and quality assurance
- Handling client escalations and delivery disputes
- Coordinating emergency logistics when provider assignment fails
- Reviewing and acting on platform performance data daily

---

## Daily Operations Checklist

### Morning (8:00 AM)
- [ ] Review overnight delivery failures and resolutions
- [ ] Check system health dashboard (API uptime, database load, queue depth)
- [ ] Review any open disputes from the previous day
- [ ] Check provider availability levels in active corridors
- [ ] Review pending provider applications (target: clear within 48 hours)

### Midday (12:00 PM)
- [ ] Review live delivery dashboard for any stuck deliveries (status unchanged >2 hours)
- [ ] Check PagerDuty for unacknowledged alerts
- [ ] Review escalated assignments from the morning

### Evening (5:00 PM)
- [ ] Generate daily delivery volume and on-time rate report
- [ ] Flag any provider performance anomalies for follow-up
- [ ] Review webhook failure log and manually reprocess if needed
- [ ] Handover brief to any on-call team member

---

## Escalation Procedures

### Level 1: Automated Fallback
- **Trigger:** Provider does not accept assignment within 120 seconds
- **Action:** System automatically re-assigns to next best provider (up to 5 attempts)
- **No human intervention required**

### Level 2: Ops Team Intervention
- **Trigger:** 5 automated assignment attempts all fail
- **Alert:** PagerDuty alert to on-call ops team + SMS to client ops contact
- **Action:**
  1. Ops team reviews available providers in the corridor manually
  2. Contacts provider directly via phone to request acceptance
  3. If no provider available, contacts backup provider network (manual partners)
  4. Updates delivery record with notes on manual intervention

### Level 3: Client Notification & Delay
- **Trigger:** Delivery cannot be assigned within 30 minutes of request
- **Action:**
  1. Notify client via webhook: `delivery.delayed` event
  2. Call client's designated ops contact
  3. Agree on revised timeline or cancellation
  4. Document incident for Decision Engine retraining

---

## Provider Quality Management

### Performance Review Cycle
- **Weekly:** Flag providers below 80% on-time rate for the week
- **Monthly:** Full performance review for all providers; suspend those below 75% for 2+ consecutive months
- **Quarterly:** Provider satisfaction survey; review payout rates

### Provider Suspension Protocol
1. Generate performance report showing violation
2. Send formal warning via SMS and email
3. If no improvement within 2 weeks: suspend account
4. Provider may appeal suspension within 30 days
5. Appeals reviewed by ops manager; decision is final

### Provider Reactivation
- Suspended providers may reactivate after 30-day suspension by:
  - Attending a retraining briefing
  - Completing 10 probationary deliveries with ≥90% on-time rate

---

## Dispute Resolution

### Dispute Categories

| Category | Description | Resolution Target |
|---|---|---|
| Late delivery | Delivery arrived after committed time | 3 business days |
| Damaged goods | Package arrived in poor condition | 5 business days |
| Non-delivery | Package not delivered, provider claims otherwise | 3 business days |
| Provider misconduct | Reported inappropriate behavior by driver | 2 business days |
| Incorrect charge | Client billed incorrectly | 2 business days |

### Dispute Process
1. Client or provider raises dispute via platform or email
2. Ops team logs dispute in system (status: `open`)
3. Both parties provide evidence (photos, GPS logs, delivery confirmation)
4. Ops team reviews evidence and makes determination
5. Resolution communicated to both parties
6. If provider at fault: deduction from next payout; performance score impacted
7. If platform at fault: credit issued to client

---

## Weekly Payment Settlement

**Settlement schedule:** Every Friday for deliveries completed Mon–Sun of the prior week

### Process
1. **Thursday EOD:** Finance system calculates payout for each provider
2. **Friday 9:00 AM:** Ops team reviews payout batch for anomalies
3. **Friday 11:00 AM:** Batch submitted to payment processor
4. **Friday EOD:** Transfers initiated to provider bank accounts
5. **Saturday:** Providers receive funds (same-day or next business day depending on bank)

### Failed Payments
- If a payment fails (invalid account, bank error), ops team contacts provider within 24 hours
- Provider must update bank details within 5 business days
- Failed payout is held and included in the following week's settlement

---

## Incident Management

### Incident Severity Levels

| Severity | Definition | Response Time |
|---|---|---|
| P1 — Critical | Platform down, no deliveries processing | Immediate (15 min) |
| P2 — High | >10% of deliveries failing assignment | 30 minutes |
| P3 — Medium | Specific corridor or client impacted | 2 hours |
| P4 — Low | Individual delivery issue, minor bug | Next business day |

### Incident Response
1. Alert detected (PagerDuty or manual report)
2. On-call engineer acknowledges within response time
3. Initial assessment and severity classification
4. Incident channel opened in team communication tool
5. Resolution implemented and tested
6. Post-incident review completed within 48 hours for P1/P2

---

*Last updated: 2025 | [Back to Repository Root](../../README.md)*
