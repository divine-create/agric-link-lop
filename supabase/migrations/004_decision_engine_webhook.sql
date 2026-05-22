-- ALS-17: DB webhook — fires decision engine on new pending delivery
-- Uses pg_net for async HTTP so the INSERT transaction is not blocked.

CREATE EXTENSION IF NOT EXISTS pg_net;

CREATE OR REPLACE FUNCTION public.trigger_decision_engine()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  PERFORM net.http_post(
    url     := 'https://xvhxepnqqvhqnbwlbxfi.supabase.co/functions/v1/decision-engine',
    headers := jsonb_build_object(
      'Content-Type',  'application/json',
      'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh2aHhlcG5xcXZocW5id2xieGZpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODU5MzExOCwiZXhwIjoyMDk0MTY5MTE4fQ.y37mMHl2pa-jr3JBQnWEiHypkpSceyT46P6M4U4ksYo'
    ),
    body    := jsonb_build_object('delivery_id', NEW.id::text)
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_delivery_created
  AFTER INSERT ON public.deliveries
  FOR EACH ROW
  WHEN (NEW.status = 'pending')
  EXECUTE FUNCTION public.trigger_decision_engine();
