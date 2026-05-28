-- ALS-211: Sliding-window rate limiting via fixed minute/day buckets
-- ALS-222: Tier-based quota enforcement (starter 30rpm/500d, growth 150rpm/5000d, enterprise unlimited)

CREATE TABLE IF NOT EXISTS rate_limit_counters (
  client_id   UUID         NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  window      VARCHAR(30)  NOT NULL,  -- 'm:YYYY-MM-DDTHH:MM' or 'd:YYYY-MM-DD'
  count       INT          NOT NULL DEFAULT 1,
  expires_at  TIMESTAMPTZ  NOT NULL,
  PRIMARY KEY (client_id, window)
);

CREATE INDEX IF NOT EXISTS idx_rate_limit_expires ON rate_limit_counters(expires_at);

-- Atomically increment a bucket counter, creating it if missing.
-- Returns the new count so the caller can check against the limit.
CREATE OR REPLACE FUNCTION increment_rate_limit(
  p_client_id  UUID,
  p_window     TEXT,
  p_expires_at TIMESTAMPTZ
) RETURNS INT LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
  v_count INT;
BEGIN
  INSERT INTO rate_limit_counters (client_id, window, count, expires_at)
  VALUES (p_client_id, p_window, 1, p_expires_at)
  ON CONFLICT (client_id, window)
  DO UPDATE SET count = rate_limit_counters.count + 1
  RETURNING count INTO v_count;

  RETURN v_count;
END;
$$;

-- Purge expired buckets. Called opportunistically from the rate limiter (1% chance per request).
CREATE OR REPLACE FUNCTION cleanup_rate_limit_counters() RETURNS void
LANGUAGE sql SECURITY DEFINER AS $$
  DELETE FROM rate_limit_counters WHERE expires_at < NOW();
$$;
