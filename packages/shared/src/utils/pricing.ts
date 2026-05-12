import { PRICING } from '../constants';
import { haversineDistance } from './haversine';
import type { DeliveryUrgency, PackageType } from '../types';

export interface PricingInput {
  pickupLat: number;
  pickupLng: number;
  dropoffLat: number;
  dropoffLng: number;
  vehicleType: string;
  requiresColdChain?: boolean;
  urgency?: DeliveryUrgency;
  packageType?: PackageType;
  requestedAt?: Date;
}

export interface PricingResult {
  distanceKm: number;
  baseAmount: number;
  surcharges: { name: string; amount: number }[];
  totalFee: number;
}

export function calculateDeliveryFee(input: PricingInput): PricingResult {
  const distanceKm = haversineDistance(
    input.pickupLat, input.pickupLng,
    input.dropoffLat, input.dropoffLng
  );

  const vehicleMultiplier =
    PRICING.VEHICLE_MULTIPLIERS[input.vehicleType as keyof typeof PRICING.VEHICLE_MULTIPLIERS] ?? 1.0;

  const baseAmount = Math.max(
    distanceKm * PRICING.BASE_RATE_PER_KM * vehicleMultiplier,
    PRICING.MINIMUM_DELIVERY_FEE
  );

  const surcharges: { name: string; amount: number }[] = [];

  if (input.requiresColdChain) {
    surcharges.push({ name: 'cold_chain', amount: baseAmount * PRICING.COLD_CHAIN_SURCHARGE });
  }

  const hour = (input.requestedAt ?? new Date()).getHours();
  const isPeak = (hour >= 7 && hour < 9) || (hour >= 17 && hour < 19);
  if (isPeak) {
    surcharges.push({ name: 'peak_hour', amount: baseAmount * PRICING.PEAK_HOUR_SURCHARGE });
  }

  const totalFee = baseAmount + surcharges.reduce((sum, s) => sum + s.amount, 0);

  return { distanceKm, baseAmount, surcharges, totalFee: Math.round(totalFee) };
}
