-- ALS-18: DB triggers — fire outbound webhooks on delivery status change and dispute creation

CREATE OR REPLACE FUNCTION public.trigger_webhook_on_status_change()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.status IS DISTINCT FROM OLD.status THEN
    PERFORM net.http_post(
      url     := 'https://xvhxepnqqvhqnbwlbxfi.supabase.co/functions/v1/webhooks',
      headers := jsonb_build_object(
        'Content-Type',  'application/json',
        'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh2aHhlcG5xcXZocW5id2xieGZpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODU5MzExOCwiZXhwIjoyMDk0MTY5MTE4fQ.y37mMHl2pa-jr3JBQnWEiHypkpSceyT46P6M4U4ksYo'
      ),
      body    := jsonb_build_object(
        'delivery_id',     NEW.id::text,
        'previous_status', OLD.status,
        'new_status',      NEW.status
      )
    );
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_delivery_status_changed
  AFTER UPDATE ON public.deliveries
  FOR EACH ROW
  EXECUTE FUNCTION public.trigger_webhook_on_status_change();

-- Fire webhook when a dispute is raised
CREATE OR REPLACE FUNCTION public.trigger_webhook_on_dispute()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  PERFORM net.http_post(
    url     := 'https://xvhxepnqqvhqnbwlbxfi.supabase.co/functions/v1/webhooks',
    headers := jsonb_build_object(
      'Content-Type',  'application/json',
      'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh2aHhlcG5xcXZocW5id2xieGZpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODU5MzExOCwiZXhwIjoyMDk0MTY5MTE4fQ.y37mMHl2pa-jr3JBQnWEiHypkpSceyT46P6M4U4ksYo'
    ),
    body    := jsonb_build_object(
      'delivery_id', NEW.delivery_id::text,
      'event_type',  'delivery.dispute_raised',
      'dispute_id',  NEW.id::text
    )
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_dispute_created
  AFTER INSERT ON public.delivery_disputes
  FOR EACH ROW
  EXECUTE FUNCTION public.trigger_webhook_on_dispute();
