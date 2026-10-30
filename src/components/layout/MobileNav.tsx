import React, { useState } from 'react';
import { useTranslation } from '../../i18n';
import { UserRole } from '../../types';
import {
  Home,
  Sprout,
  TrendingUp,
  Store,
  Menu,
  Calculator,
  X,
  Users,
  Truck,
  Receipt,
  PhoneCall,
  Building2,
  ShieldCheck,
  HelpCircle,
  Sparkles,
} from 'lucide-react';

interface MobileNavProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
  role: UserRole;
  onOpenAddProduce: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  currentTab,
  onNavigate,
  role,
  onOpenAddProduce,
}) => {
  const { t } = useTranslation();
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  const handleTabClick = (tabId: string) => {
    setShowMoreMenu(false);
    onNavigate(tabId);
  };

  return (
    <>
      {/* "More" Bottom Sheet Drawer Modal */}
      {showMoreMenu && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex flex-col justify-end animate-in fade-in duration-200">
          <div
            className="bg-white rounded-t-3xl p-5 max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom duration-300 shadow-2xl border-t border-[#E5E0D0]"
            style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 1.5rem)' }}
          >
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-forest" />
                <h3 className="font-extrabold text-sm text-forest-dark uppercase tracking-wider">
                  All FAIRFARM Tools
                </h3>
              </div>
              <button
                onClick={() => setShowMoreMenu(false)}
                className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2.5 text-xs mb-4">
              <button
                data-drawer-id="group-selling"
                onClick={() => handleTabClick('group-selling')}
                className="flex items-center gap-2.5 p-3 rounded-2xl bg-cream hover:bg-cream-dark text-forest-dark font-semibold text-left border border-[#E5E0D0] transition-colors"
              >
                <Users className="w-4 h-4 text-forest shrink-0" />
                <span>{t.nav.groupSelling}</span>
              </button>

              <button
                data-drawer-id="logistics"
                onClick={() => handleTabClick('logistics')}
                className="flex items-center gap-2.5 p-3 rounded-2xl bg-cream hover:bg-cream-dark text-forest-dark font-semibold text-left border border-[#E5E0D0] transition-colors"
              >
                <Truck className="w-4 h-4 text-forest shrink-0" />
                <span>{t.nav.logistics}</span>
              </button>

              <button
                data-drawer-id="transactions"
                onClick={() => handleTabClick('transactions')}
                className="flex items-center gap-2.5 p-3 rounded-2xl bg-cream hover:bg-cream-dark text-forest-dark font-semibold text-left border border-[#E5E0D0] transition-colors"
              >
                <Receipt className="w-4 h-4 text-forest shrink-0" />
                <span>{t.nav.transactions}</span>
              </button>

              <button
                data-drawer-id="voice"
                onClick={() => handleTabClick('voice')}
                className="flex items-center gap-2.5 p-3 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-950 font-bold text-left border border-emerald-200 transition-colors"
              >
                <PhoneCall className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>{t.nav.voiceAssistant}</span>
              </button>

              <button
                data-drawer-id="fpo"
                onClick={() => handleTabClick('fpo')}
                className="flex items-center gap-2.5 p-3 rounded-2xl bg-cream hover:bg-cream-dark text-forest-dark font-semibold text-left border border-[#E5E0D0] transition-colors"
              >
                <Building2 className="w-4 h-4 text-forest shrink-0" />
                <span>{t.nav.fpoDashboard}</span>
              </button>

              <button
                data-drawer-id="admin"
                onClick={() => handleTabClick('admin')}
                className="flex items-center gap-2.5 p-3 rounded-2xl bg-cream hover:bg-cream-dark text-forest-dark font-semibold text-left border border-[#E5E0D0] transition-colors"
              >
                <ShieldCheck className="w-4 h-4 text-forest shrink-0" />
                <span>{t.nav.adminDashboard}</span>
              </button>

              <button
                data-drawer-id="help"
                onClick={() => handleTabClick('help')}
                className="flex items-center gap-2.5 p-3 rounded-2xl bg-cream hover:bg-cream-dark text-forest-dark font-semibold text-left border border-[#E5E0D0] transition-colors"
              >
                <HelpCircle className="w-4 h-4 text-forest shrink-0" />
                <span>{t.nav.help}</span>
              </button>

              <button
                data-drawer-id="add-produce"
                onClick={() => {
                  setShowMoreMenu(false);
                  onOpenAddProduce();
                }}
                className="flex items-center gap-2.5 p-3 rounded-2xl bg-gold/20 text-forest-dark font-bold text-left border border-gold hover:bg-gold/30 transition-colors"
              >
                <Sprout className="w-4 h-4 text-gold-hover shrink-0" />
                <span>+ List Produce</span>
              </button>
            </div>

            <div className="p-3 bg-forest-surface rounded-2xl border border-forest/10 flex items-center justify-between text-xs">
              <span className="text-forest-dark font-medium">Core Philosophy</span>
              <span className="italic text-forest font-semibold text-[11px]">"{t.corePhilosophy}"</span>
            </div>
          </div>
        </div>
      )}

      {/* Fixed Bottom Navigation Bar (Mobile / Tablet) */}
      <nav
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E5E0D0] px-2 pt-1.5 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]"
        style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 0.5rem)' }}
      >
        <div className="max-w-md mx-auto flex items-end justify-around">
          {/* 1. Home */}
          <button
            data-mobile-nav-id="dashboard"
            onClick={() => handleTabClick('dashboard')}
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all min-w-[56px] min-h-[46px] ${
              currentTab === 'dashboard' ? 'text-forest font-extrabold' : 'text-gray-500 hover:text-gray-900 font-medium'
            }`}
          >
            <Home className={`w-5 h-5 ${currentTab === 'dashboard' ? 'text-forest stroke-[2.5]' : 'text-gray-400'}`} />
            <span className="text-[10px] mt-0.5 tracking-tight">Home</span>
          </button>

          {/* 2. Sell / Produce */}
          <button
            data-mobile-nav-id="produce"
            onClick={() => handleTabClick('produce')}
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all min-w-[56px] min-h-[46px] ${
              currentTab === 'produce' ? 'text-forest font-extrabold' : 'text-gray-500 hover:text-gray-900 font-medium'
            }`}
          >
            <Sprout className={`w-5 h-5 ${currentTab === 'produce' ? 'text-forest stroke-[2.5]' : 'text-gray-400'}`} />
            <span className="text-[10px] mt-0.5 tracking-tight">Sell</span>
          </button>

          {/* 3. CENTER HIGHLIGHT: Compare Net Earnings (Calculator) */}
          <button
            data-mobile-nav-id="market-intel"
            onClick={() => handleTabClick('market-intel')}
            className="flex flex-col items-center justify-center -mt-5 min-w-[64px] group focus:outline-none"
            title="Compare Net Earnings & Find Best Price"
          >
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center shadow-md transition-all active:scale-95 ${
                currentTab === 'market-intel'
                  ? 'bg-forest text-gold ring-4 ring-gold/40 shadow-forest/40 scale-105'
                  : 'bg-gradient-to-tr from-forest to-forest-dark text-gold hover:shadow-lg group-hover:scale-105'
              }`}
            >
              <Calculator className="w-5 h-5 text-gold stroke-[2.5]" />
            </div>
            <span
              className={`text-[10px] font-extrabold mt-1 tracking-tight ${
                currentTab === 'market-intel' ? 'text-forest' : 'text-forest-dark'
              }`}
            >
              Compare
            </span>
          </button>

          {/* 4. Buyers */}
          <button
            data-mobile-nav-id="buyers"
            onClick={() => handleTabClick('buyers')}
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all min-w-[56px] min-h-[46px] ${
              currentTab === 'buyers' ? 'text-forest font-extrabold' : 'text-gray-500 hover:text-gray-900 font-medium'
            }`}
          >
            <Store className={`w-5 h-5 ${currentTab === 'buyers' ? 'text-forest stroke-[2.5]' : 'text-gray-400'}`} />
            <span className="text-[10px] mt-0.5 tracking-tight">Buyers</span>
          </button>

          {/* 5. More Menu */}
          <button
            data-mobile-nav-id="more"
            onClick={() => setShowMoreMenu(true)}
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all min-w-[56px] min-h-[46px] ${
              showMoreMenu ? 'text-forest font-extrabold' : 'text-gray-500 hover:text-gray-900 font-medium'
            }`}
          >
            <Menu className="w-5 h-5 text-gray-400" />
            <span className="text-[10px] mt-0.5 tracking-tight">More</span>
          </button>
        </div>
      </nav>
    </>
  );
};
