import React from 'react';
import { useTranslation } from '../../i18n';
import { Logo } from '../common/Logo';
import {
  TrendingUp,
  PhoneCall,
  Store,
  Users,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Scale,
  Sparkles,
  HelpCircle,
  Truck,
  Coins,
} from 'lucide-react';

interface LandingPageProps {
  onExplore: () => void;
  onOpenHowItWorks: () => void;
  onOpenCalculator: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onExplore,
  onOpenHowItWorks,
  onOpenCalculator,
}) => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-[#F8F6EE] text-[#102E25]">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-8 pb-16 px-4 sm:px-6 lg:px-8 border-b border-[#E5E0D0]">
        <div className="max-w-6xl mx-auto">
          {/* Top Pill */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest text-cream text-xs font-semibold shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span>{t.tagline}</span>
            </div>
          </div>

          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-forest-dark leading-[1.15]">
              {t.landing.heroTitle}
            </h1>
            <p className="text-base sm:text-xl text-[#4A554D] leading-relaxed max-w-2xl mx-auto font-normal">
              {t.landing.heroSubtitle}
            </p>

            {/* Core Principle Callout */}
            <div className="p-3 bg-white rounded-xl border border-gold/40 shadow-xs inline-block text-xs sm:text-sm font-semibold text-forest">
              🌾 Core Philosophy: <span className="text-forest-dark italic">"{t.corePhilosophy}"</span>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
              <button
                onClick={onExplore}
                className="w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-forest to-forest-dark hover:from-forest-dark hover:to-forest text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2 group text-sm sm:text-base"
              >
                <span>{t.landing.ctaPrimary}</span>
                <ArrowRight className="w-4 h-4 text-gold group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOpenCalculator}
                className="w-full sm:w-auto px-6 py-3.5 bg-cream hover:bg-cream-dark text-forest-dark font-bold rounded-xl border border-[#D5CFBE] transition-all active:scale-95 text-sm sm:text-base flex items-center justify-center gap-2"
              >
                <Scale className="w-4 h-4 text-forest" />
                <span>Calculate Net Earnings</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE AGRICULTURAL PROBLEM & THE TOMATO 1,000 KG DEMONSTRATION */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase font-extrabold tracking-wider text-earth">The Farmgate Reality</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-forest-dark mt-1">
            {t.landing.problemHeading}
          </h2>
          <p className="text-sm text-gray-600 mt-2 leading-relaxed">
            {t.landing.problemText}
          </p>
        </div>

        {/* 3-Card Comparison: 1,000 kg Tomatoes */}
        <div className="bg-white rounded-2xl border border-[#E5E0D0] p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-gray-100 gap-2">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-forest">Live Modelled Case Study</div>
              <h3 className="text-lg font-bold text-forest-dark">{t.landing.exampleHeading}</h3>
            </div>
            <span className="text-[11px] bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-1 rounded-full font-medium">
              Demonstration Reference Benchmark
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Local Trader */}
            <div className="p-4 rounded-xl border border-gray-200 bg-[#FAFAFA] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-gray-700">{t.landing.localTraderTitle}</span>
                  <span className="text-[11px] bg-gray-200 text-gray-700 px-2 py-0.5 rounded font-semibold">Farmgate</span>
                </div>
                <div className="text-2xl font-black text-gray-900 mb-3">₹10<span className="text-xs font-normal text-gray-500">/kg</span></div>
                <div className="space-y-1.5 text-xs text-gray-600 border-t border-gray-200 pt-3">
                  <div className="flex justify-between">
                    <span>{t.landing.grossValue}:</span>
                    <span className="font-semibold">₹10,000</span>
                  </div>
                  <div className="flex justify-between text-danger">
                    <span>{t.landing.expenses} (Transport ₹300 + ₹200 fees):</span>
                    <span className="font-semibold">- ₹500</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-200 bg-gray-100/70 -mx-4 -mb-4 p-3 rounded-b-xl">
                <div className="text-[11px] text-gray-500 uppercase font-semibold">{t.landing.netEarnings}</div>
                <div className="text-xl font-bold text-gray-900">₹9,500</div>
              </div>
            </div>

            {/* Nearby Mandi */}
            <div className="p-4 rounded-xl border border-gray-200 bg-[#FAFAFA] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-gray-700">{t.landing.mandiTitle}</span>
                  <span className="text-[11px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-semibold">28 km</span>
                </div>
                <div className="text-2xl font-black text-blue-900 mb-3">₹12<span className="text-xs font-normal text-gray-500">/kg</span></div>
                <div className="space-y-1.5 text-xs text-gray-600 border-t border-gray-200 pt-3">
                  <div className="flex justify-between">
                    <span>{t.landing.grossValue}:</span>
                    <span className="font-semibold">₹12,000</span>
                  </div>
                  <div className="flex justify-between text-danger">
                    <span>{t.landing.expenses} (Transport ₹1,000 + ₹500 fees):</span>
                    <span className="font-semibold">- ₹1,500</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-200 bg-blue-50/70 -mx-4 -mb-4 p-3 rounded-b-xl">
                <div className="text-[11px] text-blue-800 uppercase font-semibold">{t.landing.netEarnings}</div>
                <div className="text-xl font-bold text-blue-950">₹10,500</div>
              </div>
            </div>

            {/* Distant Wholesale Buyer (Recommended Winner) */}
            <div className="p-4 rounded-xl border-2 border-forest bg-forest-surface/30 relative flex flex-col justify-between shadow-md">
              <div className="absolute -top-3 right-4 bg-forest text-gold text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                <span>Best Net Earnings</span>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-forest-dark">{t.landing.distantBuyerTitle}</span>
                  <span className="text-[11px] bg-forest/10 text-forest px-2 py-0.5 rounded font-bold">55 km Direct</span>
                </div>
                <div className="text-2xl font-black text-forest-dark mb-3">₹14<span className="text-xs font-normal text-gray-500">/kg</span></div>
                <div className="space-y-1.5 text-xs text-gray-700 border-t border-forest/20 pt-3">
                  <div className="flex justify-between">
                    <span>{t.landing.grossValue}:</span>
                    <span className="font-semibold">₹14,000</span>
                  </div>
                  <div className="flex justify-between text-danger">
                    <span>{t.landing.expenses} (Transport ₹2,200 + ₹800 fees):</span>
                    <span className="font-semibold">- ₹3,000</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-forest/20 bg-forest text-white -mx-4 -mb-4 p-3 rounded-b-xl">
                <div className="text-[11px] text-cream uppercase font-semibold">{t.landing.netEarnings}</div>
                <div className="text-2xl font-black text-gold">₹11,000</div>
                <div className="text-[11px] text-cream mt-0.5 font-medium">
                  ✨ ₹1,500 MORE in farmer's pocket than local trader
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-mutedGrey">
            <p>
              * Note: Calculations deduct actual freight distances, hamali loading, APMC cess, and 2-3% transit grade deductions.
            </p>
            <button
              onClick={onOpenCalculator}
              className="text-xs font-bold text-forest hover:text-forest-dark underline flex items-center gap-1 shrink-0"
            >
              Test with your own crop & quantity →
            </button>
          </div>
        </div>
      </section>

      {/* 3. FOUR FUNDAMENTAL INNOVATIONS */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 bg-white border-y border-[#E5E0D0]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs uppercase font-extrabold tracking-wider text-forest">Core Architecture</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-forest-dark mt-1">
              {t.landing.whyFairfarmTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Innovation 1: Net Earnings */}
            <div className="p-5 rounded-xl bg-cream border border-[#E5E0D0] hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-forest text-gold flex items-center justify-center mb-3">
                <Scale className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-forest-dark mb-1.5">{t.landing.feature1Title}</h3>
              <p className="text-xs text-gray-600 leading-relaxed">{t.landing.feature1Desc}</p>
            </div>

            {/* Innovation 2: Voice IVR */}
            <div className="p-5 rounded-xl bg-cream border border-[#E5E0D0] hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center mb-3">
                <PhoneCall className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-forest-dark mb-1.5">{t.landing.feature2Title}</h3>
              <p className="text-xs text-gray-600 leading-relaxed">{t.landing.feature2Desc}</p>
            </div>

            {/* Innovation 3: Verified Buyers */}
            <div className="p-5 rounded-xl bg-cream border border-[#E5E0D0] hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-blue-800 text-white flex items-center justify-center mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-forest-dark mb-1.5">{t.landing.feature3Title}</h3>
              <p className="text-xs text-gray-600 leading-relaxed">{t.landing.feature3Desc}</p>
            </div>

            {/* Innovation 4: Collective Selling */}
            <div className="p-5 rounded-xl bg-cream border border-[#E5E0D0] hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-amber-700 text-gold flex items-center justify-center mb-3">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-forest-dark mb-1.5">{t.landing.feature4Title}</h3>
              <p className="text-xs text-gray-600 leading-relaxed">{t.landing.feature4Desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS (FARMER WORKFLOW) */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-xs uppercase font-extrabold tracking-wider text-earth">Simplicity for Rural India</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-forest-dark mt-1">
            How FAIRFARM Works in 3 Steps
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-5 rounded-xl border border-[#E5E0D0] text-center space-y-2">
            <div className="w-8 h-8 rounded-full bg-forest text-gold font-bold text-sm mx-auto flex items-center justify-center">1</div>
            <h4 className="font-bold text-forest-dark text-sm">Tell Us What You Have</h4>
            <p className="text-xs text-gray-600">Enter crop, quantity, and location via the web interface or simply speak it via our 1800 IVR phone number.</p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#E5E0D0] text-center space-y-2">
            <div className="w-8 h-8 rounded-full bg-forest text-gold font-bold text-sm mx-auto flex items-center justify-center">2</div>
            <h4 className="font-bold text-forest-dark text-sm">See Your True Net Earnings</h4>
            <p className="text-xs text-gray-600">The platform automatically calculates transport, commissions, and deductions across traders, mandis, and corporate buyers.</p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#E5E0D0] text-center space-y-2">
            <div className="w-8 h-8 rounded-full bg-forest text-gold font-bold text-sm mx-auto flex items-center justify-center">3</div>
            <h4 className="font-bold text-forest-dark text-sm">Sell & Dispatch Confidently</h4>
            <p className="text-xs text-gray-600">Accept the verified offer, book shared group transport to save costs, and receive direct digital bank payment.</p>
          </div>
        </div>
      </section>

      {/* 5. IMPACT & FAQ */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 bg-white border-t border-[#E5E0D0]">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center">
            <span className="text-xs uppercase font-extrabold tracking-wider text-forest">Frequently Asked Questions</span>
            <h2 className="text-2xl font-bold text-forest-dark mt-1">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-cream border border-[#E5E0D0]">
              <h4 className="font-bold text-sm text-forest-dark mb-1">How does FAIRFARM calculate transportation expenses?</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                We calculate real road distance from your specified village to the buyer destination using regional freight rate matrices (small trucks @ ₹18/km, medium @ ₹28/km, and shared collective haulage @ ₹0.75/kg).
              </p>
            </div>
            <div className="p-4 rounded-xl bg-cream border border-[#E5E0D0]">
              <h4 className="font-bold text-sm text-forest-dark mb-1">What if a farmer does not own a smartphone?</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Farmers can dial our interactive voice assistant (1800-FAIR-FARM). The automated IVR system guides them through keypad or voice in Kannada, Telugu, Tamil, Hindi, and English.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-cream border border-[#E5E0D0]">
              <h4 className="font-bold text-sm text-forest-dark mb-1">Are buyer offers guaranteed?</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Headline offers are submitted by verified buyers and backed by written digital purchase agreements. Final payout adjusts for objective weighing slips and batch quality grading.
              </p>
            </div>
          </div>

          {/* Bottom Banner */}
          <div className="p-6 bg-gradient-to-r from-forest to-forest-dark rounded-2xl text-white text-center space-y-3 shadow-xl">
            <h3 className="text-xl font-bold text-cream">Ready to discover your fair price?</h3>
            <p className="text-xs text-[#D8E2DC] max-w-lg mx-auto">
              Join 850+ farmers in the Hoskote & Kolar agricultural belts who earn more by comparing net earnings.
            </p>
            <button
              onClick={onExplore}
              className="px-6 py-2.5 bg-gold hover:bg-gold-hover text-forest-dark font-bold text-xs rounded-xl transition-all shadow-md active:scale-95"
            >
              Enter Farmer Dashboard Now
            </button>
          </div>
        </div>
      </section>

      {/* 6. FOOTER */}
      <footer className="bg-forest-dark text-[#D8E2DC] py-10 px-4 sm:px-6 lg:px-8 border-t border-forest">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <Logo size="md" />
            <p className="text-xs text-[#A8BDB4] mt-2 max-w-sm">
              FAIRFARM • From Farm to a Fair Price. Built by Team Fensta for Indian agricultural prosperity.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-xs font-medium text-cream">
            <button onClick={onExplore} className="hover:text-gold transition-colors">Farmer Dashboard</button>
            <span>•</span>
            <button onClick={onOpenCalculator} className="hover:text-gold transition-colors">Net Calculator</button>
            <span>•</span>
            <button onClick={onOpenHowItWorks} className="hover:text-gold transition-colors">IVR Voice Assistant</button>
          </div>

          <div className="text-[11px] text-mutedGrey text-center md:text-right">
            <div>© 2026 FAIRFARM Prototype</div>
            <div>Built with React, TypeScript & Tailwind</div>
          </div>
        </div>
      </footer>
    </div>
  );
};

