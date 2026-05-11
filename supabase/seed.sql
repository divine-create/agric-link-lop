-- Seed data for local development
-- Run: supabase db reset (applies migrations then seed)

-- Demo client: AgriLink
INSERT INTO clients (id, name, email, api_key_hash, webhook_url, subscription_tier)
VALUES (
  'aaaaaaaa-0000-0000-0000-000000000001',
  'AgriLink Nigeria',
  'api@agrilink.ng',
  -- hash of 'dev_test_key_agrilink_2025' — replace with real hash in production
  encode(sha256('dev_test_key_agrilink_2025'), 'hex'),
  'https://agrilink.ng/webhooks/lop',
  'growth'
);

-- Demo providers
INSERT INTO providers (id, name, phone, vehicle_types, cold_chain_certified, reliability_score, status)
VALUES
  ('bbbbbbbb-0000-0000-0000-000000000001', 'Chidi Express Logistics', '+2348055566677', ARRAY['van','truck'], TRUE, 94.2, 'active'),
  ('bbbbbbbb-0000-0000-0000-000000000002', 'Adeola Swift Movers',     '+2348022233344', ARRAY['motorcycle'], FALSE, 82.5, 'active'),
  ('bbbbbbbb-0000-0000-0000-000000000003', 'Kano Cool Chain Co.',     '+2348011122233', ARRAY['refrigerated'], TRUE, 88.0, 'active');

-- Provider availability (near Calabar pickup point)
INSERT INTO provider_availability (provider_id, is_available, current_lat, current_lng, active_count)
VALUES
  ('bbbbbbbb-0000-0000-0000-000000000001', TRUE,  4.9800, 8.3500, 1),
  ('bbbbbbbb-0000-0000-0000-000000000002', TRUE,  4.9720, 8.3400, 0),
  ('bbbbbbbb-0000-0000-0000-000000000003', FALSE, 4.9600, 8.3300, 0);
