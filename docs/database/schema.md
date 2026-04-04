# Database Schema

## Data Models and SQL Definitions

**Primary Database:** PostgreSQL 15
**Naming Convention:** snake_case, plural table names
**Timestamps:** All tables include `created_at` and `updated_at` (UTC)

---

## Entity Relationship Overview

```
clients ──────────< deliveries >────────── providers
                        │
                        ├──── tracking_events
                        ├──── delivery_disputes
                        └──── payment_settlements >── provider_payouts
```

---

## Tables

### `clients`
Platform clients (e.g., AgriLink) that submit delivery requests.

```sql
CREATE TABLE clients (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name              VARCHAR(255) NOT NULL,
  email             VARCHAR(255) UNIQUE NOT NULL,
  api_key_hash      VARCHAR(255) NOT NULL,
  webhook_url       TEXT,
  webhook_secret    VARCHAR(255),
  subscription_tier VARCHAR(50) DEFAULT 'starter', -- starter, growth, enterprise
  is_active         BOOLEAN DEFAULT TRUE,
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  updated_at        TIMESTAMPTZ DEFAULT NOW()
);
```

---

### `providers`
Logistics providers registered on the platform.

```sql
CREATE TABLE providers (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name                  VARCHAR(255) NOT NULL,
  phone                 VARCHAR(20) UNIQUE NOT NULL,
  email                 VARCHAR(255),
  vehicle_types         TEXT[] NOT NULL,         -- e.g. ['motorcycle', 'van']
  cold_chain_certified  BOOLEAN DEFAULT FALSE,
  coverage_zones        JSONB,                   -- GeoJSON polygons
  bank_account_number   VARCHAR(20),
  bank_code             VARCHAR(10),
  reliability_score     NUMERIC(5,2) DEFAULT 70.00,
  status                VARCHAR(50) DEFAULT 'pending_review',
                          -- pending_review, active, suspended, inactive
  total_deliveries      INTEGER DEFAULT 0,
  created_at            TIMESTAMPTZ DEFAULT NOW(),
  updated_at            TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_providers_status ON providers(status);
CREATE INDEX idx_providers_coverage ON providers USING GIN(coverage_zones);
```

---

### `provider_availability`
Tracks whether a provider is currently online and accepting deliveries.

```sql
CREATE TABLE provider_availability (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id     UUID NOT NULL REFERENCES providers(id),
  is_available    BOOLEAN NOT NULL DEFAULT FALSE,
  current_lat     NUMERIC(10, 7),
  current_lng     NUMERIC(10, 7),
  active_count    INTEGER DEFAULT 0,    -- current active deliveries
  last_ping_at    TIMESTAMPTZ,
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE UNIQUE INDEX idx_provider_availability_provider ON provider_availability(provider_id);
```

---

### `deliveries`
Core table tracking all delivery requests.

```sql
CREATE TABLE deliveries (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id           UUID NOT NULL REFERENCES clients(id),
  provider_id         UUID REFERENCES providers(id),
  client_reference    VARCHAR(255),              -- client's own order ID
  status              VARCHAR(50) NOT NULL DEFAULT 'pending',
                        -- pending, assigned, picked_up, in_transit,
                        --   delivered, failed, cancelled

  -- Pickup details
  pickup_address      TEXT NOT NULL,
  pickup_lat          NUMERIC(10, 7) NOT NULL,
  pickup_lng          NUMERIC(10, 7) NOT NULL,
  pickup_contact_name VARCHAR(255),
  pickup_contact_phone VARCHAR(20),

  -- Dropoff details
  dropoff_address     TEXT NOT NULL,
  dropoff_lat         NUMERIC(10, 7) NOT NULL,
  dropoff_lng         NUMERIC(10, 7) NOT NULL,
  dropoff_contact_name VARCHAR(255),
  dropoff_contact_phone VARCHAR(20),

  -- Package details
  package_type        VARCHAR(100),              -- standard, perishable, fragile
  package_weight_kg   NUMERIC(8, 2),
  package_description TEXT,
  requires_cold_chain BOOLEAN DEFAULT FALSE,

  -- Logistics details
  urgency             VARCHAR(50) DEFAULT 'standard',  -- urgent, standard, scheduled
  delivery_fee        NUMERIC(12, 2),
  commission_amount   NUMERIC(12, 2),
  provider_payout     NUMERIC(12, 2),

  -- Tracking
  tracking_url        TEXT,
  assigned_at         TIMESTAMPTZ,
  picked_up_at        TIMESTAMPTZ,
  delivered_at        TIMESTAMPTZ,
  estimated_delivery  TIMESTAMPTZ,

  created_at          TIMESTAMPTZ DEFAULT NOW(),
  updated_at          TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_deliveries_client_id ON deliveries(client_id);
CREATE INDEX idx_deliveries_provider_id ON deliveries(provider_id);
CREATE INDEX idx_deliveries_status ON deliveries(status);
CREATE INDEX idx_deliveries_created_at ON deliveries(created_at DESC);
```

---

### `tracking_events`
Time-series table of GPS and status events for each delivery.

```sql
CREATE TABLE tracking_events (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  delivery_id UUID NOT NULL REFERENCES deliveries(id),
  event_type  VARCHAR(50) NOT NULL,  -- gps_ping, status_change, note
  latitude    NUMERIC(10, 7),
  longitude   NUMERIC(10, 7),
  status      VARCHAR(50),
  metadata    JSONB,
  recorded_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_tracking_delivery_id ON tracking_events(delivery_id);
CREATE INDEX idx_tracking_recorded_at ON tracking_events(recorded_at DESC);

-- Note: For production, consider migrating to TimescaleDB hypertable:
-- SELECT create_hypertable('tracking_events', 'recorded_at');
```

---

### `delivery_disputes`
Logs disputes raised by clients or providers.

```sql
CREATE TABLE delivery_disputes (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  delivery_id   UUID NOT NULL REFERENCES deliveries(id),
  raised_by     VARCHAR(50) NOT NULL,   -- client, provider, ops
  reason        VARCHAR(100) NOT NULL,
  description   TEXT,
  status        VARCHAR(50) DEFAULT 'open',  -- open, investigating, resolved, closed
  resolution    TEXT,
  resolved_at   TIMESTAMPTZ,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);
```

---

### `payment_settlements`
Weekly settlement batches.

```sql
CREATE TABLE payment_settlements (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  period_start    DATE NOT NULL,
  period_end      DATE NOT NULL,
  total_deliveries INTEGER NOT NULL,
  total_payout    NUMERIC(14, 2) NOT NULL,
  status          VARCHAR(50) DEFAULT 'pending',  -- pending, processing, completed, failed
  processed_at    TIMESTAMPTZ,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);
```

---

### `provider_payouts`
Individual provider payout records within a settlement.

```sql
CREATE TABLE provider_payouts (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  settlement_id   UUID NOT NULL REFERENCES payment_settlements(id),
  provider_id     UUID NOT NULL REFERENCES providers(id),
  delivery_count  INTEGER NOT NULL,
  gross_amount    NUMERIC(12, 2) NOT NULL,
  deductions      NUMERIC(12, 2) DEFAULT 0,
  net_amount      NUMERIC(12, 2) NOT NULL,
  bank_reference  VARCHAR(100),
  status          VARCHAR(50) DEFAULT 'pending',
  paid_at         TIMESTAMPTZ,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_payouts_settlement ON provider_payouts(settlement_id);
CREATE INDEX idx_payouts_provider ON provider_payouts(provider_id);
```

---

## Useful Queries

### Active deliveries by client
```sql
SELECT d.id, d.status, d.pickup_address, d.dropoff_address, d.created_at
FROM deliveries d
WHERE d.client_id = 'your-client-uuid'
  AND d.status NOT IN ('delivered', 'cancelled', 'failed')
ORDER BY d.created_at DESC;
```

### Provider reliability score refresh
```sql
SELECT
  provider_id,
  ROUND(
    AVG(CASE WHEN delivered_at <= estimated_delivery THEN 1.0 ELSE 0.0 END) * 100,
    2
  ) AS on_time_rate
FROM deliveries
WHERE status = 'delivered'
  AND created_at >= NOW() - INTERVAL '90 days'
GROUP BY provider_id;
```

---

*Last updated: 2025 | [Back to Repository Root](../../README.md)*
