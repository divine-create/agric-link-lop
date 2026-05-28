-- ALS-22: Add Expo push token column to provider_availability
ALTER TABLE provider_availability ADD COLUMN IF NOT EXISTS push_token text;
