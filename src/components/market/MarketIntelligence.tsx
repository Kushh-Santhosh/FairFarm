import React, { useState, useMemo } from 'react';
import { useTranslation } from '../../i18n';
import { store } from '../../services/store';
import { formatINR } from '../../utils/currency';
import {
  computeSellingComparison,
  CustomExpenseOverrides,
} from '../../services/calculator';
import { SellingOption } from '../../types';
import {
  Calculator,
  TrendingUp,
  MapPin,
  CheckCircle2,
  Sparkles,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Truck,
  RotateCcw,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from 'recharts';

interface MarketIntelligenceProps {
  initialCrop?: string;
  initialQuantity?: number;
  onAcceptOffer: (option: SellingOption, quantityKg: number) => void;
  onNavigateCollective: () => void;
}

export const MarketIntelligence: React.FC<MarketIntelligenceProps> = ({
  initialCrop = 'Tomato',
  initialQuantity = 1000,
  onAcceptOffer,
  onNavigateCollective,
}) => {
  const { t } = useTranslation();

  // Inputs
  const [crop, setCrop] = useState(initialCrop);
  const [quantityKg, setQuantityKg] = useState<number>(initialQuantity);
  const [village, setVillage] = useState('Hoskote Farmgate');
  const [district, setDistrict] = useState('Bengaluru Rural');
  const [qualityGrade, setQualityGrade] = useState('A (Premium)');
  const [includeCollective, setIncludeCollective] = useState(true);

  // Manual Expense Overrides
  const [overrides, setOverrides] = useState<Record<string, CustomExpenseOverrides>>({});
  const [showExpenseEditor, setShowExpenseEditor] = useState(false);
  const [selectedOptionForEdit, setSelectedOptionForEdit] = useState<string>('distant_buyer');

  // Compute results dynamically using the math engine
  const calculationResult = useMemo(() => {
    return computeSellingComparison(
      {
        crop,
        quantityKg: Number(quantityKg) || 1000,
        village,
        district,
        qualityGrade,
        sellingDate: 'Tomorrow',
      },
      overrides,
      includeCollective
    );
  }, [crop, quantityKg, village, district, qualityGrade, overrides, includeCollective]);

  const { options, recommendedOptionId, netDifferenceOverLocal } = calculationResult;

  // Chart data preparation
  const chartData = useMemo(() => {
    return options.map((opt) => ({
      name: opt.type === 'local_trader' ? 'Local Trader' : opt.type === 'nearby_mandi' ? 'Nearby Mandi' : opt.type === 'distant_buyer' ? 'Distant Buyer' : 'FPO Collective',
      'Gross Value (₹)': opt.grossAmount,
      'Total Expenses (₹)': opt.totalExpenses,
      'Estimated Net (₹)': opt.estimatedNetEarnings,
    }));
  }, [options]);

  const handleUpdateOverride = (field: keyof CustomExpenseOverrides, value: number) => {
    setOverrides((prev) => ({
      ...prev,
      [selectedOptionForEdit]: {
        ...prev[selectedOptionForEdit],
        [field]: value,
      },
    }));
  };

  const handleResetOverrides = () => {
    setOverrides({});
  };

  const currentEditedOption = options.find((o) => o.id === selectedOptionForEdit) || options[0];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-forest to-forest-dark text-white p-5 sm:p-7 rounded-2xl shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-surface/20 text-cream text-xs font-semibold mb-2">
            <Calculator className="w-3.5 h-3.5 text-gold" />
            <span>Smart Net-Earnings Comparison Engine</span>
          </div>
          <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight">
            {t.marketIntel.title}
          </h1>
          <p className="text-xs sm:text-sm text-[#D8E2DC] mt-1 max-w-2xl leading-relaxed">
            {t.marketIntel.subtitle}
          </p>
        </div>

        {/* Quick Summary Pill */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-3.5 border border-white/15 text-right w-full md:w-auto">
          <div className="text-[11px] text-[#D8E2DC] uppercase font-semibold">Top Net Recommendation</div>
          <div className="text-2xl font-black text-gold">
            {formatINR(calculationResult.maxNetEarnings)}
          </div>
          <div className="text-[11px] text-cream">
            {netDifferenceOverLocal > 0 ? (
              <span className="font-bold text-emerald-300">
                +{formatINR(netDifferenceOverLocal)} extra vs local trader
              </span>
            ) : (
              'Optimal available return'
            )}
          </div>
        </div>
      </div>

      {/* 2. Interactive Input Controls Card */}
      <div className="bg-white p-5 rounded-2xl border border-[#E5E0D0] shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-4 border-b border-gray-100">
          <h2 className="text-sm font-bold text-forest-dark flex items-center gap-2">
            <span>Crop & Quantity Parameters</span>
            <span className="text-[11px] text-mutedGrey font-normal">
              (Changing values recalculates all expenses in real-time)
            </span>
          </h2>

          <div className="flex items-center gap-2">
            <label className="text-xs font-semibold text-gray-700 flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={includeCollective}
                onChange={(e) => setIncludeCollective(e.target.checked)}
                className="rounded border-gray-300 text-forest focus:ring-forest w-3.5 h-3.5"
              />
              <span>Include FPO Collective Pool</span>
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {/* Crop */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">{t.marketIntel.cropLabel}</label>
            <select
              value={crop}
              onChange={(e) => setCrop(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs font-semibold text-forest-dark focus:ring-2 focus:ring-forest focus:outline-none"
            >
              <option value="Tomato">Tomato (Hybrid Shivam)</option>
              <option value="Onion">Onion (Bellary Red)</option>
              <option value="Potato">Potato (Hassan Jyoti)</option>
              <option value="Beans">Beans (French Bush)</option>
              <option value="Ragi">Ragi (GPU-28)</option>
              <option value="Maize">Maize (Yellow)</option>
            </select>
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Quantity: <span className="text-forest font-black">{quantityKg.toLocaleString()} kg</span>
            </label>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min="200"
                max="10000"
                step="100"
                value={quantityKg}
                onChange={(e) => setQuantityKg(Number(e.target.value))}
                className="w-full accent-forest cursor-pointer"
              />
              <input
                type="number"
                value={quantityKg}
                onChange={(e) => setQuantityKg(Number(e.target.value))}
                className="w-20 px-2 py-1 border border-gray-300 rounded-lg text-xs font-bold text-right"
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Pickup Farmgate</label>
            <div className="flex items-center gap-1.5 px-3 py-2 border border-gray-300 rounded-xl text-xs bg-gray-50 text-gray-700">
              <MapPin className="w-3.5 h-3.5 text-forest shrink-0" />
              <input
                type="text"
                value={village}
                onChange={(e) => setVillage(e.target.value)}
                className="bg-transparent border-none focus:outline-none w-full text-xs font-medium"
              />
            </div>
          </div>

          {/* Quality Grade */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Produce Quality</label>
            <select
              value={qualityGrade}
              onChange={(e) => setQualityGrade(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs font-semibold text-forest-dark focus:ring-2 focus:ring-forest focus:outline-none"
            >
              <option value="A (Premium)">Grade A (Premium)</option>
              <option value="B (Standard)">Grade B (Standard Mandi Grade)</option>
              <option value="C (Fair)">Grade C (Processing / Bulk)</option>
            </select>
          </div>
        </div>

        {/* Toggle Manual Expense Adjuster */}
        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
          <button
            onClick={() => setShowExpenseEditor(!showExpenseEditor)}
            className="flex items-center gap-1.5 font-bold text-forest hover:text-forest-dark transition-colors"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>{t.marketIntel.editExpenses}</span>
            {showExpenseEditor ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {Object.keys(overrides).length > 0 && (
            <button
              onClick={handleResetOverrides}
              className="flex items-center gap-1 text-danger font-semibold text-[11px] hover:underline"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset custom overrides</span>
            </button>
          )}
        </div>

        {/* EXPENSE EDITOR DRAWER */}
        {showExpenseEditor && (
          <div className="mt-3 p-4 rounded-xl bg-cream border border-[#E5E0D0] animate-in fade-in">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="text-xs font-bold text-gray-700">Select option to edit:</span>
              {options.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setSelectedOptionForEdit(opt.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                    selectedOptionForEdit === opt.id
                      ? 'bg-forest text-white'
                      : 'bg-white border border-gray-300 text-gray-700'
                  }`}
                >
                  {opt.type === 'local_trader' ? 'Local Trader' : opt.type === 'nearby_mandi' ? 'Nearby Mandi' : opt.type === 'distant_buyer' ? 'Distant Buyer' : 'FPO Collective'}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
              <div>
                <label className="block text-gray-600 mb-1">Headline Price (₹/kg)</label>
                <input
                  type="number"
                  step="0.5"
                  value={overrides[selectedOptionForEdit]?.pricePerKg ?? currentEditedOption.pricePerKg}
                  onChange={(e) => handleUpdateOverride('pricePerKg', Number(e.target.value))}
                  className="w-full px-2.5 py-1.5 border border-gray-300 rounded-lg font-bold bg-white"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1">Transport (₹)</label>
                <input
                  type="number"
                  step="50"
                  value={overrides[selectedOptionForEdit]?.transportCost ?? currentEditedOption.transportCost}
                  onChange={(e) => handleUpdateOverride('transportCost', Number(e.target.value))}
                  className="w-full px-2.5 py-1.5 border border-gray-300 rounded-lg font-bold bg-white"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1">Hamali / Loading (₹)</label>
                <input
                  type="number"
                  step="20"
                  value={overrides[selectedOptionForEdit]?.loadingCost ?? currentEditedOption.loadingCost}
                  onChange={(e) => handleUpdateOverride('loadingCost', Number(e.target.value))}
                  className="w-full px-2.5 py-1.5 border border-gray-300 rounded-lg font-bold bg-white"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1">Commission / Fees (₹)</label>
                <input
                  type="number"
                  step="20"
                  value={overrides[selectedOptionForEdit]?.commissionCost ?? currentEditedOption.commissionCost}
                  onChange={(e) => handleUpdateOverride('commissionCost', Number(e.target.value))}
                  className="w-full px-2.5 py-1.5 border border-gray-300 rounded-lg font-bold bg-white"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1">Deductions (₹)</label>
                <input
                  type="number"
                  step="20"
                  value={overrides[selectedOptionForEdit]?.expectedDeductions ?? currentEditedOption.expectedDeductions}
                  onChange={(e) => handleUpdateOverride('expectedDeductions', Number(e.target.value))}
                  className="w-full px-2.5 py-1.5 border border-gray-300 rounded-lg font-bold bg-white"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1">Other Packaging (₹)</label>
                <input
                  type="number"
                  step="20"
                  value={overrides[selectedOptionForEdit]?.otherExpenses ?? currentEditedOption.otherExpenses}
                  onChange={(e) => handleUpdateOverride('otherExpenses', Number(e.target.value))}
                  className="w-full px-2.5 py-1.5 border border-gray-300 rounded-lg font-bold bg-white"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 3. DYNAMIC SELLING OPPORTUNITY COMPARISON CARDS */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-forest-dark flex items-center gap-2">
            <span>{t.marketIntel.comparisonTitle}</span>
            <span className="text-xs bg-forest-surface text-forest font-semibold px-2 py-0.5 rounded-full">
              {options.length} Options Calculated
            </span>
          </h2>
          <span className="text-[11px] text-mutedGrey">
            Updated: {calculationResult.calculatedAt}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {options.map((option) => {
            const isWinner = option.isRecommended;
            return (
              <div
                key={option.id}
                className={`rounded-2xl transition-all relative flex flex-col justify-between ${
                  isWinner
                    ? 'border-2 border-forest bg-white shadow-xl ring-2 ring-forest/20'
                    : 'border border-[#E5E0D0] bg-white shadow-xs hover:shadow-md'
                }`}
              >
                {/* Top Badge */}
                {isWinner && (
                  <div className="bg-gradient-to-r from-forest to-forest-dark text-gold text-[10px] font-black uppercase tracking-wider py-1.5 px-3 rounded-t-xl flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      <span>{option.recommendationBadge || 'Top Estimated Net'}</span>
                    </span>
                    <span className="text-cream text-[10px]">HIGHEST NET EARNINGS</span>
                  </div>
                )}

                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                  {/* Data Source & Eligibility Header */}
                  <div className="flex items-center justify-between text-[10px] pb-2 mb-2 border-b border-gray-100 gap-1">
                    <span className="font-mono text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-gray-100 text-gray-700">
                      {option.dataSource || 'SIMULATED DEMO DATA'}
                    </span>
                    {option.eligibility?.isEligible ? (
                      <span className="text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded font-bold text-[10px] flex items-center gap-1 border border-emerald-200">
                        <CheckCircle2 className="w-2.5 h-2.5" /> Eligible
                      </span>
                    ) : (
                      <span className="text-amber-800 bg-amber-50 px-2 py-0.5 rounded font-bold text-[10px] flex items-center gap-1 border border-amber-200">
                        <AlertCircle className="w-2.5 h-2.5" /> Not Eligible
                      </span>
                    )}
                  </div>

                  {/* Title & Headline price */}
                  <div>
                    <div className="flex items-start justify-between gap-1 mb-1">
                      <h3 className="font-bold text-sm text-forest-dark leading-snug">
                        {option.name}
                      </h3>
                      <span className="text-[10px] font-semibold bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full shrink-0">
                        {option.distanceKm} km
                      </span>
                    </div>
                    <div className="text-[11px] text-mutedGrey flex items-center gap-1 mb-2">
                      <MapPin className="w-3 h-3 text-forest shrink-0" />
                      <span className="truncate">{option.location}</span>
                    </div>

                    {/* Eligibility & Access Details */}
                    {option.eligibility && (
                      <div className="mb-3 p-2 bg-[#FAF8F5] rounded-lg text-[10px] border border-[#ECE7DE] space-y-0.5">
                        <div className="flex justify-between text-gray-600">
                          <span>Min Volume:</span>
                          <span className="font-semibold text-gray-900">
                            {option.eligibility.minQuantityKg > 0 ? `${option.eligibility.minQuantityKg} kg` : 'None (Any qty)'}
                          </span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                          <span>Access:</span>
                          <span className="font-medium text-gray-800 truncate max-w-[140px] text-right">
                            {option.eligibility.membershipStatusText}
                          </span>
                        </div>
                        {!option.eligibility.isEligible && option.eligibility.reasonIfNotEligible && (
                          <div className="text-amber-700 font-semibold pt-1 border-t border-amber-200">
                            ⚠ {option.eligibility.reasonIfNotEligible}
                          </div>
                        )}
                      </div>
                    )}

                    <div className="flex items-baseline gap-2 mb-3">
                      <div className="text-3xl font-extrabold text-forest-dark">
                        ₹{option.pricePerKg}
                        <span className="text-xs font-medium text-gray-500">/kg headline</span>
                      </div>
                    </div>

                    {/* Breakdown calculation */}
                    <div className="space-y-1.5 text-xs border-t border-b border-gray-100 py-3 mb-3">
                      <div className="flex justify-between items-center text-gray-600">
                        <span>{t.marketIntel.grossAmount}:</span>
                        <span className="font-semibold text-gray-900">
                          {formatINR(option.grossAmount)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-gray-500 text-[11px]">
                        <span>• Transportation ({option.distanceKm} km):</span>
                        <span className="text-danger">-{formatINR(option.transportCost)}</span>
                      </div>
                      <div className="flex justify-between items-center text-gray-500 text-[11px]">
                        <span>• Hamali & Loading:</span>
                        <span className="text-danger">-{formatINR(option.loadingCost)}</span>
                      </div>
                      {(option.commissionCost > 0 || option.marketFees > 0) && (
                        <div className="flex justify-between items-center text-gray-500 text-[11px]">
                          <span>• Commission & Fees:</span>
                          <span className="text-danger">
                            -{formatINR(option.commissionCost + option.marketFees)}
                          </span>
                        </div>
                      )}
                      {option.expectedDeductions > 0 && (
                        <div className="flex justify-between items-center text-gray-500 text-[11px]">
                          <span>• Transit Quality Deduction:</span>
                          <span className="text-danger">-{formatINR(option.expectedDeductions)}</span>
                        </div>
                      )}
                      {(option.spoilageCost && option.spoilageCost > 0) ? (
                        <div className="flex justify-between items-center text-gray-500 text-[11px]">
                          <span>• Spoilage Allowance:</span>
                          <span className="text-danger">-{formatINR(option.spoilageCost)}</span>
                        </div>
                      ) : null}
                      {(option.packagingCost && option.packagingCost > 0) ? (
                        <div className="flex justify-between items-center text-gray-500 text-[11px]">
                          <span>• Packaging & Crates:</span>
                          <span className="text-danger">-{formatINR(option.packagingCost)}</span>
                        </div>
                      ) : null}
                      <div className="flex justify-between items-center text-danger font-bold pt-1 border-t border-gray-100">
                        <span>Total Expenses:</span>
                        <span>-{formatINR(option.totalExpenses)}</span>
                      </div>
                    </div>

                    {/* Highlights bullet points */}
                    <ul className="space-y-1 mb-3 text-[11px] text-gray-600">
                      {option.highlights.map((h, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3 h-3 text-forest shrink-0" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Net Earnings Hero Block in Card */}
                  <div
                    className={`p-3.5 rounded-xl ${
                      isWinner ? 'bg-forest text-white' : 'bg-cream text-forest-dark border border-[#E5E0D0]'
                    }`}
                  >
                    <div className="flex justify-between items-baseline mb-0.5">
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${isWinner ? 'text-cream' : 'text-mutedGrey'}`}>
                        {t.marketIntel.netEarnings}
                      </span>
                      <span className={`text-xs font-bold ${isWinner ? 'text-gold' : 'text-forest'}`}>
                        ₹{option.netEarningsPerKg}/kg net
                      </span>
                    </div>
                    <div className={`text-2xl font-black ${isWinner ? 'text-gold' : 'text-forest-dark'}`}>
                      {formatINR(option.estimatedNetEarnings)}
                    </div>
                  </div>
                </div>

                {/* Bottom Card Action */}
                <div className="p-4 pt-0">
                  <button
                    onClick={() => onAcceptOffer(option, quantityKg)}
                    className={`w-full py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-95 ${
                      isWinner
                        ? 'bg-gold hover:bg-gold-hover text-forest-dark shadow-sm'
                        : 'bg-cream hover:bg-cream-dark text-forest-dark border border-[#E5E0D0]'
                    }`}
                  >
                    <span>{t.common.acceptOffer}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. VISUAL BAR CHART: RECHARTS */}
      <div className="bg-white p-5 rounded-2xl border border-[#E5E0D0] shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-4 border-b border-gray-100 gap-1">
          <div>
            <h2 className="text-sm font-bold text-forest-dark">
              Financial Breakdown Comparison: Gross Value vs Total Expenses vs Estimated Net
            </h2>
            <p className="text-[11px] text-mutedGrey">
              Notice how the option with the highest headline price retains the highest net earnings despite freight.
            </p>
          </div>
          <span className="text-[11px] font-semibold text-forest bg-forest-surface px-2.5 py-1 rounded-full">
            Dynamic Graph
          </span>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E0D0" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={(val) => `₹${(val / 1000).toFixed(0)}k`} />
              <Tooltip
                formatter={(val: number) => [formatINR(val), '']}
                contentStyle={{ backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E5E0D0', fontSize: '12px' }}
              />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
              <Bar dataKey="Gross Value (₹)" fill="#747C75" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Total Expenses (₹)" fill="#C84B43" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Estimated Net (₹)" fill="#183F32" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 5. RECOMMENDATION EXPLANATION & LEGAL DISCLAIMER */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Recommendation Narrative */}
        <div className="md:col-span-2 p-5 bg-forest-surface rounded-2xl border border-forest/20 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-forest" />
              <h3 className="font-bold text-sm text-forest-dark">{t.marketIntel.recommendationTitle}</h3>
            </div>
            <p className="text-xs text-forest-dark leading-relaxed">
              Based on your <span className="font-bold">{quantityKg.toLocaleString()} kg of {crop}</span>,{' '}
              <span className="font-bold text-forest">
                {options.find((o) => o.isRecommended)?.name}
              </span>{' '}
              delivers the highest net return of{' '}
              <span className="font-bold text-forest">
                {formatINR(calculationResult.maxNetEarnings)}
              </span>{' '}
              (₹{options.find((o) => o.isRecommended)?.netEarningsPerKg}/kg net). {calculationResult.recommendedOptionId === 'fpo_collective' ? (
                <span>
                  By pooling transport with fellow Hoskote farmers, you save <span className="font-bold text-forest">₹1,450 on freight</span>, leaving you with{' '}
                  <span className="font-bold text-emerald-800 bg-emerald-100/60 px-1 py-0.5 rounded">
                    {formatINR(netDifferenceOverLocal)} MORE
                  </span>{' '}
                  than the local village trader and{' '}
                  <span className="font-bold text-forest">
                    {formatINR(calculationResult.netDifferenceOverNextBest || 1850)} MORE
                  </span>{' '}
                  than distant solo buyer logistics.
                </span>
              ) : (
                <span>
                  Even after deducting {formatINR(options.find((o) => o.isRecommended)?.totalExpenses || 0)} in calculated expenses, this verified channel leaves you with{' '}
                  <span className="font-bold">
                    {formatINR(netDifferenceOverLocal)} MORE
                  </span>{' '}
                  than selling at the farmgate.
                </span>
              )}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-forest/15 flex flex-wrap items-center justify-between gap-2">
            <span className="text-[11px] text-forest font-medium">
              {calculationResult.recommendedOptionId === 'fpo_collective'
                ? 'Collective aggregation pool is currently OPEN for Hoskote farmers'
                : 'Want to save an extra ₹1,450 on transportation?'}
            </span>
            <button
              onClick={onNavigateCollective}
              className="text-xs font-bold text-forest hover:text-forest-dark underline flex items-center gap-1"
            >
              {calculationResult.recommendedOptionId === 'fpo_collective'
                ? 'Manage Collective Group & Vehicle →'
                : 'Explore Hoskote Tomato Collective →'}
            </button>
          </div>
        </div>

        {/* Disclaimer Card */}
        <div className="p-4 bg-white rounded-2xl border border-[#E5E0D0] text-[11px] text-mutedGrey space-y-2">
          <div className="flex items-center gap-1.5 font-bold text-gray-700 text-xs">
            <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
            <span>Transparency Guarantee</span>
          </div>
          <p className="leading-relaxed">
            {t.marketIntel.disclaimer}
          </p>
          <div className="pt-2 border-t border-gray-100 text-[10px] text-gray-500">
            Deductions account for standard 2% transit shrinkage and grade allowance.
          </div>
        </div>
      </div>
    </div>
  );
};

