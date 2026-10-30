export type UserRole = 'farmer' | 'buyer' | 'fpo' | 'admin';

export type AppLanguage = 'en' | 'kn' | 'te' | 'ta' | 'hi';

export interface User {
  id: string;
  name: string;
  phone: string;
  role: UserRole;
  language: AppLanguage;
  state: string;
  district: string;
  village: string;
  avatar?: string;
  isDemoUser?: boolean;
}

export interface FarmerProfile extends User {
  role: 'farmer';
  mainCrops: string[];
  totalLandAcres: number;
  fpoMembership?: string;
  bankAccountVerified: boolean;
}

export interface BuyerProfile {
  id: string;
  businessName: string;
  contactPerson: string;
  phone: string;
  businessCategory: 'Wholesale Trader' | 'Retail Chain' | 'Food Processor' | 'Distributor' | 'Institutional Buyer';
  location: string;
  district: string;
  state: string;
  cropsPurchased: string[];
  dailyDemandKg: number;
  paymentTerms: string;
  collectionAvailability: 'Farmgate Pickup' | 'Mandi Delivery' | 'Collection Centre';
  verificationStatus: 'Demo Verified' | 'Pending Verification' | 'Expired';
  rating: number;
  reviewCount: number;
  offersCount: number;
  completedTransactionsCount: number;
}

export interface FPOProfile {
  id: string;
  organizationName: string;
  registrationNumber: string;
  headquarters: string;
  districtsCovered: string[];
  contactPerson: string;
  phone: string;
  farmerCount: number;
  activeCollectionCentres: number;
  totalAggregatedTonnes: number;
}

export interface ProduceListing {
  id: string;
  farmerId: string;
  farmerName: string;
  crop: string;
  variety: string;
  quantityKg: number;
  qualityGrade: 'A (Premium)' | 'B (Standard)' | 'C (Fair)';
  harvestStatus: 'Ready for Sale' | 'Harvesting in 3 Days' | 'Harvesting Next Week';
  location: {
    village: string;
    district: string;
    state: string;
    pinCode: string;
  };
  expectedHarvestDate: string;
  preferredSellingDate: string;
  minAcceptablePricePerKg: number;
  status: 'active' | 'in_negotiation' | 'sold';
  createdAt: string;
}

export interface MarketPrice {
  id: string;
  commodity: string;
  variety: string;
  marketName: string;
  district: string;
  state: string;
  minPrice: number;
  maxPrice: number;
  modalPrice: number;
  arrivalsTonnes: number;
  updatedAt: string;
  source: 'AGMARKNET (Demonstration Feed)' | 'e-NAM (Demonstration Feed)';
  trend: 'up' | 'down' | 'stable';
}

export interface BuyerOffer {
  id: string;
  buyerId: string;
  buyerName: string;
  buyerCategory: string;
  crop: string;
  offeredPricePerKg: number;
  minQuantityKg: number;
  maxQuantityKg: number;
  location: string;
  district?: string;
  distanceKm: number;
  paymentTerms: string;
  collectionType: 'Farmgate' | 'Mandi' | 'Collection Centre';
  verificationStatus: string;
  validUntil: string;
}

export type MarketDataSourceType =
  | 'LIVE MARKET DATA'
  | 'HISTORICAL MARKET DATA'
  | 'BUYER-SUBMITTED OFFER'
  | 'SIMULATED DEMO DATA';

export interface SellingOptionEligibility {
  isEligible: boolean;
  minQuantityKg: number;
  membershipRequired: boolean;
  membershipStatusText: string;
  locationAvailability: string;
  reasonIfNotEligible?: string;
}

export interface SellingComparisonInput {
  crop: string;
  quantityKg: number;
  village: string;
  district: string;
  qualityGrade: string;
  sellingDate: string;
  isFpoMember?: boolean;
}

export interface SellingOption {
  id: string;
  name: string;
  type: 'local_trader' | 'nearby_mandi' | 'distant_buyer' | 'fpo_collective';
  distanceKm: number;
  location: string;
  pricePerKg: number;
  grossAmount: number;
  transportCost: number;
  loadingCost: number;
  commissionCost: number;
  marketFees: number;
  expectedDeductions: number;
  spoilageCost?: number;
  packagingCost?: number;
  otherExpenses: number;
  totalExpenses: number;
  estimatedNetEarnings: number;
  netEarningsPerKg: number;
  isRecommended: boolean;
  recommendationBadge?: string;
  badgeType?: 'best_earnings' | 'lowest_transport' | 'highest_gross' | 'collective_value';
  highlights: string[];
  eligibility?: SellingOptionEligibility;
  dataSource?: MarketDataSourceType;
}

export interface SellingComparisonResult {
  input: SellingComparisonInput;
  options: SellingOption[];
  recommendedOptionId: string;
  recommendedOptionName?: string;
  maxNetEarnings: number;
  netDifferenceOverLocal: number;
  netDifferenceOverNextBest?: number;
  recommendationReason?: string;
  calculatedAt: string;
}

export interface CollectiveGroupMember {
  farmerId: string;
  farmerName: string;
  village: string;
  quantityKg: number;
  joinedAt: string;
}

export interface CollectiveGroup {
  id: string;
  name: string;
  crop: string;
  variety: string;
  targetBuyer: string;
  currentQuantityKg: number;
  targetQuantityKg: number;
  memberCount: number;
  collectionCenter: string;
  expectedCollectionDate: string;
  individualTransportCostPerKg: number;
  collectiveTransportCostPerKg: number;
  savingsPerKg: number;
  status: 'Collecting Produce' | 'Ready for Dispatch' | 'Completed';
  members: CollectiveGroupMember[];
}

export interface TransportPartner {
  id: string;
  companyName: string;
  contactPerson: string;
  phone: string;
  vehicleType: 'Small Goods Vehicle (Tata Ace/1.5T)' | 'Medium Goods Vehicle (407/4T)' | 'Large Agricultural Truck (10T+)';
  capacityKg: number;
  baseFare: number;
  ratePerKm: number;
  availableDistricts: string[];
  rating: number;
}

export type ShipmentStatus = 'requested' | 'confirmed' | 'pickup_scheduled' | 'collected' | 'in_transit' | 'delivered';

export interface Shipment {
  id: string;
  transactionId?: string;
  transportPartnerId: string;
  transportPartnerName: string;
  vehicleType: string;
  pickupLocation: string;
  deliveryLocation: string;
  distanceKm: number;
  totalCost: number;
  collectionDate: string;
  status: ShipmentStatus;
  currentLocationNote: string;
  milestones: {
    status: ShipmentStatus;
    label: string;
    timestamp: string;
    completed: boolean;
  }[];
}

export type TransactionStatus =
  | 'offer_received'
  | 'offer_accepted'
  | 'sale_confirmed'
  | 'pickup_scheduled'
  | 'produce_collected'
  | 'delivered'
  | 'payment_pending'
  | 'payment_completed';

export interface TransactionExpenseItem {
  name: string;
  estimated: number;
  actual: number;
}

export interface TransactionDispute {
  id: string;
  transactionId: string;
  reportedBy: string;
  category: 'Quality Deduction Mismatch' | 'Weight Shortage' | 'Payment Delay' | 'Transportation Delay';
  description: string;
  status: 'Open' | 'Under FPO Review' | 'Resolved';
  reportedAt: string;
}

export interface Transaction {
  id: string;
  farmerId: string;
  farmerName: string;
  farmerPhone: string;
  buyerId: string;
  buyerName: string;
  buyerCategory: string;
  crop: string;
  quantityKg: number;
  agreedPricePerKg: number;
  grossValue: number;
  estimatedExpenses: number;
  estimatedNetEarnings: number;
  actualExpenses: number;
  actualFinalPayment: number;
  actualNetEarnings: number;
  status: TransactionStatus;
  paymentTerms: string;
  collectionPoint: string;
  createdAt: string;
  completedAt?: string;
  expensesBreakdown: TransactionExpenseItem[];
  dispute?: TransactionDispute;
  timeline: {
    stage: TransactionStatus;
    label: string;
    timestamp: string;
    completed: boolean;
    note?: string;
  }[];
}

export interface VoiceSessionRecord {
  id: string;
  timestamp: string;
  durationSeconds: number;
  language: AppLanguage;
  cropSelected: string;
  quantityKg: number;
  district: string;
  recommendedOption: string;
  recommendedNet: number;
  userOutcome: 'callback_requested' | 'connected_coordinator' | 'replay_heard' | 'call_completed';
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: 'offer' | 'price_alert' | 'shipment' | 'transaction' | 'collective';
  timestamp: string;
  read: boolean;
  link?: string;
}

export interface PriceAlert {
  id: string;
  farmerId: string;
  crop: string;
  targetPricePerKg: number;
  createdAt: string;
  isActive: boolean;
}
