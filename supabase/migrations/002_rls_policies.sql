-- Row Level Security policies for all tables
-- Roles: client (API key bearer), provider (phone OTP auth), admin

ALTER TABLE clients              ENABLE ROW LEVEL SECURITY;
ALTER TABLE providers            ENABLE ROW LEVEL SECURITY;
ALTER TABLE provider_availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE deliveries           ENABLE ROW LEVEL SECURITY;
ALTER TABLE tracking_events      ENABLE ROW LEVEL SECURITY;
ALTER TABLE delivery_disputes    ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_settlements  ENABLE ROW LEVEL SECURITY;
ALTER TABLE provider_payouts     ENABLE ROW LEVEL SECURITY;
ALTER TABLE webhook_logs         ENABLE ROW LEVEL SECURITY;

-- ─── Helpers ────────────────────────────────────────────────────────────────
-- JWT claim: role = 'admin' | 'client' | 'provider'
CREATE OR REPLACE FUNCTION jwt_role()
RETURNS TEXT AS $$
  SELECT coalesce(current_setting('request.jwt.claims', true)::jsonb->>'role', '');
$$ LANGUAGE sql STABLE;

CREATE OR REPLACE FUNCTION jwt_client_id()
RETURNS UUID AS $$
  SELECT (current_setting('request.jwt.claims', true)::jsonb->>'client_id')::uuid;
$$ LANGUAGE sql STABLE;

CREATE OR REPLACE FUNCTION jwt_provider_id()
RETURNS UUID AS $$
  SELECT (current_setting('request.jwt.claims', true)::jsonb->>'provider_id')::uuid;
$$ LANGUAGE sql STABLE;

-- ─── deliveries ─────────────────────────────────────────────────────────────
-- Clients see only their own deliveries
CREATE POLICY deliveries_client_select ON deliveries FOR SELECT
  USING (jwt_role() = 'client' AND client_id = jwt_client_id());

-- Clients create only for themselves
CREATE POLICY deliveries_client_insert ON deliveries FOR INSERT
  WITH CHECK (jwt_role() = 'client' AND client_id = jwt_client_id());

-- Providers see only deliveries assigned to them
CREATE POLICY deliveries_provider_select ON deliveries FOR SELECT
  USING (jwt_role() = 'provider' AND provider_id = jwt_provider_id());

-- Providers update status on their own deliveries
CREATE POLICY deliveries_provider_update ON deliveries FOR UPDATE
  USING (jwt_role() = 'provider' AND provider_id = jwt_provider_id())
  WITH CHECK (provider_id = jwt_provider_id());

-- Admins have full access
CREATE POLICY deliveries_admin ON deliveries FOR ALL
  USING (jwt_role() = 'admin');

-- ─── providers ──────────────────────────────────────────────────────────────
CREATE POLICY providers_own_select ON providers FOR SELECT
  USING (jwt_role() = 'provider' AND id = jwt_provider_id());

CREATE POLICY providers_own_update ON providers FOR UPDATE
  USING (jwt_role() = 'provider' AND id = jwt_provider_id())
  WITH CHECK (id = jwt_provider_id());

CREATE POLICY providers_admin ON providers FOR ALL
  USING (jwt_role() = 'admin');

-- ─── provider_availability ──────────────────────────────────────────────────
CREATE POLICY avail_provider ON provider_availability FOR ALL
  USING (jwt_role() IN ('provider', 'admin')
    AND (jwt_role() = 'admin' OR provider_id = jwt_provider_id()));

-- ─── tracking_events ────────────────────────────────────────────────────────
-- Public read for tracking page (by delivery_id only — no sensitive PII)
CREATE POLICY tracking_public_read ON tracking_events FOR SELECT
  USING (TRUE);

CREATE POLICY tracking_provider_insert ON tracking_events FOR INSERT
  WITH CHECK (
    jwt_role() IN ('provider', 'admin')
  );

-- ─── webhook_logs ───────────────────────────────────────────────────────────
CREATE POLICY webhook_logs_admin ON webhook_logs FOR ALL
  USING (jwt_role() = 'admin');

-- ─── payment_settlements / provider_payouts ─────────────────────────────────
CREATE POLICY settlements_admin ON payment_settlements FOR ALL
  USING (jwt_role() = 'admin');

CREATE POLICY payouts_admin ON provider_payouts FOR ALL
  USING (jwt_role() = 'admin');

CREATE POLICY payouts_provider_select ON provider_payouts FOR SELECT
  USING (jwt_role() = 'provider' AND provider_id = jwt_provider_id());
