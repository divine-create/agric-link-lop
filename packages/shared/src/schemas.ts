import { z } from 'zod'

export const CreateDeliverySchema = z.object({
  client_reference: z.string().optional(),
  pickup_address: z.string().min(1),
  pickup_lat: z.number().min(-90).max(90),
  pickup_lng: z.number().min(-180).max(180),
  pickup_contact_name: z.string().optional(),
  pickup_contact_phone: z.string().optional(),
  dropoff_address: z.string().min(1),
  dropoff_lat: z.number().min(-90).max(90),
  dropoff_lng: z.number().min(-180).max(180),
  dropoff_contact_name: z.string().optional(),
  dropoff_contact_phone: z.string().optional(),
  package_type: z.enum(['standard', 'perishable', 'fragile']).optional(),
  package_weight_kg: z.number().positive().optional(),
  package_description: z.string().optional(),
  requires_cold_chain: z.boolean().default(false),
  urgency: z.enum(['urgent', 'standard', 'scheduled']).default('standard'),
})

export const ProviderLocationSchema = z.object({
  provider_id: z.string().uuid(),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  is_available: z.boolean(),
})

export const TrackingEventSchema = z.object({
  delivery_id: z.string().uuid(),
  event_type: z.enum(['gps_ping', 'status_change', 'note']),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  status: z.string().optional(),
  metadata: z.record(z.unknown()).optional(),
})

export type CreateDelivery = z.infer<typeof CreateDeliverySchema>
export type ProviderLocation = z.infer<typeof ProviderLocationSchema>
export type TrackingEvent = z.infer<typeof TrackingEventSchema>
