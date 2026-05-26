-- ALS-223: Idempotency keys table — cache POST /v1/deliveries responses for duplicate prevention
CREATE TABLE IF NOT EXISTS idempotency_keys (
  key          VARCHAR(255) NOT NULL,
  client_id    UUID NOT NULL REFERENCES clients(id),
  response     JSONB NOT NULL,
  status_code  INT NOT NULL DEFAULT 201,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (key, client_id)
);

-- Auto-expire idempotency keys after 24 hours
CREATE INDEX IF NOT EXISTS idx_idempotency_created ON idempotency_keys(created_at);

-- ALS-221: Self-service client registration columns
ALTER TABLE clients ADD COLUMN IF NOT EXISTS company_name VARCHAR(255);
ALTER TABLE clients ADD COLUMN IF NOT EXISTS use_case TEXT;
ALTER TABLE clients ADD COLUMN IF NOT EXISTS api_key_prefix VARCHAR(8);
