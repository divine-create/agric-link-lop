-- Enable Supabase Realtime publications on tables that need live updates (ALS-34)

BEGIN;
  -- Realtime for GPS tracking (provider mobile → web tracking page)
  ALTER PUBLICATION supabase_realtime ADD TABLE tracking_events;

  -- Realtime for delivery status (admin live dispatch, business dashboard)
  ALTER PUBLICATION supabase_realtime ADD TABLE deliveries;

  -- Realtime for provider availability (decision engine queries)
  ALTER PUBLICATION supabase_realtime ADD TABLE provider_availability;
COMMIT;
