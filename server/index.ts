import express, { Request, Response } from 'express';
import { computeSellingComparison } from '../src/services/calculator';
import {
  SEED_FARMERS,
  SEED_BUYERS,
  SEED_BUYER_OFFERS,
  SEED_MARKET_PRICES,
  SEED_COLLECTIVE_GROUPS,
  SEED_TRANSACTIONS,
  SEED_TRANSPORT_PARTNERS,
} from '../src/services/store';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// CORS headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

// Health check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'online',
    platform: 'FAIRFARM Agritech Engine',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

// Dynamic Net Earnings Calculator API
app.post('/api/calculate', (req: Request, res: Response) => {
  const { crop, quantityKg, village, district, qualityGrade, sellingDate, overrides, includeCollective } = req.body;
  const result = computeSellingComparison(
    {
      crop: crop || 'Tomato',
      quantityKg: Number(quantityKg) || 1000,
      village: village || 'Hoskote Farmgate',
      district: district || 'Bengaluru Rural',
      qualityGrade: qualityGrade || 'A (Premium)',
      sellingDate: sellingDate || 'Tomorrow',
    },
    overrides,
    includeCollective !== false
  );
  res.json(result);
});

// Farmers endpoint
app.get('/api/farmers', (req: Request, res: Response) => {
  res.json(SEED_FARMERS);
});

// Buyers endpoint
app.get('/api/buyers', (req: Request, res: Response) => {
  res.json(SEED_BUYERS);
});

// Buyer offers
app.get('/api/offers', (req: Request, res: Response) => {
  res.json(SEED_BUYER_OFFERS);
});

// Mandi market prices (Agmarknet & e-NAM demonstration feeds)
app.get('/api/market-prices', (req: Request, res: Response) => {
  res.json(SEED_MARKET_PRICES);
});

// Collective groups
app.get('/api/collective-groups', (req: Request, res: Response) => {
  res.json(SEED_COLLECTIVE_GROUPS);
});

// Transport partners
app.get('/api/transport', (req: Request, res: Response) => {
  res.json(SEED_TRANSPORT_PARTNERS);
});

// Transactions
app.get('/api/transactions', (req: Request, res: Response) => {
  res.json(SEED_TRANSACTIONS);
});

app.listen(PORT, () => {
  console.log(`FAIRFARM Agritech Backend API running on port ${PORT}`);
});

