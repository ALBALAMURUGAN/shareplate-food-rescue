import { DonationItem, NGO, SmartMatchWeights } from '../types';

export const DEFAULT_MATCH_WEIGHTS: SmartMatchWeights = {
  distanceWeight: 0.40,
  expiryWeight: 0.45,
  capacityWeight: 0.15,
  maxRadiusKm: 15,
  urgentBoost: true,
};

/**
 * Calculates a dynamic Match Score (0 - 100%) for a given donation against target NGO needs or default average proximity.
 */
export function calculateMatchScore(
  donation: DonationItem,
  targetNGO?: NGO,
  weights: SmartMatchWeights = DEFAULT_MATCH_WEIGHTS
): number {
  // 1. Distance Score (0 to 100)
  const distKm = targetNGO ? getDistanceKm(donation.location, targetNGO.location) : donation.location.distanceKm;
  const clampedDist = Math.min(distKm, weights.maxRadiusKm);
  const distanceScore = Math.max(0, 100 * (1 - clampedDist / weights.maxRadiusKm));

  // 2. Expiry Deadline Urgency Score (0 to 100)
  const now = new Date().getTime();
  const expiryTime = new Date(donation.expiryTimestamp).getTime();
  const hoursLeft = (expiryTime - now) / (1000 * 60 * 60);

  let expiryScore = 0;
  if (hoursLeft <= 0) {
    expiryScore = 0; // Expired
  } else if (hoursLeft <= 1.5) {
    expiryScore = 100; // Super critical!
  } else if (hoursLeft <= 3) {
    expiryScore = 90;
  } else if (hoursLeft <= 6) {
    expiryScore = 75;
  } else if (hoursLeft <= 12) {
    expiryScore = 55;
  } else {
    expiryScore = 30;
  }

  // 3. Dietary Compatibility / Capacity Score (0 to 100)
  let fitScore = 80;
  if (targetNGO) {
    const hasDietMatch = donation.dietaryTags.some(tag => targetNGO.dietaryPreferences.includes(tag)) ||
      targetNGO.dietaryPreferences.includes('All Dietary Tags');
    fitScore = hasDietMatch ? 100 : 50;
  }

  // Calculate Weighted Sum
  let totalScore =
    (distanceScore * weights.distanceWeight) +
    (expiryScore * weights.expiryWeight) +
    (fitScore * weights.capacityWeight);

  // Apply Urgent Boost if enabled and under 2.5 hours remaining
  if (weights.urgentBoost && hoursLeft > 0 && hoursLeft <= 2.5) {
    totalScore = Math.min(100, totalScore * 1.15);
  }

  return Math.round(totalScore * 10) / 10;
}

/**
 * Helper Haversine distance algorithm
 */
function getDistanceKm(loc1: { lat: number; lng: number }, loc2: { lat: number; lng: number }): number {
  const R = 6371; // Earth's radius in km
  const dLat = (loc2.lat - loc1.lat) * Math.PI / 180;
  const dLng = (loc2.lng - loc1.lng) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(loc1.lat * Math.PI / 180) * Math.cos(loc2.lat * Math.PI / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

/**
 * Priority Sort function
 */
export function sortDonationsByPriority(
  donations: DonationItem[],
  ngo?: NGO,
  weights: SmartMatchWeights = DEFAULT_MATCH_WEIGHTS
): DonationItem[] {
  return [...donations].map(d => ({
    ...d,
    matchScore: calculateMatchScore(d, ngo, weights)
  })).sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
}
