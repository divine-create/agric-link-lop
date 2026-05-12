export type DeliveryStatus =
  | 'pending' | 'assigned' | 'picked_up'
  | 'in_transit' | 'delivered' | 'failed' | 'cancelled'

export type ProviderStatus = 'pending_review' | 'active' | 'suspended' | 'inactive'

export type DisputeStatus = 'open' | 'investigating' | 'resolved' | 'closed'

export type SettlementStatus = 'pending' | 'processing' | 'completed' | 'failed'

export type PackageType = 'standard' | 'perishable' | 'fragile'

export type Urgency = 'urgent' | 'standard' | 'scheduled'

export type UserRole = 'admin' | 'client' | 'provider'
