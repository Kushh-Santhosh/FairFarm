import React from 'react';
import { useTranslation } from '../../i18n';
import { store } from '../../services/store';
import { formatINR, formatKg, formatIndianNumber } from '../../utils/currency';
import {
  Sprout,
  TrendingUp,
  Store,
  Users,
  PhoneCall,
  PlusCircle,
  Calculator,
  ArrowRight,
  Sparkles,
  MapPin,
  Calendar,
  CheckCircle2,
  Clock,
  ChevronRight,
  ShieldCheck,
  AlertCircle,
  HelpCircle,
  ArrowUpRight,
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

interface FarmerDashboardProps {
  onNavigate: (tab: string) => void;
  onOpenAddProduce: () => void;
  isSimpleMode: boolean;
}

export const FarmerDashboard: React.FC<FarmerDashboardProps> = ({
  onNavigate,
  onOpenAddProduce,
  isSimpleMode,
}) => {
  const { t } = useTranslation();
  const farmer = store.getFarmer();
  const listings = store.getProduceListings();
  const buyerOffers = store.getBuyerOffers();
  const transactions = store.getTransactions();
  const collectiveGroups = store.getCollectiveGroups();

  // Price trend data
  const priceTrendData = [
    { day: 'Mon', 'Kolar APMC': 10.2, 'Bengaluru Hub': 13.0, 'Local Trader': 9.5 },
    { day: 'Tue', 'Kolar APMC': 10.8, 'Bengaluru Hub': 13.2, 'Local Trader': 9.8 },
    { day: 'Wed', 'Kolar APMC': 11.5, 'Bengaluru Hub': 13.5, 'Local Trader': 10.0 },
    { day: 'Thu', 'Kolar APMC': 11.2, 'Bengaluru Hub': 13.8, 'Local Trader': 10.0 },
    { day: 'Fri', 'Kolar APMC': 12.0, 'Bengaluru Hub': 14.0, 'Local Trader': 10.0 },
    { day: 'Today', 'Kolar APMC': 12.0, 'Bengaluru Hub': 14.0, 'Local Trader': 10.0 },
  ];

  // Calculate total produce kg & estimated value
  const totalListedKg = listings.reduce((sum, l) => sum + l.quantityKg, 0);
  const totalEstNetValue = listings.reduce((sum, l) => sum + l.quantityKg * 11, 0);

  // ========================================================
  // 1. SIMPLE FARMER MODE (High Contrast, Big Touch Targets)
  // ========================================================
  if (isSimpleMode) {
    return (
      <div className="space-y-4 sm:space-y-6 max-w-4xl mx-auto pb-32 lg:pb-12 px-1">
        {/* Simple Mode Greeting Banner */}
        <div className="bg-forest text-cream p-5 sm:p-7 rounded-3xl shadow-lg border-2 border-forest-dark">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl sm:text-4xl">🌾</span>
            <div>
              <div className="text-[11px] uppercase font-extrabold text-gold tracking-wider">
                {t.dashboard.farmerBadge}
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {t.dashboard.greeting}, {farmer.name}
              </h1>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mt-2">
            <p className="text-xs sm:text-sm text-[#D8E2DC] font-medium leading-relaxed">
              Welcome to Simple Farmer Mode. Press any large button below to compare net earnings or talk directly with an agricultural advisor.
            </p>
            <button
              data-testid="toggle-simple-mode"
              onClick={() => {
                store.setSimpleMode(false);
              }}
              className="self-start sm:self-auto px-3.5 py-1.5 rounded-xl bg-gold hover:bg-gold-hover text-forest-dark text-xs font-black transition-all shadow-xs shrink-0 active:scale-95"
            >
              Exit Simple Mode
            </button>
          </div>
        </div>

        {/* Big Giant Touch Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
          {/* Action 1: Find Best Price */}
          <button
            onClick={() => onNavigate('market-intel')}
            className="p-5 sm:p-6 bg-gradient-to-r from-forest to-forest-dark text-white rounded-3xl shadow-xl border-3 border-gold/40 flex flex-col justify-between items-start text-left active:scale-[0.98] transition-all min-h-[150px] group"
          >
            <div className="flex items-center justify-between w-full">
              <div className="p-3 bg-gold/20 text-gold rounded-2xl">
                <Calculator className="w-7 h-7 sm:w-8 sm:h-8" />
              </div>
              <span className="text-[10px] sm:text-xs bg-gold text-forest-dark px-2.5 py-1 rounded-full font-black uppercase tracking-wider">
                Top Priority
              </span>
            </div>
            <div className="mt-3">
              <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-gold transition-colors">
                {t.dashboard.actionCompare}
              </h3>
              <p className="text-xs sm:text-sm text-[#D8E2DC] mt-1 font-medium">
                Calculate what you actually keep after transport, loading & cuts.
              </p>
            </div>
          </button>

          {/* Action 2: Call Voice IVR */}
          <button
            onClick={() => onNavigate('voice')}
            className="p-5 sm:p-6 bg-emerald-700 text-white rounded-3xl shadow-xl border-3 border-emerald-500/40 flex flex-col justify-between items-start text-left active:scale-[0.98] transition-all min-h-[150px] group"
          >
            <div className="flex items-center justify-between w-full">
              <div className="p-3 bg-white/20 text-white rounded-2xl">
                <PhoneCall className="w-7 h-7 sm:w-8 sm:h-8 animate-pulse" />
              </div>
              <span className="text-[10px] sm:text-xs bg-white text-emerald-950 px-2.5 py-1 rounded-full font-black tracking-wider">
                Toll Free
              </span>
            </div>
            <div className="mt-3">
              <h3 className="text-xl sm:text-2xl font-black text-white">
                1800-FAIR-FARM
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100 mt-1 font-medium">
                Speak in Kannada, Telugu, Tamil, or Hindi. No typing required.
              </p>
            </div>
          </button>

          {/* Action 3: Register Produce */}
          <button
            onClick={onOpenAddProduce}
            className="p-5 sm:p-6 bg-white text-forest-dark rounded-3xl shadow-md border-2 border-[#E5E0D0] hover:border-forest flex flex-col justify-between items-start text-left active:scale-[0.98] transition-all min-h-[140px]"
          >
            <div className="p-3 bg-forest-surface text-forest rounded-2xl mb-2">
              <PlusCircle className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-forest-dark">
                {t.dashboard.actionAddProduce}
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Register harvest: Tomato, Beans, Onion, etc.
              </p>
            </div>
          </button>

          {/* Action 4: Hoskote Tomato Collective */}
          <button
            onClick={() => onNavigate('group-selling')}
            className="p-5 sm:p-6 bg-white text-forest-dark rounded-3xl shadow-md border-2 border-[#E5E0D0] hover:border-gold flex flex-col justify-between items-start text-left active:scale-[0.98] transition-all min-h-[140px]"
          >
            <div className="p-3 bg-amber-100 text-amber-800 rounded-2xl mb-2">
              <Users className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-bold text-forest-dark">
                  {t.dashboard.actionCollective}
                </h3>
                <span className="text-[10px] bg-amber-100 text-amber-900 px-2 py-0.5 rounded font-bold">Save ₹1.45/kg</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Share a truck with 12 neighbor farmers in Hoskote.
              </p>
            </div>
          </button>
        </div>

        {/* Simple Produce Card Summary */}
        <div className="bg-white p-4 sm:p-5 rounded-3xl border border-[#E5E0D0] shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-3">
            <h3 className="font-bold text-sm sm:text-base text-forest-dark">Your Current Listed Harvest</h3>
            <span className="text-xs font-bold text-forest">{listings.length} Active Listings</span>
          </div>

          <div className="space-y-2.5">
            {listings.map((item) => (
              <div
                key={item.id}
                onClick={() => onNavigate('market-intel')}
                className="p-3.5 sm:p-4 rounded-2xl bg-cream border border-[#E5E0D0] flex items-center justify-between cursor-pointer hover:bg-cream-dark transition-colors"
              >
                <div>
                  <div className="text-base sm:text-lg font-bold text-forest-dark flex items-center gap-2">
                    <span>{item.crop}</span>
                    <span className="text-[11px] font-semibold px-2 py-0.5 bg-forest-surface text-forest rounded-full">
                      {item.qualityGrade}
                    </span>
                  </div>
                  <div className="text-xs text-mutedGrey mt-0.5">
                    {item.quantityKg.toLocaleString()} kg • {item.location.village}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[10px] sm:text-xs font-bold text-forest uppercase">Best Est. Net</div>
                  <div className="text-base sm:text-lg font-black text-forest-dark">{formatINR(item.quantityKg * 11)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ========================================================
  // 2. STANDARD / INTENTIONAL MOBILE-FIRST DASHBOARD
  // ========================================================
  return (
    <div className="space-y-4 sm:space-y-6 max-w-7xl mx-auto pb-32 lg:pb-12">
      {/* 1. PRIORITIZED HEADER: Farmer Greeting + Location & Crops */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-[#E5E0D0] shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-forest">
                {t.dashboard.farmerBadge}
              </span>
              <span className="text-xs text-mutedGrey">•</span>
              <span className="text-xs font-semibold text-gray-500">Karnataka State</span>
            </div>

            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-forest-dark tracking-tight">
              {t.dashboard.greeting}, {farmer.name}
            </h1>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-mutedGrey mt-1">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-forest shrink-0" />
                <span>{farmer.village}, Hoskote, Bengaluru Rural</span>
              </span>
              <span>•</span>
              <span>Main Crops: <strong className="text-forest-dark">{farmer.mainCrops.join(', ')}</strong></span>
            </div>
          </div>

          {/* Quick Mobile Simple Mode Switch directly inside Header */}
          <div className="flex items-center gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100 shrink-0">
            <button
              data-testid="toggle-simple-mode"
              onClick={() => {
                const next = !isSimpleMode;
                store.setSimpleMode(next);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cream hover:bg-cream-dark text-forest-dark border border-[#E5E0D0] text-xs font-bold transition-all shadow-2xs active:scale-95"
              title="Switch to Simple Large-Button Mode"
            >
              <Sparkles className="w-3.5 h-3.5 text-gold-hover shrink-0" />
              <span>Simple Mode</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. PRIORITIZED ACTIONS: (1) Compare Net Earnings & (2) Register Produce */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
        {/* HERO CARD 1: Compare Net Earnings (Primary Agritech Innovation) */}
        <div
          onClick={() => onNavigate('market-intel')}
          className="p-5 sm:p-6 bg-gradient-to-br from-forest to-forest-dark text-white rounded-2xl sm:rounded-3xl shadow-md border border-forest-light cursor-pointer group active:scale-[0.99] transition-all flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-black uppercase tracking-wider bg-gold text-forest-dark px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-2xs">
                <Sparkles className="w-3 h-3" />
                <span>Core Tool</span>
              </span>
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-gold group-hover:scale-110 transition-transform">
                <Calculator className="w-4 h-4" />
              </div>
            </div>

            <h2 className="text-lg sm:text-xl font-black text-white group-hover:text-gold transition-colors tracking-tight">
              {t.dashboard.actionCompare}
            </h2>
            <p className="text-xs text-[#D8E2DC] mt-1 leading-relaxed">
              Find out what you actually keep after transport, APMC mandi fees, and quality deductions.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-bold text-gold">
            <span>Calculate 1,000 kg Tomatoes</span>
            <div className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              <span>Compare Now</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* HERO CARD 2: Register Harvest Produce */}
        <div
          onClick={onOpenAddProduce}
          className="p-5 sm:p-6 bg-white hover:bg-cream/40 text-forest-dark rounded-2xl sm:rounded-3xl shadow-xs border border-[#E5E0D0] hover:border-forest/40 cursor-pointer group active:scale-[0.99] transition-all flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-forest-surface text-forest px-2.5 py-0.5 rounded-full">
                Assisted Selling
              </span>
              <div className="w-8 h-8 rounded-full bg-cream text-forest flex items-center justify-center group-hover:scale-110 transition-transform">
                <PlusCircle className="w-4 h-4" />
              </div>
            </div>

            <h2 className="text-lg sm:text-xl font-bold text-forest-dark group-hover:text-forest transition-colors tracking-tight">
              {t.dashboard.actionAddProduce}
            </h2>
            <p className="text-xs text-mutedGrey mt-1 leading-relaxed">
              List your crop batch (Tomato, Beans, Onion) to receive direct competitive purchase offers.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-forest">
            <span>{listings.length} Batches Currently Listed</span>
            <div className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              <span>+ Add Harvest</span>
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      {/* 3. KEY FARMER STATISTICS (2x2 on Mobile, 4-col on Desktop) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Metric 1 */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E5E0D0] shadow-xs">
          <div className="flex items-center justify-between text-mutedGrey mb-1.5">
            <span className="text-[11px] sm:text-xs font-semibold">{t.dashboard.produceListed}</span>
            <div className="p-1.5 rounded-lg bg-forest-surface text-forest">
              <Sprout className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-black text-forest-dark tracking-tight">
            {totalListedKg.toLocaleString()} <span className="text-xs sm:text-sm font-normal text-mutedGrey">kg</span>
          </div>
          <div className="text-[10px] sm:text-[11px] text-emerald-700 font-semibold mt-1 truncate">
            {listings.length} harvest batches ready
          </div>
        </div>

        {/* Metric 2 */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E5E0D0] shadow-xs">
          <div className="flex items-center justify-between text-mutedGrey mb-1.5">
            <span className="text-[11px] sm:text-xs font-semibold">{t.dashboard.estimatedNetValue}</span>
            <div className="p-1.5 rounded-lg bg-gold/20 text-gold-hover">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-black text-forest-dark tracking-tight">
            {formatINR(totalEstNetValue)}
          </div>
          <div className="text-[10px] sm:text-[11px] text-mutedGrey mt-1 truncate">
            After freight & deductions
          </div>
        </div>

        {/* Metric 3 */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E5E0D0] shadow-xs">
          <div className="flex items-center justify-between text-mutedGrey mb-1.5">
            <span className="text-[11px] sm:text-xs font-semibold">{t.dashboard.buyerOffersCount}</span>
            <div className="p-1.5 rounded-lg bg-blue-100 text-blue-800">
              <Store className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-black text-forest-dark tracking-tight">
            {buyerOffers.length} <span className="text-xs sm:text-sm font-normal text-mutedGrey">Offers</span>
          </div>
          <div className="text-[10px] sm:text-[11px] text-blue-700 font-semibold mt-1 truncate">
            Top quote: ₹14.0/kg
          </div>
        </div>

        {/* Metric 4 */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E5E0D0] shadow-xs">
          <div className="flex items-center justify-between text-mutedGrey mb-1.5">
            <span className="text-[11px] sm:text-xs font-semibold">{t.dashboard.potentialSavings}</span>
            <div className="p-1.5 rounded-lg bg-amber-100 text-amber-800">
              <Users className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-black text-forest-dark tracking-tight">
            ₹1,450 <span className="text-xs sm:text-sm font-normal text-mutedGrey">saved</span>
          </div>
          <div className="text-[10px] sm:text-[11px] text-amber-800 font-semibold mt-1 truncate">
            via Hoskote Collective
          </div>
        </div>
      </div>

      {/* 4. SMART OPPORTUNITY BENCHMARK & APMC PRICE TRENDS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
        {/* Left Column: Top Opportunity Benchmark (1 col) */}
        <div className="p-5 bg-gradient-to-br from-forest to-forest-dark text-white rounded-2xl sm:rounded-3xl shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-black uppercase tracking-wider bg-gold text-forest-dark px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-2xs">
                <Sparkles className="w-3 h-3" />
                <span>Smart Recommendation</span>
              </span>
              <span className="text-xs text-cream/80 font-medium">Tomato • 1,000 kg</span>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-cream mb-1">
              Distant Buyer (City Fresh Foods)
            </h3>
            <p className="text-xs text-[#D8E2DC] leading-relaxed mb-4">
              Even with ₹2,200 transport and deductions, ₹14/kg leaves you with <span className="font-bold text-gold">₹11,000 net</span>—that is ₹1,500 MORE than the local village aggregator.
            </p>

            <div className="bg-white/10 rounded-xl p-3 border border-white/10 space-y-1.5 text-xs">
              <div className="flex justify-between text-[#D8E2DC]">
                <span>Headline Gross Value:</span>
                <span className="font-semibold text-white">₹14,000</span>
              </div>
              <div className="flex justify-between text-rose-300">
                <span>Calculated Expenses:</span>
                <span className="font-semibold">-₹3,000</span>
              </div>
              <div className="flex justify-between text-gold font-bold pt-1.5 border-t border-white/10 text-sm">
                <span>Estimated Net Return:</span>
                <span>₹11,000</span>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-white/10">
            <button
              onClick={() => onNavigate('market-intel')}
              className="w-full py-2.5 px-4 bg-gold hover:bg-gold-hover text-forest-dark font-extrabold text-xs rounded-xl transition-all shadow-xs active:scale-95 flex items-center justify-center gap-2"
            >
              <span>View Full Net Breakdown</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Column: AGMARKNET Price Trend Graph (2 cols) */}
        <div className="lg:col-span-2 p-4 sm:p-5 bg-white rounded-2xl sm:rounded-3xl border border-[#E5E0D0] shadow-xs flex flex-col justify-between overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-2 border-b border-gray-100 gap-2">
            <div>
              <h3 className="text-sm font-bold text-forest-dark">{t.dashboard.priceTrendTitle}</h3>
              <p className="text-[11px] text-mutedGrey">
                Comparing Kolar APMC vs Bengaluru Wholesale Hub vs Hoskote Farmgate
              </p>
            </div>
            <span className="text-[10px] bg-amber-50 text-amber-900 font-bold px-2 py-0.5 rounded-full self-start sm:self-auto border border-amber-200 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
              SIMULATED DEMO DATA (Modeled on AGMARKNET Mandi Bulletin)
            </span>
          </div>

          <div className="h-56 sm:h-64 w-full min-w-0 overflow-hidden">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={priceTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E0D0" />
                <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                <YAxis domain={[8, 16]} tick={{ fontSize: 11 }} tickFormatter={(v) => `₹${v}`} />
                <Tooltip
                  formatter={(v: number) => [`₹${v}/kg`, '']}
                  contentStyle={{ backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E5E0D0', fontSize: '12px' }}
                />
                <Line type="monotone" dataKey="Bengaluru Hub" stroke="#183F32" strokeWidth={2.5} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="Kolar APMC" stroke="#D7A53A" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="Local Trader" stroke="#747C75" strokeWidth={2} strokeDasharray="4 4" dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="flex flex-wrap items-center justify-between text-[11px] text-mutedGrey pt-2 border-t border-gray-100 gap-2">
            <div className="flex flex-wrap items-center gap-3">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-forest" /> Bengaluru (₹14.0)</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-gold" /> Kolar (₹12.0)</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-gray-400" /> Local (₹10.0)</span>
            </div>
            <button
              onClick={() => onNavigate('market-intel')}
              className="text-forest font-bold hover:underline"
            >
              Analyze Options →
            </button>
          </div>
        </div>
      </div>

      {/* 5. BOTTOM GRID: Active Produce Batches & Collective Pool */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
        {/* Active Produce Listings (2 cols) */}
        <div className="lg:col-span-2 p-4 sm:p-5 bg-white rounded-2xl sm:rounded-3xl border border-[#E5E0D0] shadow-xs">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-100">
            <div>
              <h3 className="text-sm font-bold text-forest-dark">My Active Produce Listings</h3>
              <p className="text-[11px] text-mutedGrey">Real-time availability ready for buyer match</p>
            </div>
            <button
              onClick={onOpenAddProduce}
              className="text-xs font-bold text-forest hover:text-forest-dark flex items-center gap-1"
            >
              <span>+ Add Harvest</span>
            </button>
          </div>

          <div className="space-y-2.5">
            {listings.map((item) => (
              <div
                key={item.id}
                className="p-3.5 sm:p-4 rounded-xl bg-cream border border-[#E5E0D0] flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-forest/40 transition-all"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-forest-dark">{item.crop}</span>
                    <span className="text-[11px] font-medium text-gray-600">({item.variety})</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full">
                      {item.qualityGrade}
                    </span>
                  </div>
                  <div className="text-xs text-mutedGrey mt-1 flex flex-wrap items-center gap-2">
                    <span>Quantity: <strong className="text-forest-dark">{item.quantityKg.toLocaleString()} kg</strong></span>
                    <span>•</span>
                    <span>Village: {item.location.village}</span>
                    <span>•</span>
                    <span className="text-emerald-700 font-semibold">{item.harvestStatus}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <button
                    onClick={() => onNavigate('market-intel')}
                    className="px-3 py-1.5 bg-forest text-white rounded-xl text-xs font-semibold hover:bg-forest-dark transition-all flex items-center gap-1.5"
                  >
                    <Calculator className="w-3.5 h-3.5 text-gold" />
                    <span>Compare Net</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Collective Selling Highlight (1 col) */}
        <div className="p-4 sm:p-5 bg-white rounded-2xl sm:rounded-3xl border border-[#E5E0D0] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-gray-100">
              <h3 className="text-sm font-bold text-forest-dark">Collective Selling Pool</h3>
              <span className="text-[10px] bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded-full">
                85% Filled
              </span>
            </div>

            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200">
                <div className="font-bold text-xs text-forest-dark mb-1">
                  Hoskote Tomato Collective
                </div>
                <p className="text-[11px] text-gray-600 mb-2 leading-relaxed">
                  12 neighbor farmers aggregated 8,500 kg / 10,000 kg. Shared truck departs tomorrow morning.
                </p>

                {/* Progress Bar */}
                <div className="w-full bg-amber-200 h-2 rounded-full overflow-hidden mb-1">
                  <div className="bg-amber-600 h-full rounded-full transition-all" style={{ width: '85%' }} />
                </div>
                <div className="flex justify-between text-[10px] text-mutedGrey font-medium">
                  <span>8,500 kg pooled</span>
                  <span>1,500 kg needed</span>
                </div>
              </div>

              <div className="text-xs text-gray-600 space-y-1">
                <div className="flex justify-between">
                  <span>Individual Freight:</span>
                  <span className="text-danger">₹2.20 / kg</span>
                </div>
                <div className="flex justify-between">
                  <span>Shared Bulk Freight:</span>
                  <span className="text-emerald-700 font-bold">₹0.75 / kg</span>
                </div>
                <div className="flex justify-between font-bold text-forest pt-1 border-t border-gray-100">
                  <span>Your Logistics Savings:</span>
                  <span>₹1.45 / kg</span>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigate('group-selling')}
            className="w-full mt-4 py-2.5 px-3 bg-cream hover:bg-cream-dark text-forest-dark border border-[#E5E0D0] rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5"
          >
            <Users className="w-3.5 h-3.5 text-forest" />
            <span>Join Hoskote Pool</span>
          </button>
        </div>
      </div>
    </div>
  );
};
