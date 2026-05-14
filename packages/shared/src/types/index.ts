// ─── Core entity types matching supabase/migrations/001_initial_schema.sql ───

export type SubscriptionTier = 'starter' | 'growth' | 'enterprise';
export type ProviderStatus = 'pending_review' | 'active' | 'suspended' | 'inactive';
export type DeliveryStatus =
  | 'pending'
  | 'assigned'
  | 'picked_up'
  | 'in_transit'
  | 'delivered'
  | 'failed'
  | 'cancelled';
export type DeliveryUrgency = 'urgent' | 'standard' | 'scheduled';
export type PackageType = 'standard' | 'perishable' | 'fragile';
export type DisputeStatus = 'open' | 'investigating' | 'resolved' | 'closed';
export type SettlementStatus = 'pending' | 'processing' | 'completed' | 'failed';
export type TrackingEventType = 'gps_ping' | 'status_change' | 'note';

export interface Client {
  id: string;
  name: string;
  email: string;
  api_key_hash: string;
  webhook_url: string | null;
  webhook_secret: string | null;
  subscription_tier: SubscriptionTier;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Provider {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  vehicle_types: string[];
  cold_chain_certified: boolean;
  coverage_zones: GeoJSON | null;
  bank_account_number: string | null;
  bank_code: string | null;
  reliability_score: number;
  status: ProviderStatus;
  total_deliveries: number;
  created_at: string;
  updated_at: string;
}

export interface ProviderAvailability {
  id: string;
  provider_id: string;
  is_available: boolean;
  current_lat: number | null;
  current_lng: number | null;
  active_count: number;
  last_ping_at: string | null;
  updated_at: string;
}

export interface Delivery {
  id: string;
  client_id: string;
  provider_id: string | null;
  client_reference: string | null;
  status: DeliveryStatus;
  pickup_address: string;
  pickup_lat: number;
  pickup_lng: number;
  pickup_contact_name: string | null;
  pickup_contact_phone: string | null;
  dropoff_address: string;
  dropoff_lat: number;
  dropoff_lng: number;
  dropoff_contact_name: string | null;
  dropoff_contact_phone: string | null;
  package_type: PackageType | null;
  package_weight_kg: number | null;
  package_description: string | null;
  requires_cold_chain: boolean;
  urgency: DeliveryUrgency;
  delivery_fee: number | null;
  commission_amount: number | null;
  provider_payout: number | null;
  tracking_url: string | null;
  assigned_at: string | null;
  picked_up_at: string | null;
  delivered_at: string | null;
  estimated_delivery: string | null;
  created_at: string;
  updated_at: string;
}

export interface TrackingEvent {
  id: string;
  delivery_id: string;
  event_type: TrackingEventType;
  latitude: number | null;
  longitude: number | null;
  status: DeliveryStatus | null;
  metadata: Record<string, unknown> | null;
  recorded_at: string;
}

export interface DeliveryDispute {
  id: string;
  delivery_id: string;
  raised_by: 'client' | 'provider' | 'ops';
  reason: string;
  description: string | null;
  status: DisputeStatus;
  resolution: string | null;
  resolved_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface PaymentSettlement {
  id: string;
  period_start: string;
  period_end: string;
  total_deliveries: number;
  total_payout: number;
  status: SettlementStatus;
  processed_at: string | null;
  created_at: string;
}

export interface ProviderPayout {
  id: string;
  settlement_id: string;
  provider_id: string;
  delivery_count: number;
  gross_amount: number;
  deductions: number;
  net_amount: number;
  bank_reference: string | null;
  status: 'pending' | 'paid' | 'failed';
  paid_at: string | null;
  created_at: string;
}

export interface WebhookLog {
  id: string;
  delivery_id: string;
  client_id: string;
  event_type: string;
  payload: Record<string, unknown>;
  response_status: number | null;
  attempt_count: number;
  last_attempt_at: string | null;
  delivered_at: string | null;
  created_at: string;
}

// ─── API request / response shapes ───

export interface CreateDeliveryRequest {
  pickup: {
    address: string;
    latitude: number;
    longitude: number;
    contact_name?: string;
    contact_phone?: string;
  };
  dropoff: {
    address: string;
    latitude: number;
    longitude: number;
    contact_name?: string;
    contact_phone?: string;
  };
  package: {
    type?: PackageType;
    weight_kg?: number;
    description?: string;
    requires_cold_chain?: boolean;
  };
  urgency?: DeliveryUrgency;
  callback_url?: string;
  client_reference?: string;
}

export interface GeoJSON {
  type: string;
  coordinates: unknown;
}

// Backwards-compat aliases
export type Urgency = DeliveryUrgency;
export type UserRole = 'admin' | 'client' | 'provider';
