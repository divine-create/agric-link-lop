# Decision Engine Specification

## Provider Matching and Optimization Logic

---

## Overview

The Decision Engine is the core intelligence layer of LOP. It is responsible for selecting the optimal logistics provider for each delivery request, balancing multiple factors simultaneously: cost, speed, reliability, proximity, and capacity.

Over time, the engine learns from delivery outcomes and continuously improves its selections.

---

## Inputs

For each delivery request, the engine receives:

```json
{
  "delivery_id": "del_abc123",
  "pickup": {
    "latitude": 4.9757,
    "longitude": 8.3417,
    "address": "No. 5 Market Road, Calabar"
  },
  "dropoff": {
    "latitude": 6.5244,
    "longitude": 3.3792,
    "address": "15 Bode Thomas Street, Lagos"
  },
  "package": {
    "type": "perishable",
    "weight_kg": 120,
    "requires_cold_chain": true
  },
  "urgency": "standard",
  "requested_at": "2025-06-01T08:30:00Z"
}
```

---

## Provider Scoring Model

Each eligible provider is scored on a weighted composite of five dimensions:

| Dimension | Weight | Description |
|---|---|---|
| **Proximity Score** | 30% | Distance from provider's current location to pickup point |
| **Reliability Score** | 25% | Historical on-time delivery rate (rolling 90 days) |
| **Cost Efficiency** | 20% | Provider's quoted rate relative to market average for the route |
| **Capacity Match** | 15% | Whether the provider has appropriate vehicle type for the package |
| **Load Score** | 10% | Current active deliveries (avoids overloading top providers) |

### Composite Score Formula

```
score = (proximity × 0.30) +
        (reliability × 0.25) +
        (cost_efficiency × 0.20) +
        (capacity_match × 0.15) +
        (load_inverse × 0.10)
```

All dimensions are normalized to a 0–100 scale before weighting.

---

## Eligibility Filters (Pre-Scoring)

Before scoring, the engine filters out providers that fail any hard constraint:

1. **Geographic availability** — Provider must be within the serviceable radius of the pickup
2. **Vehicle type** — Provider must have appropriate vehicle for the package (motorcycle, van, truck)
3. **Cold-chain certification** — Required if `requires_cold_chain: true`
4. **Active status** — Provider must be online and accepting deliveries
5. **Capacity** — Provider must not have exceeded their simultaneous delivery limit
6. **Compliance** — Provider must have no active suspension or unresolved disputes

---

## Assignment Algorithm

```
function assignProvider(deliveryRequest):
  eligibleProviders = filterByHardConstraints(allActiveProviders, deliveryRequest)
  
  if eligibleProviders.isEmpty():
    → Trigger fallback protocol (see below)
  
  scoredProviders = eligibleProviders.map(p => {
    score: computeCompositeScore(p, deliveryRequest),
    provider: p
  })
  
  topProvider = scoredProviders.sortByScoreDesc().first()
  
  if topProvider.score < MINIMUM_SCORE_THRESHOLD (60):
    → Flag for human review + notify ops team
  
  assign(topProvider.provider, deliveryRequest)
  notifyProvider(topProvider.provider)
  startAcceptanceTimer(120 seconds)
```

### Acceptance Timer & Fallback

If the assigned provider does not accept within **120 seconds**:
1. Re-run scoring excluding that provider
2. Assign to next best provider
3. Repeat up to 3 times before escalating to operations team

---

## Reliability Score Calculation

The reliability score is a time-decayed rolling metric:

```
reliability_score = weighted_average(
  deliveries last 7 days:  weight 0.50,
  deliveries last 30 days: weight 0.30,
  deliveries last 90 days: weight 0.20
)

where each delivery outcome = 1.0 (on-time) or 0.0 (late/failed)
```

New providers with fewer than 10 completed deliveries receive a **starter score of 70** (slightly below average), which decays toward their real score as data accumulates.

---

## Proximity Scoring

```
proximity_score = 100 × max(0, 1 - (distance_km / MAX_RADIUS_KM))
```

Where `MAX_RADIUS_KM` is dynamically set based on delivery urgency:
- `urgent`: 5 km
- `standard`: 20 km
- `scheduled`: 50 km

---

## Special Handling: Agricultural Deliveries

For deliveries flagged as `type: perishable` or `requires_cold_chain: true`:

- Cold-chain providers are automatically elevated to the top of the eligible list
- A **perishability urgency multiplier** of 1.2× is applied to the proximity score
- Maximum acceptance timer is reduced to **60 seconds** (faster fallback)
- Delivery SLA is flagged in the notification to the assigned provider

---

## Continuous Learning

The engine improves over time through:

1. **Outcome feedback loop** — Every completed delivery feeds actual vs. predicted score back into the model
2. **Weekly retraining** — Reliability and cost efficiency weights are recalibrated based on recent performance data
3. **A/B testing** — A small percentage (5%) of assignments are randomized to explore provider performance beyond current scores
4. **Anomaly detection** — Providers whose actual performance significantly diverges from predicted score are flagged for review

---

## Future Enhancements

- **Demand prediction** — Pre-position high-reliability providers near anticipated demand zones
- **Dynamic pricing signals** — Feed real-time supply/demand into cost efficiency weights
- **Multi-modal routing** — Combine providers for different legs of long-distance deliveries

---

*Last updated: 2025 | [Back to Repository Root](../../README.md)*
