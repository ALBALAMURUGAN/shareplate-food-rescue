export type UserRole = 'donor' | 'ngo' | 'volunteer' | 'admin';

export type DonorType = 'restaurant' | 'hostel' | 'event' | 'bakery' | 'supermarket' | 'caterer';

export type FoodCategory = 'cooked' | 'bakery' | 'produce' | 'packaged' | 'dairy';

export type StorageReq = 'Hot (>60°C)' | 'Refrigerated (2-4°C)' | 'Ambient Room Temp';

export type UrgencyLevel = 'critical' | 'high' | 'medium';

export type ListingStatus = 'available' | 'claimed' | 'in_transit' | 'delivered' | 'expired';

export interface LocationInfo {
  address: string;
  city: string;
  lat: number;
  lng: number;
  distanceKm: number;
}

export interface ClaimInfo {
  ngoId: string;
  ngoName: string;
  claimedAt: string;
  volunteerId?: string;
  volunteerName?: string;
  etaMinutes?: number;
  notes?: string;
}

export interface DonationItem {
  id: string;
  title: string;
  donorName: string;
  donorType: DonorType;
  donorVerified: boolean;
  donorRating: number;
  donorPhone: string;
  foodCategory: FoodCategory;
  quantityDescription: string;
  quantityKg: number;
  servings: number;
  expiryTimestamp: string; // ISO string
  pickupWindow: string;
  location: LocationInfo;
  status: ListingStatus;
  dietaryTags: string[];
  storageRequirement: StorageReq;
  urgencyLevel: UrgencyLevel;
  imageUrl: string;
  hygieneScore: number; // e.g. 99%
  claimInfo?: ClaimInfo;
  createdAt: string;
  description: string;
  allergens?: string[];
  co2SavedKg: number;
  matchScore?: number; // Calculated dynamic match percentage
}

export interface NGO {
  id: string;
  name: string;
  type: 'Shelter' | 'Food Bank' | 'Community Kitchen' | 'Orphanage' | 'Elderly Care';
  capacity: number; // meals daily
  currentNeeds: number;
  location: LocationInfo;
  dietaryPreferences: string[];
  contactPerson: string;
  phone: string;
  verified: boolean;
  activeRequests: number;
}

export interface Volunteer {
  id: string;
  name: string;
  vehicleType: 'Van' | 'E-Bike' | 'Car' | 'Motorcycle';
  status: 'active' | 'busy' | 'offline';
  phone: string;
  completedRescues: number;
  rating: number;
  location: { lat: number; lng: number };
}

export interface SystemNotification {
  id: string;
  title: string;
  message: string;
  type: 'alert' | 'claim' | 'dispatch' | 'delivery' | 'system';
  timestamp: string;
  read: boolean;
  linkId?: string;
}

export interface SmartMatchWeights {
  distanceWeight: number; // e.g. 0.4
  expiryWeight: number;   // e.g. 0.45
  capacityWeight: number; // e.g. 0.15
  maxRadiusKm: number;    // e.g. 15 km
  urgentBoost: boolean;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  actor: string;
  role: string;
  action: string;
  details: string;
  status: 'success' | 'warning' | 'info';
}
