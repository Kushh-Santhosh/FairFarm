import {
  FarmerProfile,
  BuyerProfile,
  FPOProfile,
  ProduceListing,
  MarketPrice,
  BuyerOffer,
  CollectiveGroup,
  TransportPartner,
  Shipment,
  Transaction,
  VoiceSessionRecord,
  AppNotification,
  PriceAlert,
  UserRole,
} from '../types';

// ==========================================
// SEED DATASETS (Realistic Indian Agritech Data)
// ==========================================

export const SEED_FARMERS: FarmerProfile[] = [
  {
    id: 'farmer-1',
    name: 'Ramesh Gowda',
    phone: '+91 98451 23410',
    role: 'farmer',
    language: 'kn',
    state: 'Karnataka',
    district: 'Bengaluru Rural',
    village: 'Hoskote Taluk (Doddagattiganabbe)',
    mainCrops: ['Tomato', 'Beans', 'Cabbage'],
    totalLandAcres: 3.5,
    fpoMembership: 'Hoskote Farmer Producer Co.',
    bankAccountVerified: true,
  },
  {
    id: 'farmer-2',
    name: 'Suresh Kumar',
    phone: '+91 94482 11982',
    role: 'farmer',
    language: 'kn',
    state: 'Karnataka',
    district: 'Kolar',
    village: 'Malur',
    mainCrops: ['Tomato', 'Potato'],
    totalLandAcres: 5.0,
    fpoMembership: 'Kolar Agro Farmer Collective',
    bankAccountVerified: true,
  },
  {
    id: 'farmer-3',
    name: 'Anjinappa Reddy',
    phone: '+91 97410 88219',
    role: 'farmer',
    language: 'te',
    state: 'Karnataka',
    district: 'Chikkaballapur',
    village: 'Sidlaghatta',
    mainCrops: ['Tomato', 'Onion', 'Mulberry'],
    totalLandAcres: 4.2,
    fpoMembership: 'Chikkaballapur FPO',
    bankAccountVerified: true,
  },
  {
    id: 'farmer-4',
    name: 'Manjunath B.',
    phone: '+91 99805 44102',
    role: 'farmer',
    language: 'kn',
    state: 'Karnataka',
    district: 'Ramanagara',
    village: 'Kanakapura',
    mainCrops: ['Ragi', 'Groundnut', 'Tomato'],
    totalLandAcres: 2.8,
    bankAccountVerified: true,
  },
  {
    id: 'farmer-5',
    name: 'Chennappa Nayak',
    phone: '+91 94812 77301',
    role: 'farmer',
    language: 'kn',
    state: 'Karnataka',
    district: 'Mysuru',
    village: 'Nanjangud',
    mainCrops: ['Maize', 'Banana', 'Onion'],
    totalLandAcres: 6.0,
    bankAccountVerified: true,
  },
  {
    id: 'farmer-6',
    name: 'Shivanna Gowda',
    phone: '+91 96112 34900',
    role: 'farmer',
    language: 'kn',
    state: 'Karnataka',
    district: 'Bengaluru Rural',
    village: 'Nelamangala',
    mainCrops: ['Beans', 'Tomato'],
    totalLandAcres: 3.0,
    bankAccountVerified: true,
  },
  {
    id: 'farmer-7',
    name: 'Venkatesh Murthy',
    phone: '+91 98863 12904',
    role: 'farmer',
    language: 'te',
    state: 'Karnataka',
    district: 'Kolar',
    village: 'Srinivaspur',
    mainCrops: ['Mango', 'Tomato'],
    totalLandAcres: 8.5,
    bankAccountVerified: true,
  },
  {
    id: 'farmer-8',
    name: 'Lakshmamma Devi',
    phone: '+91 97312 90112',
    role: 'farmer',
    language: 'kn',
    state: 'Karnataka',
    district: 'Bengaluru Rural',
    village: 'Devanahalli',
    mainCrops: ['Ragi', 'Onion'],
    totalLandAcres: 2.0,
    bankAccountVerified: true,
  },
  {
    id: 'farmer-9',
    name: 'Rajendra Prasad',
    phone: '+91 94498 76543',
    role: 'farmer',
    language: 'hi',
    state: 'Karnataka',
    district: 'Kolar',
    village: 'Bangarapet',
    mainCrops: ['Potato', 'Carrot'],
    totalLandAcres: 4.0,
    bankAccountVerified: true,
  },
  {
    id: 'farmer-10',
    name: 'Krishnamurthy S.',
    phone: '+91 98450 34567',
    role: 'farmer',
    language: 'ta',
    state: 'Karnataka',
    district: 'Bengaluru Rural',
    village: 'Hoskote',
    mainCrops: ['Tomato', 'Capsicum'],
    totalLandAcres: 3.2,
    bankAccountVerified: true,
  },
  {
    id: 'farmer-11',
    name: 'Basavaraj Patil',
    phone: '+91 99001 23890',
    role: 'farmer',
    language: 'kn',
    state: 'Karnataka',
    district: 'Mysuru',
    village: 'Hunsur',
    mainCrops: ['Tobacco', 'Maize', 'Tomato'],
    totalLandAcres: 7.0,
    bankAccountVerified: true,
  },
  {
    id: 'farmer-12',
    name: 'Muniyappa G.',
    phone: '+91 98442 89012',
    role: 'farmer',
    language: 'kn',
    state: 'Karnataka',
    district: 'Chikkaballapur',
    village: 'Gauribidanur',
    mainCrops: ['Groundnut', 'Maize'],
    totalLandAcres: 3.8,
    bankAccountVerified: true,
  },
  {
    id: 'farmer-13',
    name: 'Govindaswamy N.',
    phone: '+91 97422 67890',
    role: 'farmer',
    language: 'ta',
    state: 'Karnataka',
    district: 'Ramanagara',
    village: 'Magadi',
    mainCrops: ['Ragi', 'Beans'],
    totalLandAcres: 2.5,
    bankAccountVerified: true,
  },
  {
    id: 'farmer-14',
    name: 'Prabhakar Rao',
    phone: '+91 94480 54321',
    role: 'farmer',
    language: 'te',
    state: 'Karnataka',
    district: 'Chikkaballapur',
    village: 'Bagepalli',
    mainCrops: ['Onion', 'Tomato'],
    totalLandAcres: 4.5,
    bankAccountVerified: true,
  },
  {
    id: 'farmer-15',
    name: 'Devraj B.M.',
    phone: '+91 99801 12345',
    role: 'farmer',
    language: 'kn',
    state: 'Karnataka',
    district: 'Mysuru',
    village: 'T. Narasipura',
    mainCrops: ['Paddy', 'Beans', 'Tomato'],
    totalLandAcres: 5.2,
    bankAccountVerified: true,
  },
];

export const SEED_BUYERS: BuyerProfile[] = [
  {
    id: 'buyer-1',
    businessName: 'City Fresh Foods Ltd',
    contactPerson: 'Arun Varma (Procurement Lead)',
    phone: '+91 98801 77210',
    businessCategory: 'Retail Chain',
    location: 'Whitefield Wholesale Distribution Hub, Bengaluru',
    district: 'Bengaluru Urban',
    state: 'Karnataka',
    cropsPurchased: ['Tomato', 'Potato', 'Onion', 'Beans'],
    dailyDemandKg: 15000,
    paymentTerms: 'Direct NEFT within 24 hours of gate weighment',
    collectionAvailability: 'Collection Centre',
    verificationStatus: 'Demo Verified',
    rating: 4.9,
    reviewCount: 148,
    offersCount: 4,
    completedTransactionsCount: 312,
  },
  {
    id: 'buyer-2',
    businessName: 'Sahyadri Agro Processing Hub',
    contactPerson: 'K. S. Narayanan',
    phone: '+91 94481 99012',
    businessCategory: 'Food Processor',
    location: 'Kolar Food Industrial Park, KIADB',
    district: 'Kolar',
    state: 'Karnataka',
    cropsPurchased: ['Tomato', 'Mango', 'Chilli'],
    dailyDemandKg: 25000,
    paymentTerms: 'IMPS same-day upon batch QA approval',
    collectionAvailability: 'Mandi Delivery',
    verificationStatus: 'Demo Verified',
    rating: 4.8,
    reviewCount: 92,
    offersCount: 3,
    completedTransactionsCount: 198,
  },
  {
    id: 'buyer-3',
    businessName: 'Karnataka Mandi Consortium',
    contactPerson: 'Chandrashekar (Licensed Commission Agent)',
    phone: '+91 98450 66321',
    businessCategory: 'Wholesale Trader',
    location: 'Kolar APMC Yard, Shop #42',
    district: 'Kolar',
    state: 'Karnataka',
    cropsPurchased: ['Tomato', 'Beans', 'Potato', 'Onion'],
    dailyDemandKg: 40000,
    paymentTerms: 'Cash or RTGS on day of electronic auction',
    collectionAvailability: 'Mandi Delivery',
    verificationStatus: 'Demo Verified',
    rating: 4.6,
    reviewCount: 310,
    offersCount: 5,
    completedTransactionsCount: 780,
  },
  {
    id: 'buyer-4',
    businessName: 'FarmToFork Quick Commerce Pvt Ltd',
    contactPerson: 'Neha Kulkarni',
    phone: '+91 99002 44556',
    businessCategory: 'Retail Chain',
    location: 'Electronic City Sort Facility, Bengaluru',
    district: 'Bengaluru Urban',
    state: 'Karnataka',
    cropsPurchased: ['Tomato', 'Beans', 'Capsicum', 'Onion'],
    dailyDemandKg: 8000,
    paymentTerms: 'T+1 direct bank transfer',
    collectionAvailability: 'Farmgate Pickup',
    verificationStatus: 'Demo Verified',
    rating: 4.7,
    reviewCount: 64,
    offersCount: 2,
    completedTransactionsCount: 145,
  },
  {
    id: 'buyer-5',
    businessName: 'Hoskote Village Traders Guild',
    contactPerson: 'Muniraju Aggregators',
    phone: '+91 97411 33201',
    businessCategory: 'Wholesale Trader',
    location: 'Hoskote Town Market Road',
    district: 'Bengaluru Rural',
    state: 'Karnataka',
    cropsPurchased: ['Tomato', 'Ragi', 'Maize'],
    dailyDemandKg: 10000,
    paymentTerms: 'Spot cash at farmgate scale',
    collectionAvailability: 'Farmgate Pickup',
    verificationStatus: 'Demo Verified',
    rating: 4.3,
    reviewCount: 215,
    offersCount: 2,
    completedTransactionsCount: 540,
  },
  {
    id: 'buyer-6',
    businessName: 'Southern Pure Puree & Sauces',
    contactPerson: 'Dr. G. Venkatraman',
    phone: '+91 94800 12389',
    businessCategory: 'Food Processor',
    location: 'Chikkaballapur Industrial Area',
    district: 'Chikkaballapur',
    state: 'Karnataka',
    cropsPurchased: ['Tomato', 'Chilli', 'Garlic'],
    dailyDemandKg: 30000,
    paymentTerms: 'Bank transfer within 48 hours',
    collectionAvailability: 'Collection Centre',
    verificationStatus: 'Demo Verified',
    rating: 4.8,
    reviewCount: 78,
    offersCount: 2,
    completedTransactionsCount: 162,
  },
  {
    id: 'buyer-7',
    businessName: 'Mysuru Royal Spice & Grain Export',
    contactPerson: 'B. S. Madhav',
    phone: '+91 98860 99881',
    businessCategory: 'Distributor',
    location: 'Bandipalya APMC, Mysuru',
    district: 'Mysuru',
    state: 'Karnataka',
    cropsPurchased: ['Ragi', 'Maize', 'Groundnut', 'Onion'],
    dailyDemandKg: 20000,
    paymentTerms: 'Instant e-NAM escrow release',
    collectionAvailability: 'Mandi Delivery',
    verificationStatus: 'Demo Verified',
    rating: 4.9,
    reviewCount: 110,
    offersCount: 3,
    completedTransactionsCount: 290,
  },
  {
    id: 'buyer-8',
    businessName: 'GreenLeaf Organics Network',
    contactPerson: 'Priyanka Sen',
    phone: '+91 97311 00223',
    businessCategory: 'Institutional Buyer',
    location: 'Kanakapura Road Agro Centre',
    district: 'Ramanagara',
    state: 'Karnataka',
    cropsPurchased: ['Tomato', 'Beans', 'Ragi'],
    dailyDemandKg: 4000,
    paymentTerms: 'Weekly advance payment against contract',
    collectionAvailability: 'Farmgate Pickup',
    verificationStatus: 'Demo Verified',
    rating: 4.5,
    reviewCount: 42,
    offersCount: 1,
    completedTransactionsCount: 88,
  },
  {
    id: 'buyer-9',
    businessName: 'Apex Cold Storage & Distribution',
    contactPerson: 'Vikram Seth',
    phone: '+91 94490 88771',
    businessCategory: 'Distributor',
    location: 'Doddaballapur Highway Logistics Park',
    district: 'Bengaluru Rural',
    state: 'Karnataka',
    cropsPurchased: ['Potato', 'Onion', 'Carrot'],
    dailyDemandKg: 50000,
    paymentTerms: 'NEFT within 3 business days',
    collectionAvailability: 'Collection Centre',
    verificationStatus: 'Pending Verification',
    rating: 4.2,
    reviewCount: 35,
    offersCount: 2,
    completedTransactionsCount: 74,
  },
  {
    id: 'buyer-10',
    businessName: 'Annapoorna Caterers & Institutional Kitchens',
    contactPerson: 'S. Ramanathan',
    phone: '+91 98440 22119',
    businessCategory: 'Institutional Buyer',
    location: 'Yeshwanthpur Industrial Suburb, Bengaluru',
    district: 'Bengaluru Urban',
    state: 'Karnataka',
    cropsPurchased: ['Tomato', 'Potato', 'Onion', 'Beans'],
    dailyDemandKg: 12000,
    paymentTerms: 'Direct bank payout on delivery receipt',
    collectionAvailability: 'Mandi Delivery',
    verificationStatus: 'Demo Verified',
    rating: 4.7,
    reviewCount: 95,
    offersCount: 3,
    completedTransactionsCount: 220,
  },
];

export const SEED_BUYER_OFFERS: BuyerOffer[] = [
  {
    id: 'offer-1',
    buyerId: 'buyer-1',
    buyerName: 'City Fresh Foods Ltd',
    buyerCategory: 'Retail Chain Direct',
    crop: 'Tomato',
    offeredPricePerKg: 14.0,
    minQuantityKg: 500,
    maxQuantityKg: 10000,
    location: 'Bengaluru Wholesale Hub (Whitefield)',
    distanceKm: 55,
    paymentTerms: 'Direct NEFT within 24 hrs',
    collectionType: 'Collection Centre',
    verificationStatus: 'Demo Verified',
    validUntil: '2026-11-05',
  },
  {
    id: 'offer-2',
    buyerId: 'buyer-5',
    buyerName: 'Hoskote Village Traders Guild',
    buyerCategory: 'Local Village Trader',
    crop: 'Tomato',
    offeredPricePerKg: 10.0,
    minQuantityKg: 100,
    maxQuantityKg: 5000,
    location: 'Hoskote Farmgate',
    distanceKm: 2,
    paymentTerms: 'Immediate spot cash',
    collectionType: 'Farmgate',
    verificationStatus: 'Demo Verified',
    validUntil: '2026-11-03',
  },
  {
    id: 'offer-3',
    buyerId: 'buyer-3',
    buyerName: 'Karnataka Mandi Consortium',
    buyerCategory: 'APMC Mandi Commission',
    crop: 'Tomato',
    offeredPricePerKg: 12.0,
    minQuantityKg: 300,
    maxQuantityKg: 20000,
    location: 'Kolar APMC Market Yard',
    distanceKm: 28,
    paymentTerms: 'Same day RTGS after auction',
    collectionType: 'Mandi',
    verificationStatus: 'Demo Verified',
    validUntil: '2026-11-04',
  },
  {
    id: 'offer-4',
    buyerId: 'buyer-2',
    buyerName: 'Sahyadri Agro Processing Hub',
    buyerCategory: 'Food Processor',
    crop: 'Tomato',
    offeredPricePerKg: 13.5,
    minQuantityKg: 2000,
    maxQuantityKg: 50000,
    location: 'Kolar Food Industrial Park',
    distanceKm: 32,
    paymentTerms: 'IMPS upon QA approval',
    collectionType: 'Mandi',
    verificationStatus: 'Demo Verified',
    validUntil: '2026-11-08',
  },
  {
    id: 'offer-5',
    buyerId: 'buyer-4',
    buyerName: 'FarmToFork Quick Commerce',
    buyerCategory: 'Quick Commerce Retail',
    crop: 'Beans',
    offeredPricePerKg: 38.0,
    minQuantityKg: 200,
    maxQuantityKg: 3000,
    location: 'Electronic City, Bengaluru',
    distanceKm: 45,
    paymentTerms: 'T+1 bank transfer',
    collectionType: 'Farmgate',
    verificationStatus: 'Demo Verified',
    validUntil: '2026-11-06',
  },
  {
    id: 'offer-6',
    buyerId: 'buyer-7',
    buyerName: 'Mysuru Royal Spice & Grain Export',
    buyerCategory: 'Distributor & Exporter',
    crop: 'Ragi',
    offeredPricePerKg: 34.0,
    minQuantityKg: 1000,
    maxQuantityKg: 25000,
    location: 'Bandipalya APMC, Mysuru',
    district: 'Mysuru',
    distanceKm: 140,
    paymentTerms: 'e-NAM Escrow Release',
    collectionType: 'Mandi',
    verificationStatus: 'Demo Verified',
    validUntil: '2026-11-12',
  },
  {
    id: 'offer-7',
    buyerId: 'buyer-9',
    buyerName: 'Apex Cold Storage & Distribution',
    buyerCategory: 'Distributor',
    crop: 'Potato',
    offeredPricePerKg: 22.0,
    minQuantityKg: 1500,
    maxQuantityKg: 40000,
    location: 'Doddaballapur Highway',
    distanceKm: 35,
    paymentTerms: 'NEFT 3 business days',
    collectionType: 'Collection Centre',
    verificationStatus: 'Pending Verification',
    validUntil: '2026-11-07',
  },
  {
    id: 'offer-8',
    buyerId: 'buyer-1',
    buyerName: 'City Fresh Foods Ltd',
    buyerCategory: 'Retail Chain Direct',
    crop: 'Onion',
    offeredPricePerKg: 28.0,
    minQuantityKg: 1000,
    maxQuantityKg: 15000,
    location: 'Bengaluru Wholesale Hub',
    distanceKm: 55,
    paymentTerms: 'Direct NEFT within 24 hrs',
    collectionType: 'Collection Centre',
    verificationStatus: 'Demo Verified',
    validUntil: '2026-11-09',
  },
  {
    id: 'offer-9',
    buyerId: 'buyer-10',
    buyerName: 'Annapoorna Caterers',
    buyerCategory: 'Institutional Buyer',
    crop: 'Tomato',
    offeredPricePerKg: 12.8,
    minQuantityKg: 800,
    maxQuantityKg: 6000,
    location: 'Yeshwanthpur Suburb',
    distanceKm: 48,
    paymentTerms: 'Direct payout on receipt',
    collectionType: 'Mandi',
    verificationStatus: 'Demo Verified',
    validUntil: '2026-11-05',
  },
  {
    id: 'offer-10',
    buyerId: 'buyer-6',
    buyerName: 'Southern Pure Puree & Sauces',
    buyerCategory: 'Food Processor',
    crop: 'Tomato',
    offeredPricePerKg: 13.8,
    minQuantityKg: 3000,
    maxQuantityKg: 35000,
    location: 'Chikkaballapur Industrial Area',
    distanceKm: 38,
    paymentTerms: 'Bank transfer 48 hrs',
    collectionType: 'Collection Centre',
    verificationStatus: 'Demo Verified',
    validUntil: '2026-11-10',
  },
];

export const SEED_MARKET_PRICES: MarketPrice[] = [
  {
    id: 'mp-1',
    commodity: 'Tomato',
    variety: 'Hybrid / Local',
    marketName: 'Kolar APMC Mandi',
    district: 'Kolar',
    state: 'Karnataka',
    minPrice: 9.5,
    maxPrice: 13.5,
    modalPrice: 12.0,
    arrivalsTonnes: 450,
    updatedAt: 'Today, 09:30 AM',
    source: 'AGMARKNET (Demonstration Feed)',
    trend: 'up',
  },
  {
    id: 'mp-2',
    commodity: 'Tomato',
    variety: 'Selection',
    marketName: 'Bengaluru (Binny Mill / Yeshwanthpur)',
    district: 'Bengaluru Urban',
    state: 'Karnataka',
    minPrice: 11.0,
    maxPrice: 15.0,
    modalPrice: 13.8,
    arrivalsTonnes: 320,
    updatedAt: 'Today, 10:15 AM',
    source: 'e-NAM (Demonstration Feed)',
    trend: 'up',
  },
  {
    id: 'mp-3',
    commodity: 'Tomato',
    variety: 'Local Country',
    marketName: 'Chikkaballapur APMC',
    district: 'Chikkaballapur',
    state: 'Karnataka',
    minPrice: 9.0,
    maxPrice: 12.5,
    modalPrice: 11.2,
    arrivalsTonnes: 210,
    updatedAt: 'Today, 08:45 AM',
    source: 'AGMARKNET (Demonstration Feed)',
    trend: 'stable',
  },
  {
    id: 'mp-4',
    commodity: 'Tomato',
    variety: 'Hybrid',
    marketName: 'Ramanagara APMC',
    district: 'Ramanagara',
    state: 'Karnataka',
    minPrice: 8.5,
    maxPrice: 12.0,
    modalPrice: 10.5,
    arrivalsTonnes: 140,
    updatedAt: 'Today, 09:00 AM',
    source: 'AGMARKNET (Demonstration Feed)',
    trend: 'down',
  },
  {
    id: 'mp-5',
    commodity: 'Onion',
    variety: 'Nashik / Bellary Red',
    marketName: 'Yeshwanthpur APMC',
    district: 'Bengaluru Urban',
    state: 'Karnataka',
    minPrice: 24.0,
    maxPrice: 31.0,
    modalPrice: 28.5,
    arrivalsTonnes: 600,
    updatedAt: 'Today, 09:45 AM',
    source: 'AGMARKNET (Demonstration Feed)',
    trend: 'up',
  },
  {
    id: 'mp-6',
    commodity: 'Potato',
    variety: 'Hassan Jyoti',
    marketName: 'Kolar APMC Mandi',
    district: 'Kolar',
    state: 'Karnataka',
    minPrice: 18.0,
    maxPrice: 23.5,
    modalPrice: 21.0,
    arrivalsTonnes: 380,
    updatedAt: 'Today, 08:30 AM',
    source: 'AGMARKNET (Demonstration Feed)',
    trend: 'stable',
  },
  {
    id: 'mp-7',
    commodity: 'Beans',
    variety: 'French Green',
    marketName: 'Hoskote Sub-Market Yard',
    district: 'Bengaluru Rural',
    state: 'Karnataka',
    minPrice: 32.0,
    maxPrice: 42.0,
    modalPrice: 37.5,
    arrivalsTonnes: 45,
    updatedAt: 'Today, 10:00 AM',
    source: 'e-NAM (Demonstration Feed)',
    trend: 'up',
  },
  {
    id: 'mp-8',
    commodity: 'Ragi',
    variety: 'GPU-28 Finger Millet',
    marketName: 'Bandipalya APMC, Mysuru',
    district: 'Mysuru',
    state: 'Karnataka',
    minPrice: 31.0,
    maxPrice: 36.5,
    modalPrice: 34.0,
    arrivalsTonnes: 120,
    updatedAt: 'Today, 07:45 AM',
    source: 'AGMARKNET (Demonstration Feed)',
    trend: 'up',
  },
  {
    id: 'mp-9',
    commodity: 'Maize',
    variety: 'Yellow Hybrid',
    marketName: 'Channapatna APMC',
    district: 'Ramanagara',
    state: 'Karnataka',
    minPrice: 19.5,
    maxPrice: 22.8,
    modalPrice: 21.2,
    arrivalsTonnes: 190,
    updatedAt: 'Today, 08:15 AM',
    source: 'e-NAM (Demonstration Feed)',
    trend: 'stable',
  },
  {
    id: 'mp-10',
    commodity: 'Groundnut',
    variety: 'TMV-2 Pods',
    marketName: 'Gauribidanur Market Yard',
    district: 'Chikkaballapur',
    state: 'Karnataka',
    minPrice: 58.0,
    maxPrice: 66.0,
    modalPrice: 62.5,
    arrivalsTonnes: 75,
    updatedAt: 'Today, 09:10 AM',
    source: 'AGMARKNET (Demonstration Feed)',
    trend: 'up',
  },
];

export const SEED_COLLECTIVE_GROUPS: CollectiveGroup[] = [
  {
    id: 'group-1',
    name: 'Hoskote Tomato Collective',
    crop: 'Tomato',
    variety: 'Hybrid Shivam / Sahu',
    targetBuyer: 'City Fresh Foods Ltd (Wholesale Direct)',
    currentQuantityKg: 8500,
    targetQuantityKg: 10000,
    memberCount: 12,
    collectionCenter: 'Hoskote FPO Aggregation Centre, National Highway 75',
    expectedCollectionDate: 'Tomorrow, 07:00 AM',
    individualTransportCostPerKg: 2.2,
    collectiveTransportCostPerKg: 0.75,
    savingsPerKg: 1.45,
    status: 'Collecting Produce',
    members: [
      { farmerId: 'farmer-1', farmerName: 'Ramesh Gowda', village: 'Doddagattiganabbe', quantityKg: 1000, joinedAt: 'Yesterday' },
      { farmerId: 'farmer-6', farmerName: 'Shivanna Gowda', village: 'Nelamangala', quantityKg: 800, joinedAt: 'Yesterday' },
      { farmerId: 'farmer-10', farmerName: 'Krishnamurthy S.', village: 'Hoskote', quantityKg: 1200, joinedAt: 'Yesterday' },
      { farmerId: 'farmer-demo-1', farmerName: 'Chikkanna K.', village: 'Sulibele', quantityKg: 950, joinedAt: '2 days ago' },
      { farmerId: 'farmer-demo-2', farmerName: 'Venkatappa M.', village: 'Nandagudi', quantityKg: 1100, joinedAt: '2 days ago' },
      { farmerId: 'farmer-demo-3', farmerName: 'Govindaraju P.', village: 'Jadigenahalli', quantityKg: 650, joinedAt: '3 days ago' },
      { farmerId: 'farmer-demo-4', farmerName: 'Narayanaswamy T.', village: 'Anugondanahalli', quantityKg: 800, joinedAt: '3 days ago' },
    ],
  },
  {
    id: 'group-2',
    name: 'Kolar Export Quality Tomato Pool',
    crop: 'Tomato',
    variety: 'Abhinav / US-440',
    targetBuyer: 'Sahyadri Agro Processing Hub',
    currentQuantityKg: 18000,
    targetQuantityKg: 20000,
    memberCount: 19,
    collectionCenter: 'Malur Industrial Sub-Centre',
    expectedCollectionDate: 'In 2 days',
    individualTransportCostPerKg: 1.8,
    collectiveTransportCostPerKg: 0.65,
    savingsPerKg: 1.15,
    status: 'Collecting Produce',
    members: [
      { farmerId: 'farmer-2', farmerName: 'Suresh Kumar', village: 'Malur', quantityKg: 1500, joinedAt: '3 days ago' },
      { farmerId: 'farmer-7', farmerName: 'Venkatesh Murthy', village: 'Srinivaspur', quantityKg: 2000, joinedAt: '2 days ago' },
    ],
  },
  {
    id: 'group-3',
    name: 'Sidlaghatta Fresh Beans Pool',
    crop: 'Beans',
    variety: 'French Green Bush',
    targetBuyer: 'FarmToFork Quick Commerce',
    currentQuantityKg: 3200,
    targetQuantityKg: 4000,
    memberCount: 8,
    collectionCenter: 'Sidlaghatta Mandi Yard Platform #3',
    expectedCollectionDate: 'Tomorrow, 02:00 PM',
    individualTransportCostPerKg: 3.5,
    collectiveTransportCostPerKg: 1.2,
    savingsPerKg: 2.3,
    status: 'Collecting Produce',
    members: [
      { farmerId: 'farmer-3', farmerName: 'Anjinappa Reddy', village: 'Sidlaghatta', quantityKg: 600, joinedAt: 'Yesterday' },
    ],
  },
  {
    id: 'group-4',
    name: 'Kanakapura Organic Ragi Syndicate',
    crop: 'Ragi',
    variety: 'GPU-28 Traditional',
    targetBuyer: 'Mysuru Royal Spice & Grain Export',
    currentQuantityKg: 12500,
    targetQuantityKg: 15000,
    memberCount: 14,
    collectionCenter: 'Kanakapura Taluk Grain Godown',
    expectedCollectionDate: 'In 4 days',
    individualTransportCostPerKg: 2.8,
    collectiveTransportCostPerKg: 0.9,
    savingsPerKg: 1.9,
    status: 'Collecting Produce',
    members: [
      { farmerId: 'farmer-4', farmerName: 'Manjunath B.', village: 'Kanakapura', quantityKg: 1200, joinedAt: '4 days ago' },
      { farmerId: 'farmer-13', farmerName: 'Govindaswamy N.', village: 'Magadi', quantityKg: 900, joinedAt: '3 days ago' },
    ],
  },
  {
    id: 'group-5',
    name: 'Chikkaballapur Onion Aggregation Group',
    crop: 'Onion',
    variety: 'Bellary Pink Medium',
    targetBuyer: 'Apex Cold Storage & Distribution',
    currentQuantityKg: 14000,
    targetQuantityKg: 25000,
    memberCount: 11,
    collectionCenter: 'Chikkaballapur Agro Terminal',
    expectedCollectionDate: 'In 5 days',
    individualTransportCostPerKg: 2.0,
    collectiveTransportCostPerKg: 0.8,
    savingsPerKg: 1.2,
    status: 'Collecting Produce',
    members: [
      { farmerId: 'farmer-14', farmerName: 'Prabhakar Rao', village: 'Bagepalli', quantityKg: 2200, joinedAt: 'Yesterday' },
      { farmerId: 'farmer-12', farmerName: 'Muniyappa G.', village: 'Gauribidanur', quantityKg: 1800, joinedAt: '2 days ago' },
    ],
  },
];

export const SEED_TRANSPORT_PARTNERS: TransportPartner[] = [
  {
    id: 'trans-1',
    companyName: 'Kisan Rath Agri-Logistics',
    contactPerson: 'Gururaj Gowda',
    phone: '+91 98452 77011',
    vehicleType: 'Medium Goods Vehicle (407/4T)',
    capacityKg: 4000,
    baseFare: 600,
    ratePerKm: 28,
    availableDistricts: ['Bengaluru Rural', 'Kolar', 'Chikkaballapur'],
    rating: 4.8,
  },
  {
    id: 'trans-2',
    companyName: 'Sahakari Shared Freight Network',
    contactPerson: 'Manjunath Swamy',
    phone: '+91 94480 33412',
    vehicleType: 'Large Agricultural Truck (10T+)',
    capacityKg: 12000,
    baseFare: 1200,
    ratePerKm: 42,
    availableDistricts: ['Bengaluru Rural', 'Kolar', 'Ramanagara', 'Mysuru'],
    rating: 4.9,
  },
  {
    id: 'trans-3',
    companyName: 'Gramin Express Mini Cargo',
    contactPerson: 'Syed Imran',
    phone: '+91 97410 55198',
    vehicleType: 'Small Goods Vehicle (Tata Ace/1.5T)',
    capacityKg: 1500,
    baseFare: 350,
    ratePerKm: 18,
    availableDistricts: ['Bengaluru Rural', 'Kolar'],
    rating: 4.6,
  },
  {
    id: 'trans-4',
    companyName: 'Deccan Agro Haulers',
    contactPerson: 'Ravishankar T.',
    phone: '+91 99001 88320',
    vehicleType: 'Medium Goods Vehicle (407/4T)',
    capacityKg: 4500,
    baseFare: 650,
    ratePerKm: 30,
    availableDistricts: ['Chikkaballapur', 'Bengaluru Urban'],
    rating: 4.7,
  },
  {
    id: 'trans-5',
    companyName: 'Mysuru Mandi Transporters Syndicate',
    contactPerson: 'Lokesh Kumar',
    phone: '+91 98862 11044',
    vehicleType: 'Large Agricultural Truck (10T+)',
    capacityKg: 14000,
    baseFare: 1500,
    ratePerKm: 45,
    availableDistricts: ['Mysuru', 'Ramanagara', 'Bengaluru Urban'],
    rating: 4.8,
  },
];

export const SEED_SHIPMENTS: Shipment[] = [
  {
    id: 'ship-101',
    transactionId: 'tx-001',
    transportPartnerId: 'trans-2',
    transportPartnerName: 'Sahakari Shared Freight (Shared 10T Truck)',
    vehicleType: 'Large Agricultural Truck (10T+)',
    pickupLocation: 'Hoskote FPO Collection Centre',
    deliveryLocation: 'City Fresh Foods, Whitefield Hub, Bengaluru',
    distanceKm: 48,
    totalCost: 2200,
    collectionDate: 'Today, 06:30 AM',
    status: 'in_transit',
    currentLocationNote: 'Approaching KR Puram Junction flyover (ETA 25 mins)',
    milestones: [
      { status: 'requested', label: 'Transport Requested by FPO', timestamp: 'Yesterday, 04:00 PM', completed: true },
      { status: 'confirmed', label: 'Driver Allocated & Confirmed', timestamp: 'Yesterday, 07:30 PM', completed: true },
      { status: 'pickup_scheduled', label: 'Loading at Hoskote Yard', timestamp: 'Today, 06:00 AM', completed: true },
      { status: 'collected', label: 'Batch Weighment & Departure', timestamp: 'Today, 07:15 AM', completed: true },
      { status: 'in_transit', label: 'En-route to Distribution Hub', timestamp: 'Today, 07:45 AM', completed: true },
      { status: 'delivered', label: 'Destination Unloading & Receipt', timestamp: 'Est. Today, 09:15 AM', completed: false },
    ],
  },
  {
    id: 'ship-102',
    transactionId: 'tx-002',
    transportPartnerId: 'trans-1',
    transportPartnerName: 'Kisan Rath Agri-Logistics',
    vehicleType: 'Medium Goods Vehicle (407/4T)',
    pickupLocation: 'Malur Mandi Yard, Kolar',
    deliveryLocation: 'Sahyadri Agro Processing Hub, KIADB',
    distanceKm: 26,
    totalCost: 1350,
    collectionDate: 'Yesterday, 02:00 PM',
    status: 'delivered',
    currentLocationNote: 'Delivered and unloaded at Bay #4. Weighment slip issued.',
    milestones: [
      { status: 'requested', label: 'Booking Initiated', timestamp: 'Oct 28, 10:00 AM', completed: true },
      { status: 'confirmed', label: 'Vehicle Assigned', timestamp: 'Oct 28, 11:30 AM', completed: true },
      { status: 'pickup_scheduled', label: 'Pickup from Malur', timestamp: 'Oct 28, 01:30 PM', completed: true },
      { status: 'collected', label: 'Loaded 3,500 kg', timestamp: 'Oct 28, 02:15 PM', completed: true },
      { status: 'in_transit', label: 'Transited via Malur-Kolar Highway', timestamp: 'Oct 28, 03:00 PM', completed: true },
      { status: 'delivered', label: 'Delivered at Processing Hub', timestamp: 'Oct 28, 04:30 PM', completed: true },
    ],
  },
];

export const SEED_TRANSACTIONS: Transaction[] = [
  {
    id: 'TX-2026-0891',
    farmerId: 'farmer-1',
    farmerName: 'Ramesh Gowda',
    farmerPhone: '+91 98451 23410',
    buyerId: 'buyer-1',
    buyerName: 'City Fresh Foods Ltd',
    buyerCategory: 'Retail Chain Direct',
    crop: 'Tomato',
    quantityKg: 1000,
    agreedPricePerKg: 14.0,
    grossValue: 14000,
    estimatedExpenses: 3000,
    estimatedNetEarnings: 11000,
    actualExpenses: 2850,
    actualFinalPayment: 14000,
    actualNetEarnings: 11150,
    status: 'payment_completed',
    paymentTerms: 'Direct NEFT within 24 hours',
    collectionPoint: 'Bengaluru Wholesale Hub (Whitefield)',
    createdAt: '2026-10-27',
    completedAt: '2026-10-28',
    expensesBreakdown: [
      { name: 'Transportation (Direct 55 km)', estimated: 2200, actual: 2100 },
      { name: 'Loading & Crates Handling', estimated: 300, actual: 300 },
      { name: 'Buyer Procurement Commission', estimated: 200, actual: 200 },
      { name: 'Grading / Transit Deductions (2%)', estimated: 300, actual: 250 },
    ],
    timeline: [
      { stage: 'offer_received', label: 'Offer Received at ₹14/kg', timestamp: '2026-10-27 09:00', completed: true },
      { stage: 'offer_accepted', label: 'Offer Accepted by Ramesh Gowda', timestamp: '2026-10-27 10:15', completed: true },
      { stage: 'sale_confirmed', label: 'Digital Purchase Order Issued', timestamp: '2026-10-27 10:30', completed: true },
      { stage: 'pickup_scheduled', label: 'Vehicle Dispatched from Hoskote', timestamp: '2026-10-27 14:00', completed: true },
      { stage: 'produce_collected', label: 'Loaded 1,000 kg at Farmgate', timestamp: '2026-10-27 16:30', completed: true },
      { stage: 'delivered', label: 'Unloaded & Electronic Weighment', timestamp: '2026-10-28 08:30', completed: true },
      { stage: 'payment_pending', label: 'NEFT Batch Queued', timestamp: '2026-10-28 11:00', completed: true },
      { stage: 'payment_completed', label: 'Payment of ₹11,150 Credited to Canara Bank', timestamp: '2026-10-28 15:45', completed: true, note: 'Farmer received ₹150 more than estimated due to high quality grade!' },
    ],
  },
  {
    id: 'TX-2026-0892',
    farmerId: 'farmer-2',
    farmerName: 'Suresh Kumar',
    farmerPhone: '+91 94482 11982',
    buyerId: 'buyer-2',
    buyerName: 'Sahyadri Agro Processing Hub',
    buyerCategory: 'Food Processor',
    crop: 'Tomato',
    quantityKg: 2000,
    agreedPricePerKg: 13.5,
    grossValue: 27000,
    estimatedExpenses: 4200,
    estimatedNetEarnings: 22800,
    actualExpenses: 4100,
    actualFinalPayment: 26800,
    actualNetEarnings: 22700,
    status: 'delivered',
    paymentTerms: 'IMPS same-day upon batch QA approval',
    collectionPoint: 'Kolar Food Industrial Park',
    createdAt: '2026-10-29',
    expensesBreakdown: [
      { name: 'Transportation (32 km)', estimated: 2600, actual: 2500 },
      { name: 'Loading / Unloading', estimated: 600, actual: 600 },
      { name: 'Market Cess', estimated: 400, actual: 400 },
      { name: 'Brix/Solids Deduction', estimated: 600, actual: 600 },
    ],
    timeline: [
      { stage: 'offer_received', label: 'Contract Created', timestamp: '2026-10-29 08:00', completed: true },
      { stage: 'offer_accepted', label: 'Accepted by Farmer', timestamp: '2026-10-29 08:45', completed: true },
      { stage: 'sale_confirmed', label: 'PO #SA-901 Confirmed', timestamp: '2026-10-29 09:30', completed: true },
      { stage: 'pickup_scheduled', label: 'Logistics Assigned', timestamp: '2026-10-29 11:00', completed: true },
      { stage: 'produce_collected', label: 'Crates Collected', timestamp: '2026-10-29 14:00', completed: true },
      { stage: 'delivered', label: 'Delivered at Processing Plant', timestamp: '2026-10-30 08:00', completed: true },
      { stage: 'payment_pending', label: 'QA Lab Verification Underway', timestamp: '2026-10-30 10:30', completed: false },
      { stage: 'payment_completed', label: 'Settlement Pending', timestamp: 'Expected 2026-10-30 18:00', completed: false },
    ],
  },
  {
    id: 'TX-2026-0893',
    farmerId: 'farmer-3',
    farmerName: 'Anjinappa Reddy',
    farmerPhone: '+91 97410 88219',
    buyerId: 'buyer-4',
    buyerName: 'FarmToFork Quick Commerce',
    buyerCategory: 'Quick Commerce Retail',
    crop: 'Beans',
    quantityKg: 500,
    agreedPricePerKg: 38.0,
    grossValue: 19000,
    estimatedExpenses: 1800,
    estimatedNetEarnings: 17200,
    actualExpenses: 1800,
    actualFinalPayment: 19000,
    actualNetEarnings: 17200,
    status: 'in_transit' as unknown as any,
    paymentTerms: 'T+1 direct bank transfer',
    collectionPoint: 'Farmgate Collection',
    createdAt: '2026-10-29',
    expensesBreakdown: [
      { name: 'Farmgate Pickup Logistics', estimated: 1200, actual: 1200 },
      { name: 'Crates & Packaging', estimated: 300, actual: 300 },
      { name: 'Handling Cess', estimated: 300, actual: 300 },
    ],
    timeline: [
      { stage: 'offer_received', label: 'Quick Order Received', timestamp: '2026-10-29 11:00', completed: true },
      { stage: 'offer_accepted', label: 'Confirmed by Farmer', timestamp: '2026-10-29 11:30', completed: true },
      { stage: 'sale_confirmed', label: 'Dispatch Order Created', timestamp: '2026-10-29 12:00', completed: true },
      { stage: 'pickup_scheduled', label: 'Mini Truck Assigned', timestamp: '2026-10-29 15:00', completed: true },
      { stage: 'produce_collected', label: 'Picked up from Farmgate', timestamp: '2026-10-30 06:00', completed: true },
      { stage: 'delivered', label: 'Arriving at Fulfillment Hub', timestamp: 'Pending Delivery', completed: false },
      { stage: 'payment_pending', label: 'Payment Approval', timestamp: 'Pending', completed: false },
      { stage: 'payment_completed', label: 'Bank Settlement', timestamp: 'Pending', completed: false },
    ],
  },
  {
    id: 'TX-2026-0894',
    farmerId: 'farmer-4',
    farmerName: 'Manjunath B.',
    farmerPhone: '+91 99805 44102',
    buyerId: 'buyer-7',
    buyerName: 'Mysuru Royal Spice & Grain Export',
    buyerCategory: 'Distributor & Exporter',
    crop: 'Ragi',
    quantityKg: 2000,
    agreedPricePerKg: 34.0,
    grossValue: 68000,
    estimatedExpenses: 4500,
    estimatedNetEarnings: 63500,
    actualExpenses: 4400,
    actualFinalPayment: 68000,
    actualNetEarnings: 63600,
    status: 'payment_completed',
    paymentTerms: 'Instant e-NAM escrow release',
    collectionPoint: 'Kanakapura Taluk Grain Godown',
    createdAt: '2026-10-24',
    completedAt: '2026-10-26',
    expensesBreakdown: [
      { name: 'FPO Shared Haulage', estimated: 2800, actual: 2750 },
      { name: 'Gunny Bags & Stitching', estimated: 1100, actual: 1100 },
      { name: 'Mandi Cess (0.8%)', estimated: 600, actual: 550 },
    ],
    timeline: [
      { stage: 'offer_received', label: 'Bulk Enquiry', timestamp: '2026-10-24 10:00', completed: true },
      { stage: 'offer_accepted', label: 'Price Agreed at ₹34/kg', timestamp: '2026-10-24 11:30', completed: true },
      { stage: 'sale_confirmed', label: 'Contract Registered on e-NAM', timestamp: '2026-10-24 12:00', completed: true },
      { stage: 'pickup_scheduled', label: 'Warehouse Pickup', timestamp: '2026-10-25 09:00', completed: true },
      { stage: 'produce_collected', label: 'Bags Weighed at Godown', timestamp: '2026-10-25 11:30', completed: true },
      { stage: 'delivered', label: 'Received at Mysuru Terminal', timestamp: '2026-10-25 18:00', completed: true },
      { stage: 'payment_pending', label: 'Escrow Release Approved', timestamp: '2026-10-26 10:00', completed: true },
      { stage: 'payment_completed', label: 'Net ₹63,600 Credited via e-NAM', timestamp: '2026-10-26 14:15', completed: true },
    ],
  },
  {
    id: 'TX-2026-0895',
    farmerId: 'farmer-1',
    farmerName: 'Ramesh Gowda',
    farmerPhone: '+91 98451 23410',
    buyerId: 'buyer-5',
    buyerName: 'Hoskote Village Traders Guild',
    buyerCategory: 'Local Village Trader',
    crop: 'Tomato',
    quantityKg: 800,
    agreedPricePerKg: 10.0,
    grossValue: 8000,
    estimatedExpenses: 400,
    estimatedNetEarnings: 7600,
    actualExpenses: 400,
    actualFinalPayment: 8000,
    actualNetEarnings: 7600,
    status: 'payment_completed',
    paymentTerms: 'Spot cash at farmgate scale',
    collectionPoint: 'Hoskote Farmgate',
    createdAt: '2026-10-20',
    completedAt: '2026-10-20',
    expensesBreakdown: [
      { name: 'Local Farmgate Cartage', estimated: 240, actual: 240 },
      { name: 'Hamali Loading', estimated: 80, actual: 80 },
      { name: 'Local Commission', estimated: 80, actual: 80 },
    ],
    timeline: [
      { stage: 'offer_received', label: 'Local Cash Offer ₹10/kg', timestamp: '2026-10-20 07:00', completed: true },
      { stage: 'offer_accepted', label: 'Accepted by Farmer', timestamp: '2026-10-20 07:15', completed: true },
      { stage: 'sale_confirmed', label: 'Weighment Completed', timestamp: '2026-10-20 07:45', completed: true },
      { stage: 'pickup_scheduled', label: 'Tractor Loaded', timestamp: '2026-10-20 08:00', completed: true },
      { stage: 'produce_collected', label: 'Dispatched to Local Shop', timestamp: '2026-10-20 08:30', completed: true },
      { stage: 'delivered', label: 'Received', timestamp: '2026-10-20 08:45', completed: true },
      { stage: 'payment_pending', label: 'Cash Verification', timestamp: '2026-10-20 09:00', completed: true },
      { stage: 'payment_completed', label: '₹7,600 Cash Handed Over', timestamp: '2026-10-20 09:15', completed: true, note: 'Notice: Farmer earned ₹9.50/kg net compared to ₹11.15/kg from City Fresh Foods.' },
    ],
  },
];

export const SEED_PRODUCE_LISTINGS: ProduceListing[] = [
  {
    id: 'prod-001',
    farmerId: 'farmer-1',
    farmerName: 'Ramesh Gowda',
    crop: 'Tomato',
    variety: 'Hybrid Shivam (Grade A)',
    quantityKg: 1000,
    qualityGrade: 'A (Premium)',
    harvestStatus: 'Ready for Sale',
    location: {
      village: 'Doddagattiganabbe',
      district: 'Bengaluru Rural',
      state: 'Karnataka',
      pinCode: '562114',
    },
    expectedHarvestDate: '2026-10-31',
    preferredSellingDate: '2026-11-01',
    minAcceptablePricePerKg: 11.0,
    status: 'active',
    createdAt: 'Today, 08:00 AM',
  },
  {
    id: 'prod-002',
    farmerId: 'farmer-1',
    farmerName: 'Ramesh Gowda',
    crop: 'Beans',
    variety: 'French Bush',
    quantityKg: 400,
    qualityGrade: 'A (Premium)',
    harvestStatus: 'Harvesting in 3 Days',
    location: {
      village: 'Doddagattiganabbe',
      district: 'Bengaluru Rural',
      state: 'Karnataka',
      pinCode: '562114',
    },
    expectedHarvestDate: '2026-11-03',
    preferredSellingDate: '2026-11-04',
    minAcceptablePricePerKg: 35.0,
    status: 'active',
    createdAt: 'Yesterday',
  },
  {
    id: 'prod-003',
    farmerId: 'farmer-2',
    farmerName: 'Suresh Kumar',
    crop: 'Tomato',
    variety: 'Selection Special',
    quantityKg: 2500,
    qualityGrade: 'B (Standard)',
    harvestStatus: 'Ready for Sale',
    location: {
      village: 'Malur',
      district: 'Kolar',
      state: 'Karnataka',
      pinCode: '563130',
    },
    expectedHarvestDate: '2026-10-30',
    preferredSellingDate: '2026-10-31',
    minAcceptablePricePerKg: 10.5,
    status: 'active',
    createdAt: '2 days ago',
  },
  {
    id: 'prod-004',
    farmerId: 'farmer-4',
    farmerName: 'Manjunath B.',
    crop: 'Ragi',
    variety: 'GPU-28 Finger Millet',
    quantityKg: 3000,
    qualityGrade: 'A (Premium)',
    harvestStatus: 'Ready for Sale',
    location: {
      village: 'Kanakapura',
      district: 'Ramanagara',
      state: 'Karnataka',
      pinCode: '562117',
    },
    expectedHarvestDate: '2026-10-25',
    preferredSellingDate: '2026-11-05',
    minAcceptablePricePerKg: 32.0,
    status: 'active',
    createdAt: '3 days ago',
  },
];

export const SEED_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    title: 'New High-Value Buyer Offer!',
    message: 'City Fresh Foods Ltd matched your 1,000 kg Tomato listing at ₹14/kg (Est. net ₹11,000).',
    type: 'offer',
    timestamp: '15 mins ago',
    read: false,
    link: 'market-intel',
  },
  {
    id: 'notif-2',
    title: 'Hoskote Tomato Collective Update',
    message: 'The collective reached 8,500 kg / 10,000 kg (85%). Transport departure scheduled for tomorrow morning.',
    type: 'collective',
    timestamp: '1 hour ago',
    read: false,
    link: 'group-selling',
  },
  {
    id: 'notif-3',
    title: 'APMC Market Price Jump',
    message: 'Tomato modal price at Kolar Mandi jumped from ₹10.5 to ₹12.0/kg today.',
    type: 'price_alert',
    timestamp: '3 hours ago',
    read: true,
    link: 'market-intel',
  },
  {
    id: 'notif-4',
    title: 'Payment Settlement Credited',
    message: '₹11,150 has been settled into your account for Order #TX-2026-0891.',
    type: 'transaction',
    timestamp: 'Yesterday',
    read: true,
    link: 'transactions',
  },
];

// ==========================================
// REACTIVE STORE CLASS
// ==========================================

class AppStore {
  private currentRole: UserRole = 'farmer';
  private currentFarmer: FarmerProfile = SEED_FARMERS[0];
  private simpleFarmerMode: boolean = false;
  private isOnline: boolean = true;
  private produceListings: ProduceListing[] = [];
  private buyers: BuyerProfile[] = [];
  private buyerOffers: BuyerOffer[] = [];
  private marketPrices: MarketPrice[] = [];
  private collectiveGroups: CollectiveGroup[] = [];
  private transportPartners: TransportPartner[] = [];
  private shipments: Shipment[] = [];
  private transactions: Transaction[] = [];
  private notifications: AppNotification[] = [];
  private voiceSessions: VoiceSessionRecord[] = [];
  private priceAlerts: PriceAlert[] = [];
  private listeners: Set<() => void> = new Set();

  constructor() {
    this.loadState();
    if (typeof window !== 'undefined') {
      window.addEventListener('online', () => this.setOnlineState(true));
      window.addEventListener('offline', () => this.setOnlineState(false));
    }
  }

  private loadState() {
    try {
      if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
        this.resetToDefaults(false);
        return;
      }

      const storedRole = localStorage.getItem('fairfarm_role');
      if (storedRole) this.currentRole = storedRole as UserRole;

      const storedSimple = localStorage.getItem('fairfarm_simple_mode');
      if (storedSimple !== null) this.simpleFarmerMode = storedSimple === 'true';

      const storedProduce = localStorage.getItem('fairfarm_produce');
      this.produceListings = storedProduce ? JSON.parse(storedProduce) : SEED_PRODUCE_LISTINGS;

      const storedBuyers = localStorage.getItem('fairfarm_buyers');
      this.buyers = storedBuyers ? JSON.parse(storedBuyers) : SEED_BUYERS;

      const storedOffers = localStorage.getItem('fairfarm_offers');
      this.buyerOffers = storedOffers ? JSON.parse(storedOffers) : SEED_BUYER_OFFERS;

      const storedMarket = localStorage.getItem('fairfarm_market');
      this.marketPrices = storedMarket ? JSON.parse(storedMarket) : SEED_MARKET_PRICES;

      const storedGroups = localStorage.getItem('fairfarm_groups');
      this.collectiveGroups = storedGroups ? JSON.parse(storedGroups) : SEED_COLLECTIVE_GROUPS;

      const storedTransport = localStorage.getItem('fairfarm_transport');
      this.transportPartners = storedTransport ? JSON.parse(storedTransport) : SEED_TRANSPORT_PARTNERS;

      const storedShipments = localStorage.getItem('fairfarm_shipments');
      this.shipments = storedShipments ? JSON.parse(storedShipments) : SEED_SHIPMENTS;

      const storedTx = localStorage.getItem('fairfarm_transactions');
      this.transactions = storedTx ? JSON.parse(storedTx) : SEED_TRANSACTIONS;

      const storedNotifs = localStorage.getItem('fairfarm_notifications');
      this.notifications = storedNotifs ? JSON.parse(storedNotifs) : SEED_NOTIFICATIONS;

      const storedVoice = localStorage.getItem('fairfarm_voice_sessions');
      this.voiceSessions = storedVoice ? JSON.parse(storedVoice) : [];
    } catch (e) {
      console.warn('Error loading local state, defaulting to seed data', e);
      this.resetToDefaults(false);
    }
  }

  private persist() {
    try {
      if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
        localStorage.setItem('fairfarm_role', this.currentRole);
        localStorage.setItem('fairfarm_simple_mode', String(this.simpleFarmerMode));
        localStorage.setItem('fairfarm_produce', JSON.stringify(this.produceListings));
        localStorage.setItem('fairfarm_buyers', JSON.stringify(this.buyers));
        localStorage.setItem('fairfarm_offers', JSON.stringify(this.buyerOffers));
        localStorage.setItem('fairfarm_market', JSON.stringify(this.marketPrices));
        localStorage.setItem('fairfarm_groups', JSON.stringify(this.collectiveGroups));
        localStorage.setItem('fairfarm_transport', JSON.stringify(this.transportPartners));
        localStorage.setItem('fairfarm_shipments', JSON.stringify(this.shipments));
        localStorage.setItem('fairfarm_transactions', JSON.stringify(this.transactions));
        localStorage.setItem('fairfarm_notifications', JSON.stringify(this.notifications));
        localStorage.setItem('fairfarm_voice_sessions', JSON.stringify(this.voiceSessions));
      }
    } catch (e) {
      console.error('Persistence error:', e);
    }
    this.notify();
  }

  public subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach((l) => l());
  }

  public resetToDefaults(shouldPersist: boolean = true) {
    this.currentRole = 'farmer';
    this.currentFarmer = SEED_FARMERS[0];
    this.simpleFarmerMode = false;
    this.produceListings = SEED_PRODUCE_LISTINGS;
    this.buyers = SEED_BUYERS;
    this.buyerOffers = SEED_BUYER_OFFERS;
    this.marketPrices = SEED_MARKET_PRICES;
    this.collectiveGroups = SEED_COLLECTIVE_GROUPS;
    this.transportPartners = SEED_TRANSPORT_PARTNERS;
    this.shipments = SEED_SHIPMENTS;
    this.transactions = SEED_TRANSACTIONS;
    this.notifications = SEED_NOTIFICATIONS;
    this.voiceSessions = [];
    if (shouldPersist) {
      this.persist();
    }
  }

  // Getters
  public getRole() { return this.currentRole; }
  public getFarmer() { return this.currentFarmer; }
  public isSimpleMode() { return this.simpleFarmerMode; }
  public getIsOnline() { return this.isOnline; }
  public getProduceListings() { return this.produceListings; }
  public getBuyers() { return this.buyers; }
  public getBuyerOffers() { return this.buyerOffers; }
  public getMarketPrices() { return this.marketPrices; }
  public getCollectiveGroups() { return this.collectiveGroups; }
  public getTransportPartners() { return this.transportPartners; }
  public getShipments() { return this.shipments; }
  public getTransactions() { return this.transactions; }
  public getNotifications() { return this.notifications; }
  public getVoiceSessions() { return this.voiceSessions; }
  public getPriceAlerts() { return this.priceAlerts; }

  // Setters & Actions
  public setRole(role: UserRole) {
    this.currentRole = role;
    this.persist();
  }

  public setSimpleMode(enabled: boolean) {
    this.simpleFarmerMode = enabled;
    this.persist();
  }

  public setOnlineState(online: boolean) {
    this.isOnline = online;
    this.notify();
  }

  public addProduceListing(listing: Omit<ProduceListing, 'id' | 'createdAt' | 'status'>) {
    const newListing: ProduceListing = {
      ...listing,
      id: `prod-${Date.now()}`,
      status: 'active',
      createdAt: 'Just now',
    };
    this.produceListings = [newListing, ...this.produceListings];

    // Add matching notification
    this.notifications = [
      {
        id: `notif-${Date.now()}`,
        title: `Produce Registered: ${newListing.quantityKg} kg ${newListing.crop}`,
        message: 'Your listing is live. Smart comparison calculated 3 buyer options.',
        type: 'offer',
        timestamp: 'Just now',
        read: false,
        link: 'market-intel',
      },
      ...this.notifications,
    ];

    this.persist();
    return newListing;
  }

  public acceptBuyerOffer(offer: BuyerOffer, quantityKg: number = 1000) {
    const grossValue = Math.round(quantityKg * offer.offeredPricePerKg);
    const estimatedExpenses = Math.round(offer.distanceKm * 35 + 500);
    const estimatedNet = grossValue - estimatedExpenses;

    const newTx: Transaction = {
      id: `TX-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      farmerId: this.currentFarmer.id,
      farmerName: this.currentFarmer.name,
      farmerPhone: this.currentFarmer.phone,
      buyerId: offer.buyerId,
      buyerName: offer.buyerName,
      buyerCategory: offer.buyerCategory,
      crop: offer.crop,
      quantityKg,
      agreedPricePerKg: offer.offeredPricePerKg,
      grossValue,
      estimatedExpenses,
      estimatedNetEarnings: estimatedNet,
      actualExpenses: estimatedExpenses,
      actualFinalPayment: grossValue,
      actualNetEarnings: estimatedNet,
      status: 'offer_accepted',
      paymentTerms: offer.paymentTerms,
      collectionPoint: offer.location,
      createdAt: new Date().toISOString().split('T')[0],
      expensesBreakdown: [
        { name: 'Estimated Freight/Logistics', estimated: Math.round(offer.distanceKm * 35), actual: Math.round(offer.distanceKm * 35) },
        { name: 'Loading & Hamali', estimated: 300, actual: 300 },
        { name: 'Buyer Procurement Fee', estimated: 200, actual: 200 },
      ],
      timeline: [
        { stage: 'offer_received', label: `Offer generated at ₹${offer.offeredPricePerKg}/kg`, timestamp: 'Just now', completed: true },
        { stage: 'offer_accepted', label: `Accepted by ${this.currentFarmer.name}`, timestamp: 'Just now', completed: true },
        { stage: 'sale_confirmed', label: 'Purchase agreement recorded', timestamp: 'Pending confirmation', completed: false },
        { stage: 'pickup_scheduled', label: 'Vehicle allocation pending', timestamp: 'Pending', completed: false },
        { stage: 'produce_collected', label: 'Produce collection', timestamp: 'Pending', completed: false },
        { stage: 'delivered', label: 'Unloading & Weighment', timestamp: 'Pending', completed: false },
        { stage: 'payment_pending', label: 'Invoice verification', timestamp: 'Pending', completed: false },
        { stage: 'payment_completed', label: 'Final bank settlement', timestamp: 'Pending', completed: false },
      ],
    };

    this.transactions = [newTx, ...this.transactions];

    this.notifications = [
      {
        id: `notif-${Date.now()}`,
        title: `Offer Accepted for ${quantityKg} kg ${offer.crop}!`,
        message: `Transaction ${newTx.id} created with ${offer.buyerName} at ₹${offer.offeredPricePerKg}/kg.`,
        type: 'transaction',
        timestamp: 'Just now',
        read: false,
        link: 'transactions',
      },
      ...this.notifications,
    ];

    this.persist();
    return newTx;
  }

  public joinCollectiveGroup(groupId: string, farmerId: string, quantityKg: number) {
    this.collectiveGroups = this.collectiveGroups.map((group) => {
      if (group.id === groupId) {
        const alreadyMember = group.members.some((m) => m.farmerId === farmerId);
        const newMembers = alreadyMember
          ? group.members.map((m) => (m.farmerId === farmerId ? { ...m, quantityKg: m.quantityKg + quantityKg } : m))
          : [
              ...group.members,
              {
                farmerId,
                farmerName: this.currentFarmer.name,
                village: this.currentFarmer.village,
                quantityKg,
                joinedAt: 'Just now',
              },
            ];

        const updatedCurrent = group.currentQuantityKg + quantityKg;
        return {
          ...group,
          currentQuantityKg: updatedCurrent,
          memberCount: newMembers.length,
          members: newMembers,
          status: updatedCurrent >= group.targetQuantityKg ? 'Ready for Dispatch' : 'Collecting Produce',
        };
      }
      return group;
    });

    this.notifications = [
      {
        id: `notif-${Date.now()}`,
        title: 'Joined Collective Selling Pool!',
        message: `Successfully pooled ${quantityKg} kg with the collective. Logistics savings applied!`,
        type: 'collective',
        timestamp: 'Just now',
        read: false,
        link: 'group-selling',
      },
      ...this.notifications,
    ];

    this.persist();
  }

  public bookShipment(shipmentData: Omit<Shipment, 'id' | 'status' | 'milestones'>) {
    const newShipment: Shipment = {
      ...shipmentData,
      id: `ship-${Date.now()}`,
      status: 'confirmed',
      milestones: [
        { status: 'requested', label: 'Booking Requested', timestamp: 'Just now', completed: true },
        { status: 'confirmed', label: 'Driver Allocated & Confirmed', timestamp: 'Just now', completed: true },
        { status: 'pickup_scheduled', label: 'Pickup Scheduled', timestamp: 'Scheduled for tomorrow 07:00 AM', completed: false },
        { status: 'collected', label: 'Produce Collected', timestamp: 'Pending', completed: false },
        { status: 'in_transit', label: 'Transit', timestamp: 'Pending', completed: false },
        { status: 'delivered', label: 'Delivered', timestamp: 'Pending', completed: false },
      ],
    };

    this.shipments = [newShipment, ...this.shipments];
    this.persist();
    return newShipment;
  }

  public updateTransactionActuals(transactionId: string, actualExpenses: number, actualFinalPayment: number) {
    this.transactions = this.transactions.map((tx) => {
      if (tx.id === transactionId) {
        const actualNet = actualFinalPayment - actualExpenses;
        return {
          ...tx,
          actualExpenses,
          actualFinalPayment,
          actualNetEarnings: actualNet,
          status: 'payment_completed',
          completedAt: new Date().toISOString().split('T')[0],
        };
      }
      return tx;
    });
    this.persist();
  }

  public reportDispute(transactionId: string, category: any, description: string) {
    this.transactions = this.transactions.map((tx) => {
      if (tx.id === transactionId) {
        return {
          ...tx,
          dispute: {
            id: `disp-${Date.now()}`,
            transactionId,
            reportedBy: this.currentFarmer.name,
            category,
            description,
            status: 'Under FPO Review',
            reportedAt: 'Just now',
          },
        };
      }
      return tx;
    });

    this.notifications = [
      {
        id: `notif-${Date.now()}`,
        title: 'Dispute Filed with FPO Ombudsman',
        message: `Issue reported for Order #${transactionId}: ${category}. An officer will review within 24 hours.`,
        type: 'transaction',
        timestamp: 'Just now',
        read: false,
        link: 'transactions',
      },
      ...this.notifications,
    ];

    this.persist();
  }

  public toggleBuyerVerification(buyerId: string) {
    this.buyers = this.buyers.map((b) => {
      if (b.id === buyerId) {
        const nextStatus = b.verificationStatus === 'Demo Verified' ? 'Pending Verification' : 'Demo Verified';
        return { ...b, verificationStatus: nextStatus };
      }
      return b;
    });
    this.persist();
  }

  public recordVoiceSession(session: Omit<VoiceSessionRecord, 'id' | 'timestamp'>) {
    const record: VoiceSessionRecord = {
      ...session,
      id: `call-${Date.now()}`,
      timestamp: 'Just now',
    };
    this.voiceSessions = [record, ...this.voiceSessions];
    this.persist();
  }

  public markNotificationAsRead(id: string) {
    this.notifications = this.notifications.map((n) => (n.id === id ? { ...n, read: true } : n));
    this.persist();
  }

  public addPriceAlert(crop: string, targetPricePerKg: number) {
    const alert: PriceAlert = {
      id: `alert-${Date.now()}`,
      farmerId: this.currentFarmer.id,
      crop,
      targetPricePerKg,
      createdAt: 'Just now',
      isActive: true,
    };
    this.priceAlerts = [alert, ...this.priceAlerts];
    this.persist();
  }
}

export const store = new AppStore();
