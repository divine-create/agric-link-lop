// ─── Delivery status transitions (valid next states) ───
export const VALID_STATUS_TRANSITIONS: Record<string, string[]> = {
  pending:    ['assigned', 'cancelled'],
  assigned:   ['picked_up', 'cancelled'],
  picked_up:  ['in_transit'],
  in_transit: ['delivered', 'failed'],
  delivered:  [],
  failed:     [],
  cancelled:  [],
};

// ─── Subscription tier rate limits ───
export const TIER_RATE_LIMITS = {
  starter:    { rpm: 30,  daily_deliveries: 500 },
  growth:     { rpm: 150, daily_deliveries: 5000 },
  enterprise: { rpm: Infinity, daily_deliveries: Infinity },
} as const;

// ─── Commission rates by tier ───
export const COMMISSION_RATES = {
  starter:    0.08,  // 8%
  growth:     0.065, // 6.5%
  enterprise: 0.045, // 4.5%
} as const;

// ─── Decision engine thresholds ───
export const DECISION_ENGINE = {
  MIN_SCORE_THRESHOLD: 60,
  ACCEPTANCE_TIMER_MS: 120_000,         // 2 minutes standard
  PERISHABLE_ACCEPTANCE_TIMER_MS: 60_000, // 1 minute for perishables
  MAX_RETRIES: 3,
  PERISHABILITY_URGENCY_MULTIPLIER: 1.2,
  STARTER_RELIABILITY_SCORE: 70,        // new providers with < 10 deliveries
  AB_TEST_FRACTION: 0.05,               // 5% random assignment for learning
} as const;

// ─── Urgency radius limits (km) ───
export const URGENCY_MAX_RADIUS_KM: Record<string, number> = {
  urgent:    5,
  standard:  20,
  scheduled: 50,
};

// ─── Scoring weights ───
export const SCORE_WEIGHTS = {
  proximity:    0.30,
  reliability:  0.25,
  cost_efficiency: 0.20,
  capacity_match:  0.15,
  load_inverse:    0.10,
} as const;

// ─── Pricing constants (Naira) ───
export const PRICING = {
  BASE_RATE_PER_KM: 250,          // ₦250/km base
  MINIMUM_DELIVERY_FEE: 1_500,    // ₦1,500 minimum
  COLD_CHAIN_SURCHARGE: 0.30,     // 30% premium
  PEAK_HOUR_SURCHARGE: 0.20,      // 20% peak (7-9am, 5-7pm)
  VEHICLE_MULTIPLIERS: {
    motorcycle: 1.0,
    van:        1.4,
    truck:      2.0,
    refrigerated: 1.8,
  },
} as const;

// ─── Vehicle types ───
export const VEHICLE_TYPES = ['motorcycle', 'van', 'truck', 'refrigerated'] as const;
export type VehicleType = typeof VEHICLE_TYPES[number];
