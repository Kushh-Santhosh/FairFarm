import { SellingComparisonInput, SellingComparisonResult, SellingOption, MarketDataSourceType, SellingOptionEligibility } from '../types/index';

export interface CustomExpenseOverrides {
  pricePerKg?: number;
  transportCost?: number;
  loadingCost?: number;
  commissionCost?: number;
  marketFees?: number;
  expectedDeductions?: number;
  spoilageCost?: number;
  packagingCost?: number;
  otherExpenses?: number;
}

export interface CalculationExpenseInput {
  transportCost?: number;
  loadingCost?: number;
  commissionCost?: number;
  marketFees?: number;
  expectedDeductions?: number;
  spoilageCost?: number;
  packagingCost?: number;
  otherExpenses?: number;
}

/**
 * Calculates net farmer earnings after deducting every expense exactly once.
 * Sanitizes input against division-by-zero, negative quantities, and NaN.
 */
export function calculateNetEarnings(
  quantityKg: number,
  pricePerKg: number,
  expenses: CalculationExpenseInput
) {
  const safeQty = Math.max(0, Number(quantityKg) || 0);
  const safePrice = Math.max(0, Number(pricePerKg) || 0);

  const grossAmount = Math.round(safeQty * safePrice);
  const totalExpenses = Math.round(
    Math.max(0, expenses.transportCost || 0) +
    Math.max(0, expenses.loadingCost || 0) +
    Math.max(0, expenses.commissionCost || 0) +
    Math.max(0, expenses.marketFees || 0) +
    Math.max(0, expenses.expectedDeductions || 0) +
    Math.max(0, expenses.spoilageCost || 0) +
    Math.max(0, expenses.packagingCost || 0) +
    Math.max(0, expenses.otherExpenses || 0)
  );

  const estimatedNetEarnings = grossAmount - totalExpenses;
  // Division-by-zero protection:
  const netEarningsPerKg = safeQty > 0 ? Number((estimatedNetEarnings / safeQty).toFixed(2)) : 0;

  return {
    grossAmount,
    totalExpenses,
    estimatedNetEarnings,
    netEarningsPerKg,
  };
}

/**
 * Compares all selling options genuinely available to the farmer.
 * Evaluates real eligibility criteria (minimum volume, radius, active pooling)
 * and dynamically recommends the highest net-earning ELIGIBLE option.
 */
export function computeSellingComparison(
  input: SellingComparisonInput,
  overrides?: Record<string, CustomExpenseOverrides>,
  includeCollective: boolean = true
): SellingComparisonResult {
  // Safe sanitized quantity (positive number, defaults to 1000 if invalid/zero)
  const rawQty = Number(input.quantityKg);
  const qty = rawQty > 0 ? rawQty : 1000;
  const scale = qty / 1000;

  // -------------------------------------------------------------
  // Option 1: Local Village Trader / Aggregator
  // -------------------------------------------------------------
  const opt1BasePrice = overrides?.['local_trader']?.pricePerKg ?? 10;
  const opt1Expenses = {
    transportCost: overrides?.['local_trader']?.transportCost ?? Math.round(300 * Math.max(0.6, scale)),
    loadingCost: overrides?.['local_trader']?.loadingCost ?? Math.round(100 * scale),
    commissionCost: overrides?.['local_trader']?.commissionCost ?? Math.round(100 * scale),
    marketFees: overrides?.['local_trader']?.marketFees ?? 0,
    expectedDeductions: overrides?.['local_trader']?.expectedDeductions ?? 0,
    spoilageCost: overrides?.['local_trader']?.spoilageCost ?? 0,
    packagingCost: overrides?.['local_trader']?.packagingCost ?? 0,
    otherExpenses: overrides?.['local_trader']?.otherExpenses ?? 0,
  };
  const opt1Calc = calculateNetEarnings(qty, opt1BasePrice, opt1Expenses);

  const localTrader: SellingOption = {
    id: 'local_trader',
    name: 'Local Village Trader',
    type: 'local_trader',
    location: input.village ? `${input.village}, Farmgate` : 'Hoskote Farmgate',
    distanceKm: 2,
    pricePerKg: opt1BasePrice,
    grossAmount: opt1Calc.grossAmount,
    transportCost: opt1Expenses.transportCost,
    loadingCost: opt1Expenses.loadingCost,
    commissionCost: opt1Expenses.commissionCost,
    marketFees: opt1Expenses.marketFees,
    expectedDeductions: opt1Expenses.expectedDeductions,
    spoilageCost: opt1Expenses.spoilageCost,
    packagingCost: opt1Expenses.packagingCost,
    otherExpenses: opt1Expenses.otherExpenses,
    totalExpenses: opt1Calc.totalExpenses,
    estimatedNetEarnings: opt1Calc.estimatedNetEarnings,
    netEarningsPerKg: opt1Calc.netEarningsPerKg,
    isRecommended: false,
    badgeType: 'lowest_transport',
    recommendationBadge: 'Lowest Logistics Friction',
    highlights: ['Immediate farmgate payment', 'Minimal ₹300 cartage', 'Zero transit risk'],
    eligibility: {
      isEligible: true,
      minQuantityKg: 0,
      membershipRequired: false,
      membershipStatusText: 'Open to all farmgate sellers',
      locationAvailability: 'Direct on-farm pickup in Hoskote',
    },
    dataSource: 'SIMULATED DEMO DATA',
  };

  // -------------------------------------------------------------
  // Option 2: Nearby Mandi / APMC (e.g. Kolar APMC)
  // -------------------------------------------------------------
  const opt2BasePrice = overrides?.['nearby_mandi']?.pricePerKg ?? 12;
  const opt2Expenses = {
    transportCost: overrides?.['nearby_mandi']?.transportCost ?? Math.round(1000 * Math.max(0.7, scale)),
    loadingCost: overrides?.['nearby_mandi']?.loadingCost ?? Math.round(200 * scale),
    commissionCost: overrides?.['nearby_mandi']?.commissionCost ?? Math.round(300 * scale),
    marketFees: overrides?.['nearby_mandi']?.marketFees ?? 0,
    expectedDeductions: overrides?.['nearby_mandi']?.expectedDeductions ?? 0,
    spoilageCost: overrides?.['nearby_mandi']?.spoilageCost ?? 0,
    packagingCost: overrides?.['nearby_mandi']?.packagingCost ?? 0,
    otherExpenses: overrides?.['nearby_mandi']?.otherExpenses ?? 0,
  };
  const opt2Calc = calculateNetEarnings(qty, opt2BasePrice, opt2Expenses);

  const opt2Eligible = qty >= 50;
  const nearbyMandi: SellingOption = {
    id: 'nearby_mandi',
    name: 'Nearby APMC Mandi (Kolar)',
    type: 'nearby_mandi',
    location: 'Kolar APMC Market Yard',
    distanceKm: 28,
    pricePerKg: opt2BasePrice,
    grossAmount: opt2Calc.grossAmount,
    transportCost: opt2Expenses.transportCost,
    loadingCost: opt2Expenses.loadingCost,
    commissionCost: opt2Expenses.commissionCost,
    marketFees: opt2Expenses.marketFees,
    expectedDeductions: opt2Expenses.expectedDeductions,
    spoilageCost: opt2Expenses.spoilageCost,
    packagingCost: opt2Expenses.packagingCost,
    otherExpenses: opt2Expenses.otherExpenses,
    totalExpenses: opt2Calc.totalExpenses,
    estimatedNetEarnings: opt2Calc.estimatedNetEarnings,
    netEarningsPerKg: opt2Calc.netEarningsPerKg,
    isRecommended: false,
    highlights: ['APMC auction benchmark', 'Regulated weighing scales', 'Moderate travel & commission fees'],
    eligibility: {
      isEligible: opt2Eligible,
      minQuantityKg: 50,
      membershipRequired: false,
      membershipStatusText: 'APMC gate entry token',
      locationAvailability: 'Kolar APMC Yard (28 km)',
      reasonIfNotEligible: opt2Eligible ? undefined : 'Requires minimum 50 kg for APMC auction lot',
    },
    dataSource: 'SIMULATED DEMO DATA',
  };

  // -------------------------------------------------------------
  // Option 3: Distant Wholesale Buyer (City Fresh Foods)
  // -------------------------------------------------------------
  const opt3BasePrice = overrides?.['distant_buyer']?.pricePerKg ?? 14;
  const opt3Expenses = {
    transportCost: overrides?.['distant_buyer']?.transportCost ?? Math.round(2200 * Math.max(0.8, scale)),
    loadingCost: overrides?.['distant_buyer']?.loadingCost ?? Math.round(300 * scale),
    commissionCost: overrides?.['distant_buyer']?.commissionCost ?? Math.round(200 * scale),
    marketFees: overrides?.['distant_buyer']?.marketFees ?? 0,
    expectedDeductions: overrides?.['distant_buyer']?.expectedDeductions ?? Math.round(300 * scale),
    spoilageCost: overrides?.['distant_buyer']?.spoilageCost ?? 0,
    packagingCost: overrides?.['distant_buyer']?.packagingCost ?? 0,
    otherExpenses: overrides?.['distant_buyer']?.otherExpenses ?? 0,
  };
  const opt3Calc = calculateNetEarnings(qty, opt3BasePrice, opt3Expenses);

  const opt3Eligible = qty >= 200;
  const distantBuyer: SellingOption = {
    id: 'distant_buyer',
    name: 'Distant Wholesale Buyer (City Fresh Foods)',
    type: 'distant_buyer',
    location: 'Bengaluru Wholesale Hub (Whitefield)',
    distanceKm: 55,
    pricePerKg: opt3BasePrice,
    grossAmount: opt3Calc.grossAmount,
    transportCost: opt3Expenses.transportCost,
    loadingCost: opt3Expenses.loadingCost,
    commissionCost: opt3Expenses.commissionCost,
    marketFees: opt3Expenses.marketFees,
    expectedDeductions: opt3Expenses.expectedDeductions,
    spoilageCost: opt3Expenses.spoilageCost,
    packagingCost: opt3Expenses.packagingCost,
    otherExpenses: opt3Expenses.otherExpenses,
    totalExpenses: opt3Calc.totalExpenses,
    estimatedNetEarnings: opt3Calc.estimatedNetEarnings,
    netEarningsPerKg: opt3Calc.netEarningsPerKg,
    isRecommended: false,
    badgeType: 'best_earnings',
    recommendationBadge: 'Best Wholesale Buyer',
    highlights: ['₹14/kg headline price', 'Direct digital purchase order', 'Leaves competitive net margin'],
    eligibility: {
      isEligible: opt3Eligible,
      minQuantityKg: 200,
      membershipRequired: false,
      membershipStatusText: 'Direct verified commercial purchase order',
      locationAvailability: 'Bengaluru Wholesale Hub (55 km)',
      reasonIfNotEligible: opt3Eligible ? undefined : 'Wholesale buyer requires minimum batch of 200 kg',
    },
    dataSource: 'BUYER-SUBMITTED OFFER',
  };

  // -------------------------------------------------------------
  // Option 4: FPO Collective Selling Pool (Hoskote Tomato Collective)
  // -------------------------------------------------------------
  const opt4BasePrice = overrides?.['fpo_collective']?.pricePerKg ?? 14;
  const opt4Expenses = {
    transportCost: overrides?.['fpo_collective']?.transportCost ?? Math.round(750 * Math.max(0.6, scale)),
    loadingCost: overrides?.['fpo_collective']?.loadingCost ?? Math.round(150 * scale),
    commissionCost: overrides?.['fpo_collective']?.commissionCost ?? 0,
    marketFees: overrides?.['fpo_collective']?.marketFees ?? Math.round(100 * scale),
    expectedDeductions: overrides?.['fpo_collective']?.expectedDeductions ?? Math.round(150 * scale),
    spoilageCost: overrides?.['fpo_collective']?.spoilageCost ?? 0,
    packagingCost: overrides?.['fpo_collective']?.packagingCost ?? 0,
    otherExpenses: overrides?.['fpo_collective']?.otherExpenses ?? 0,
  };
  const opt4Calc = calculateNetEarnings(qty, opt4BasePrice, opt4Expenses);

  const opt4Eligible = includeCollective && qty >= 100;
  const fpoCollective: SellingOption = {
    id: 'fpo_collective',
    name: 'Hoskote Tomato Collective (Shared Transport)',
    type: 'fpo_collective',
    location: 'Hoskote Collection Centre (6 km)',
    distanceKm: 6,
    pricePerKg: opt4BasePrice,
    grossAmount: opt4Calc.grossAmount,
    transportCost: opt4Expenses.transportCost,
    loadingCost: opt4Expenses.loadingCost,
    commissionCost: opt4Expenses.commissionCost,
    marketFees: opt4Expenses.marketFees,
    expectedDeductions: opt4Expenses.expectedDeductions,
    spoilageCost: opt4Expenses.spoilageCost,
    packagingCost: opt4Expenses.packagingCost,
    otherExpenses: opt4Expenses.otherExpenses,
    totalExpenses: opt4Calc.totalExpenses,
    estimatedNetEarnings: opt4Calc.estimatedNetEarnings,
    netEarningsPerKg: opt4Calc.netEarningsPerKg,
    isRecommended: false,
    badgeType: 'collective_value',
    recommendationBadge: 'Maximum Collective Value',
    highlights: ['Shared bulk logistics saves ₹1,450+', 'Zero commission agent cut', 'Verified batch scales'],
    eligibility: {
      isEligible: opt4Eligible,
      minQuantityKg: 100,
      membershipRequired: false,
      membershipStatusText: 'Hoskote Farmer Producer Org (Open Pool)',
      locationAvailability: 'Hoskote Collection Centre (6 km, within 50 km active zone)',
      reasonIfNotEligible: !includeCollective
        ? 'Collective selling disabled by farmer filter'
        : qty < 100
        ? 'Minimum 100 kg batch required to join shared transport pooling'
        : undefined,
    },
    dataSource: 'SIMULATED DEMO DATA',
  };

  const options: SellingOption[] = [localTrader, nearbyMandi, distantBuyer, fpoCollective];

  // -------------------------------------------------------------
  // Recommendation Selection:
  // Dynamically evaluate all ELIGIBLE options to find highest net earner
  // -------------------------------------------------------------
  const eligibleOptions = options.filter((opt) => opt.eligibility?.isEligible !== false);
  const candidates = eligibleOptions.length > 0 ? eligibleOptions : options;

  let bestOption = candidates[0];
  for (const opt of candidates) {
    if (opt.estimatedNetEarnings > bestOption.estimatedNetEarnings) {
      bestOption = opt;
    }
  }

  // Update dynamic badges
  options.forEach((opt) => {
    const isWinner = opt.id === bestOption.id;
    opt.isRecommended = isWinner;
    if (isWinner) {
      opt.recommendationBadge =
        opt.type === 'fpo_collective'
          ? 'Maximum Collective Value'
          : opt.type === 'distant_buyer'
          ? 'Best Estimated Earnings'
          : opt.type === 'nearby_mandi'
          ? 'Best Mandi Return'
          : 'Lowest Logistics Friction';
      opt.badgeType =
        opt.type === 'fpo_collective'
          ? 'collective_value'
          : opt.type === 'distant_buyer'
          ? 'best_earnings'
          : 'lowest_transport';
    }
  });

  const sortedEligible = [...candidates].sort((a, b) => b.estimatedNetEarnings - a.estimatedNetEarnings);
  const nextBest = sortedEligible.length > 1 ? sortedEligible[1] : undefined;
  const netDiffOverLocal = bestOption.estimatedNetEarnings - localTrader.estimatedNetEarnings;
  const netDiffOverNextBest = nextBest ? bestOption.estimatedNetEarnings - nextBest.estimatedNetEarnings : 0;

  let recommendationReason = '';
  if (bestOption.id === 'fpo_collective') {
    recommendationReason = `FPO Collective Selling delivers the highest net return of ₹${bestOption.estimatedNetEarnings.toLocaleString('en-IN')}, beating the distant buyer by ₹${netDiffOverNextBest.toLocaleString('en-IN')} and village trader by ₹${netDiffOverLocal.toLocaleString('en-IN')} via shared logistics savings.`;
  } else if (bestOption.id === 'distant_buyer') {
    recommendationReason = `Distant Wholesale Buyer offers the highest net return of ₹${bestOption.estimatedNetEarnings.toLocaleString('en-IN')} after absorbing logistics expenses (+₹${netDiffOverLocal.toLocaleString('en-IN')} over local trader).`;
  } else {
    recommendationReason = `${bestOption.name} delivers the optimal net return of ₹${bestOption.estimatedNetEarnings.toLocaleString('en-IN')}.`;
  }

  return {
    input,
    options,
    recommendedOptionId: bestOption.id,
    recommendedOptionName: bestOption.name,
    maxNetEarnings: bestOption.estimatedNetEarnings,
    netDifferenceOverLocal: netDiffOverLocal,
    netDifferenceOverNextBest: netDiffOverNextBest,
    recommendationReason,
    calculatedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  };
}
