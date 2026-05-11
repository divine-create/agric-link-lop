import { DECISION_ENGINE, SCORE_WEIGHTS, URGENCY_MAX_RADIUS_KM } from '../constants';
import { haversineDistance } from './haversine';
import type { Provider, ProviderAvailability, Delivery } from '../types';

export interface ScoredProvider {
  provider: Provider;
  availability: ProviderAvailability;
  score: number;
  distanceKm: number;
}

export interface EligibleProviderRow extends Provider {
  availability: ProviderAvailability;
}

/** Filter providers by hard constraints before scoring. */
export function filterEligible(
  providers: EligibleProviderRow[],
  delivery: Pick<Delivery,
    'pickup_lat' | 'pickup_lng' | 'requires_cold_chain' | 'urgency' | 'package_weight_kg'>
): (EligibleProviderRow & { distanceKm: number })[] {
  const maxRadiusKm = URGENCY_MAX_RADIUS_KM[delivery.urgency] ?? 20;

  return providers
    .filter((p) => {
      if (p.status !== 'active') return false;
      if (!p.availability.is_available) return false;
      if (delivery.requires_cold_chain && !p.cold_chain_certified) return false;
      return true;
    })
    .map((p) => ({
      ...p,
      distanceKm: haversineDistance(
        p.availability.current_lat ?? 0,
        p.availability.current_lng ?? 0,
        delivery.pickup_lat,
        delivery.pickup_lng
      ),
    }))
    .filter((p) => p.distanceKm <= maxRadiusKm);
}

/** Compute composite score for a single provider against a delivery. */
export function scoreProvider(
  provider: EligibleProviderRow & { distanceKm: number },
  delivery: Pick<Delivery, 'urgency' | 'requires_cold_chain' | 'package_type'>
): number {
  const maxRadius = URGENCY_MAX_RADIUS_KM[delivery.urgency] ?? 20;

  // Proximity: closer = higher (0–100)
  let proximityScore = Math.max(0, 1 - provider.distanceKm / maxRadius) * 100;
  // Perishability urgency multiplier
  if (delivery.package_type === 'perishable' || delivery.requires_cold_chain) {
    proximityScore = Math.min(100, proximityScore * DECISION_ENGINE.PERISHABILITY_URGENCY_MULTIPLIER);
  }

  // Reliability: stored 0–100
  const reliabilityScore = Math.min(100, provider.reliability_score);

  // Cost efficiency: placeholder — providers don't quote yet; use inverse of active_count
  const costScore = 80; // static until dynamic pricing is available

  // Capacity match: simple vehicle presence check
  const capacityScore = provider.vehicle_types.length > 0 ? 100 : 0;

  // Load: fewer active deliveries = higher score
  const loadScore = Math.max(0, 100 - provider.availability.active_count * 20);

  return (
    proximityScore   * SCORE_WEIGHTS.proximity +
    reliabilityScore * SCORE_WEIGHTS.reliability +
    costScore        * SCORE_WEIGHTS.cost_efficiency +
    capacityScore    * SCORE_WEIGHTS.capacity_match +
    loadScore        * SCORE_WEIGHTS.load_inverse
  );
}

/** Return ranked providers. Returns empty array when no eligible providers found. */
export function rankProviders(
  providers: EligibleProviderRow[],
  delivery: Pick<Delivery,
    'pickup_lat' | 'pickup_lng' | 'requires_cold_chain' | 'urgency'
    | 'package_weight_kg' | 'package_type'>
): ScoredProvider[] {
  const eligible = filterEligible(providers, delivery);

  return eligible
    .map((p) => ({
      provider: p as Provider,
      availability: p.availability,
      score: scoreProvider(p, delivery),
      distanceKm: p.distanceKm,
    }))
    .filter((p) => p.score >= DECISION_ENGINE.MIN_SCORE_THRESHOLD)
    .sort((a, b) => b.score - a.score);
}
