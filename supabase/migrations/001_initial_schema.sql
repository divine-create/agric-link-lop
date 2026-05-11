-- AgriLink Logistics Platform — Initial Schema
-- Covers all 8 tables defined in docs/database/schema.md
-- Plus webhook_logs (ALS-75)

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ─── clients ───────────────────────────────────────────────────────────────
CREATE TABLE clients (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name              VARCHAR(255) NOT NULL,
  email             VARCHAR(255) UNIQUE NOT NULL,
  api_key_hash      VARCHAR(255) NOT NULL,
  webhook_url       TEXT,
  webhook_secret    VARCHAR(255),
  subscription_tier VARCHAR(50) DEFAULT 'starter'
                      CHECK (subscription_tier IN ('starter', 'growth', 'enterprise')),
  is_active         BOOLEAN DEFAULT TRUE,
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  updated_at        TIMESTAMPTZ DEFAULT NOW()
);

-- ─── providers ─────────────────────────────────────────────────────────────
CREATE TABLE providers (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name                  VARCHAR(255) NOT NULL,
  phone                 VARCHAR(20) UNIQUE NOT NULL,
  email                 VARCHAR(255),
  vehicle_types         TEXT[] NOT NULL,
  cold_chain_certified  BOOLEAN DEFAULT FALSE,
  coverage_zones        JSONB,
  bank_account_number   VARCHAR(20),
  bank_code             VARCHAR(10),
  reliability_score     NUMERIC(5,2) DEFAULT 70.00,
  status                VARCHAR(50) DEFAULT 'pending_review'
                          CHECK (status IN ('pending_review','active','suspended','inactive')),
  total_deliveries      INTEGER DEFAULT 0,
  created_at            TIMESTAMPTZ DEFAULT NOW(),
  updated_at            TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_providers_status   ON providers(status);
CREATE INDEX idx_providers_coverage ON providers USING GIN(coverage_zones);

-- ─── provider_availability ─────────────────────────────────────────────────
CREATE TABLE provider_availability (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id  UUID NOT NULL REFERENCES providers(id) ON DELETE CASCADE,
  is_available BOOLEAN NOT NULL DEFAULT FALSE,
  current_lat  NUMERIC(10,7),
  current_lng  NUMERIC(10,7),
  active_count INTEGER DEFAULT 0,
  last_ping_at TIMESTAMPTZ,
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);

CREATE UNIQUE INDEX idx_provider_availability_provider ON provider_availability(provider_id);

-- ─── deliveries ────────────────────────────────────────────────────────────
CREATE TABLE deliveries (
  id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id            UUID NOT NULL REFERENCES clients(id),
  provider_id          UUID REFERENCES providers(id),
  client_reference     VARCHAR(255),
  status               VARCHAR(50) NOT NULL DEFAULT 'pending'
                         CHECK (status IN ('pending','assigned','picked_up','in_transit','delivered','failed','cancelled')),

  -- Pickup
  pickup_address       TEXT NOT NULL,
  pickup_lat           NUMERIC(10,7) NOT NULL,
  pickup_lng           NUMERIC(10,7) NOT NULL,
  pickup_contact_name  VARCHAR(255),
  pickup_contact_phone VARCHAR(20),

  -- Dropoff
  dropoff_address       TEXT NOT NULL,
  dropoff_lat           NUMERIC(10,7) NOT NULL,
  dropoff_lng           NUMERIC(10,7) NOT NULL,
  dropoff_contact_name  VARCHAR(255),
  dropoff_contact_phone VARCHAR(20),

  -- Package
  package_type          VARCHAR(100) CHECK (package_type IN ('standard','perishable','fragile')),
  package_weight_kg     NUMERIC(8,2),
  package_description   TEXT,
  requires_cold_chain   BOOLEAN DEFAULT FALSE,

  -- Logistics
  urgency               VARCHAR(50) DEFAULT 'standard'
                          CHECK (urgency IN ('urgent','standard','scheduled')),
  delivery_fee          NUMERIC(12,2),
  commission_amount     NUMERIC(12,2),
  provider_payout       NUMERIC(12,2),

  -- Tracking
  tracking_url          TEXT,
  assigned_at           TIMESTAMPTZ,
  picked_up_at          TIMESTAMPTZ,
  delivered_at          TIMESTAMPTZ,
  estimated_delivery    TIMESTAMPTZ,

  created_at            TIMESTAMPTZ DEFAULT NOW(),
  updated_at            TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_deliveries_client_id  ON deliveries(client_id);
CREATE INDEX idx_deliveries_provider   ON deliveries(provider_id);
CREATE INDEX idx_deliveries_status     ON deliveries(status);
CREATE INDEX idx_deliveries_created_at ON deliveries(created_at DESC);

-- ─── tracking_events ───────────────────────────────────────────────────────
CREATE TABLE tracking_events (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  delivery_id UUID NOT NULL REFERENCES deliveries(id) ON DELETE CASCADE,
  event_type  VARCHAR(50) NOT NULL CHECK (event_type IN ('gps_ping','status_change','note')),
  latitude    NUMERIC(10,7),
  longitude   NUMERIC(10,7),
  status      VARCHAR(50),
  metadata    JSONB,
  recorded_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_tracking_delivery_id ON tracking_events(delivery_id);
CREATE INDEX idx_tracking_recorded_at ON tracking_events(recorded_at DESC);

-- ─── delivery_disputes ─────────────────────────────────────────────────────
CREATE TABLE delivery_disputes (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  delivery_id UUID NOT NULL REFERENCES deliveries(id),
  raised_by   VARCHAR(50) NOT NULL CHECK (raised_by IN ('client','provider','ops')),
  reason      VARCHAR(100) NOT NULL,
  description TEXT,
  status      VARCHAR(50) DEFAULT 'open'
                CHECK (status IN ('open','investigating','resolved','closed')),
  resolution  TEXT,
  resolved_at TIMESTAMPTZ,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ─── payment_settlements ───────────────────────────────────────────────────
CREATE TABLE payment_settlements (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  period_start     DATE NOT NULL,
  period_end       DATE NOT NULL,
  total_deliveries INTEGER NOT NULL,
  total_payout     NUMERIC(14,2) NOT NULL,
  status           VARCHAR(50) DEFAULT 'pending'
                     CHECK (status IN ('pending','processing','completed','failed')),
  processed_at     TIMESTAMPTZ,
  created_at       TIMESTAMPTZ DEFAULT NOW()
);

-- ─── provider_payouts ──────────────────────────────────────────────────────
CREATE TABLE provider_payouts (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  settlement_id UUID NOT NULL REFERENCES payment_settlements(id),
  provider_id   UUID NOT NULL REFERENCES providers(id),
  delivery_count INTEGER NOT NULL,
  gross_amount  NUMERIC(12,2) NOT NULL,
  deductions    NUMERIC(12,2) DEFAULT 0,
  net_amount    NUMERIC(12,2) NOT NULL,
  bank_reference VARCHAR(100),
  status        VARCHAR(50) DEFAULT 'pending'
                  CHECK (status IN ('pending','paid','failed')),
  paid_at       TIMESTAMPTZ,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_payouts_settlement ON provider_payouts(settlement_id);
CREATE INDEX idx_payouts_provider   ON provider_payouts(provider_id);

-- ─── webhook_logs (ALS-75) ─────────────────────────────────────────────────
CREATE TABLE webhook_logs (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  delivery_id     UUID NOT NULL REFERENCES deliveries(id),
  client_id       UUID NOT NULL REFERENCES clients(id),
  event_type      VARCHAR(100) NOT NULL,
  payload         JSONB NOT NULL,
  response_status INTEGER,
  attempt_count   INTEGER DEFAULT 0,
  last_attempt_at TIMESTAMPTZ,
  delivered_at    TIMESTAMPTZ,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_webhook_logs_delivery ON webhook_logs(delivery_id);
CREATE INDEX idx_webhook_logs_client   ON webhook_logs(client_id);

-- ─── updated_at trigger ────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

FOR tbl IN SELECT unnest(ARRAY[
  'clients','providers','deliveries','delivery_disputes'
]) LOOP
  EXECUTE format(
    'CREATE TRIGGER trg_updated_at BEFORE UPDATE ON %I
     FOR EACH ROW EXECUTE FUNCTION update_updated_at()',
    tbl
  );
END LOOP;
