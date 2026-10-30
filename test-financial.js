import { computeSellingComparison, calculateNetEarnings } from './src/services/calculator.ts';

console.log('================================================================');
console.log('   FAIRFARM COMPREHENSIVE FINANCIAL & RECOMMENDATION TEST SUITE ');
console.log('================================================================\n');

let totalTests = 0;
let passedTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    console.log(`  [PASS] Test ${totalTests}: ${message}`);
    passedTests++;
  } else {
    console.error(`  [FAIL] Test ${totalTests}: ${message}`);
  }
}

const benchmarkInput = {
  crop: 'Tomato',
  quantityKg: 1000,
  village: 'Hoskote Farmgate',
  district: 'Bengaluru Rural',
  qualityGrade: 'A (Premium)',
  sellingDate: 'Tomorrow',
};

// -------------------------------------------------------------
// SUITE 1: MANDATORY BENCHMARK (1,000 kg Tomatoes, All 4 Channels)
// -------------------------------------------------------------
console.log('--- Suite 1: Mandatory Benchmark Scenario (All 4 Options) ---');
const benchRes = computeSellingComparison(benchmarkInput);
const local = benchRes.options.find((o) => o.id === 'local_trader');
const mandi = benchRes.options.find((o) => o.id === 'nearby_mandi');
const distant = benchRes.options.find((o) => o.id === 'distant_buyer');
const fpo = benchRes.options.find((o) => o.id === 'fpo_collective');

assert(local.grossAmount === 10000 && local.totalExpenses === 500 && local.estimatedNetEarnings === 9500,
  `Local trader net = ₹9,500 (got ₹${local.estimatedNetEarnings})`);

assert(mandi.grossAmount === 12000 && mandi.totalExpenses === 1500 && mandi.estimatedNetEarnings === 10500,
  `Nearby Mandi net = ₹10,500 (got ₹${mandi.estimatedNetEarnings})`);

assert(distant.grossAmount === 14000 && distant.totalExpenses === 3000 && distant.estimatedNetEarnings === 11000,
  `Distant Buyer net = ₹11,000 (got ₹${distant.estimatedNetEarnings})`);

assert(fpo.grossAmount === 14000 && fpo.totalExpenses === 1150 && fpo.estimatedNetEarnings === 12850,
  `FPO Collective Selling net = ₹12,850 (got ₹${fpo.estimatedNetEarnings})`);

assert(benchRes.recommendedOptionId === 'fpo_collective',
  `FPO Collective dynamically recommended as highest net earner (wins with ₹12,850)`);

assert(benchRes.maxNetEarnings === 12850,
  `Max net earnings reported as ₹12,850 (got ₹${benchRes.maxNetEarnings})`);

assert(benchRes.netDifferenceOverLocal === 3350,
  `Net difference over local trader is exactly ₹3,350 (got ₹${benchRes.netDifferenceOverLocal})`);

assert(benchRes.netDifferenceOverNextBest === 1850,
  `Net difference over distant buyer is exactly ₹1,850 (got ₹${benchRes.netDifferenceOverNextBest})`);

// -------------------------------------------------------------
// SUITE 2: ELIGIBILITY & QUALIFICATION CRITERIA
// -------------------------------------------------------------
console.log('\n--- Suite 2: Eligibility & Ineligibility Logic ---');
assert(fpo.eligibility?.isEligible === true && fpo.eligibility?.minQuantityKg === 100,
  `FPO Collective eligibility confirmed for 1,000 kg (min requirement: 100 kg)`);

const smallBatchRes = computeSellingComparison({ ...benchmarkInput, quantityKg: 50 });
const smallFpo = smallBatchRes.options.find((o) => o.id === 'fpo_collective');
const smallDistant = smallBatchRes.options.find((o) => o.id === 'distant_buyer');

assert(smallFpo.eligibility?.isEligible === false && smallFpo.eligibility?.reasonIfNotEligible?.includes('100 kg'),
  `FPO correctly marked ineligible for 50 kg with clear reason: "${smallFpo.eligibility?.reasonIfNotEligible}"`);

assert(smallDistant.eligibility?.isEligible === false && smallDistant.eligibility?.reasonIfNotEligible?.includes('200 kg'),
  `Distant buyer correctly marked ineligible for 50 kg wholesale requirement`);

assert(smallBatchRes.recommendedOptionId === 'local_trader',
  `Recommendation engine dynamically selects best eligible option (local trader) for small 50 kg batch`);

// -------------------------------------------------------------
// SUITE 3: OPT-OUT / EXCLUDED COLLECTIVE SELLING
// -------------------------------------------------------------
console.log('\n--- Suite 3: Collective Selling Opt-Out (Farmer Filter) ---');
const noCollectiveRes = computeSellingComparison(benchmarkInput, undefined, false);
const optOutFpo = noCollectiveRes.options.find((o) => o.id === 'fpo_collective');

assert(optOutFpo.eligibility?.isEligible === false,
  `FPO marked ineligible when farmer opts out of collective pooling`);

assert(noCollectiveRes.recommendedOptionId === 'distant_buyer' && noCollectiveRes.maxNetEarnings === 11000,
  `Distant Buyer dynamically wins with ₹11,000 when collective selling is excluded`);

assert(noCollectiveRes.netDifferenceOverLocal === 1500,
  `Distant Buyer provides +₹1,500 over local trader when collective selling is excluded`);

// -------------------------------------------------------------
// SUITE 4: DYNAMIC REVERSALS & MARKET SHOCKS
// -------------------------------------------------------------
console.log('\n--- Suite 4: Dynamic Reversals & Price/Expense Changes ---');

// Reversal 1: Local Trader Price Hike to ₹16/kg
const localSurgeRes = computeSellingComparison(benchmarkInput, {
  local_trader: { pricePerKg: 16 },
});
assert(localSurgeRes.recommendedOptionId === 'local_trader' && localSurgeRes.maxNetEarnings === 15500,
  `Local Trader dynamically wins when local price increases to ₹16/kg (Net: ₹15,500)`);

// Reversal 2: Distant Buyer Price Surge to ₹18/kg
const distantSurgeRes = computeSellingComparison(benchmarkInput, {
  distant_buyer: { pricePerKg: 18 },
});
assert(distantSurgeRes.recommendedOptionId === 'distant_buyer' && distantSurgeRes.maxNetEarnings === 15000,
  `Distant Buyer dynamically beats FPO when wholesale offer surges to ₹18/kg (Net: ₹15,000 vs ₹12,850)`);

// Reversal 3: Double Freight Shock (Distant transport ₹4,500, FPO transport ₹3,500)
const freightShockRes = computeSellingComparison(benchmarkInput, {
  distant_buyer: { transportCost: 4500 },
  fpo_collective: { transportCost: 3500 },
});
assert(freightShockRes.recommendedOptionId === 'nearby_mandi' && freightShockRes.maxNetEarnings === 10500,
  `Nearby Mandi dynamically wins during severe freight crisis (Net: ₹10,500)`);

// -------------------------------------------------------------
// SUITE 5: COMPREHENSIVE EXPENSE INTEGRITY
// -------------------------------------------------------------
console.log('\n--- Suite 5: Expense Deduction Integrity ---');
const allExpenseCalc = calculateNetEarnings(1000, 20, {
  transportCost: 1000,
  loadingCost: 200,
  commissionCost: 300,
  marketFees: 150,
  expectedDeductions: 250,
  spoilageCost: 100,
  packagingCost: 400,
  otherExpenses: 100,
});
// Gross: 1000 * 20 = 20,000
// Expenses: 1000 + 200 + 300 + 150 + 250 + 100 + 400 + 100 = 2,500
// Net: 20000 - 2500 = 17,500
assert(allExpenseCalc.grossAmount === 20000, `Gross revenue correctly calculated as ₹20,000`);
assert(allExpenseCalc.totalExpenses === 2500, `Every expense component summed exactly once to ₹2,500`);
assert(allExpenseCalc.estimatedNetEarnings === 17500, `Net earnings correctly equals gross minus all deductions (₹17,500)`);
assert(allExpenseCalc.netEarningsPerKg === 17.5, `Net earnings per kg equals ₹17.50/kg`);

// -------------------------------------------------------------
// SUITE 6: MATHEMATICAL EDGE CASES & SANITIZATION
// -------------------------------------------------------------
console.log('\n--- Suite 6: Edge Cases & Sanitization ---');
const zeroCalc = calculateNetEarnings(0, 10, { transportCost: 300 });
assert(zeroCalc.grossAmount === 0 && zeroCalc.netEarningsPerKg === 0 && !isNaN(zeroCalc.netEarningsPerKg),
  `Zero quantity protected from division by zero (netEarningsPerKg: 0)`);

const negRes = computeSellingComparison({ ...benchmarkInput, quantityKg: -500 });
assert(negRes.options.every((o) => o.grossAmount >= 0 && o.totalExpenses >= 0 && !isNaN(o.estimatedNetEarnings)),
  `Negative quantity sanitized safely without NaN or crash`);

const decRes = computeSellingComparison({ ...benchmarkInput, quantityKg: 1250.5 });
const decFpo = decRes.options.find((o) => o.id === 'fpo_collective');
assert(Number.isInteger(decFpo.grossAmount) && Number.isInteger(decFpo.totalExpenses),
  `Decimal quantity 1,250.5 kg produces clean rounded integers (Gross: ₹${decFpo.grossAmount}, Net: ₹${decFpo.estimatedNetEarnings})`);

const bulkRes = computeSellingComparison({ ...benchmarkInput, quantityKg: 100000 });
const bulkFpo = bulkRes.options.find((o) => o.id === 'fpo_collective');
assert(bulkFpo.grossAmount === 1400000 && bulkFpo.estimatedNetEarnings > 1200000,
  `Bulk 100,000 kg scales to gross ₹14,00,000 without integer overflow (Net: ₹${bulkFpo.estimatedNetEarnings.toLocaleString('en-IN')})`);

const missingExpCalc = calculateNetEarnings(1000, 10, {});
assert(missingExpCalc.grossAmount === 10000 && missingExpCalc.totalExpenses === 0 && missingExpCalc.estimatedNetEarnings === 10000,
  `Missing expense properties default safely to 0 without NaN`);

// -------------------------------------------------------------
// SUMMARY
// -------------------------------------------------------------
console.log('\n================================================================');
console.log(`TOTAL TESTS: ${totalTests} | PASSED: ${passedTests} | FAILED: ${totalTests - passedTests}`);
console.log('================================================================');

if (passedTests === totalTests) {
  console.log(`\n>>> ALL ${totalTests} FINANCIAL & RECOMMENDATION TESTS PASSED WITH ZERO ERRORS! <<<`);
  process.exit(0);
} else {
  console.error('\n>>> FINANCIAL TEST FAILURES DETECTED! <<<');
  process.exit(1);
}
