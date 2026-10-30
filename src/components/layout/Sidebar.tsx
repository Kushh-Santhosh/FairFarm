import React from 'react';
import { useTranslation } from '../../i18n';
import { UserRole } from '../../types';
import {
  LayoutDashboard,
  Sprout,
  TrendingUp,
  Store,
  Users,
  Truck,
  Receipt,
  PhoneCall,
  Building2,
  ShieldCheck,
  HelpCircle,
  Calculator,
  PlusCircle,
} from 'lucide-react';

interface SidebarProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
  role: UserRole;
  onOpenAddProduce: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onNavigate,
  role,
  onOpenAddProduce,
}) => {
  const { t } = useTranslation();

  const navItems = [
    { id: 'dashboard', label: t.nav.overview, icon: LayoutDashboard, roles: ['farmer', 'buyer', 'fpo', 'admin'] },
    { id: 'produce', label: t.nav.myProduce, icon: Sprout, roles: ['farmer', 'fpo'] },
    { id: 'market-intel', label: t.nav.marketIntelligence, icon: TrendingUp, roles: ['farmer', 'buyer', 'fpo', 'admin'] },
    { id: 'buyers', label: t.nav.findBuyers, icon: Store, roles: ['farmer', 'buyer', 'fpo', 'admin'] },
    { id: 'group-selling', label: t.nav.groupSelling, icon: Users, roles: ['farmer', 'fpo'] },
    { id: 'logistics', label: t.nav.logistics, icon: Truck, roles: ['farmer', 'buyer', 'fpo', 'admin'] },
    { id: 'transactions', label: t.nav.transactions, icon: Receipt, roles: ['farmer', 'buyer', 'fpo', 'admin'] },
    { id: 'voice', label: t.nav.voiceAssistant, icon: PhoneCall, roles: ['farmer', 'buyer', 'fpo', 'admin'] },
    { id: 'fpo', label: t.nav.fpoDashboard, icon: Building2, roles: ['fpo', 'admin', 'farmer'] },
    { id: 'admin', label: t.nav.adminDashboard, icon: ShieldCheck, roles: ['admin'] },
    { id: 'help', label: t.nav.help, icon: HelpCircle, roles: ['farmer', 'buyer', 'fpo', 'admin'] },
  ];

  const visibleItems = navItems.filter((item) => item.roles.includes(role));

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-[#E5E0D0] min-h-[calc(100vh-65px)] p-4 select-none shrink-0">
      {/* Primary Action Button: Find Best Price */}
      <div className="mb-4 space-y-2">
        <button
          onClick={() => onNavigate('market-intel')}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-forest to-forest-dark text-white rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all active:scale-[0.98] group"
        >
          <Calculator className="w-4 h-4 text-gold group-hover:rotate-12 transition-transform" />
          <span>{t.nav.findBestPrice}</span>
        </button>

        {role === 'farmer' && (
          <button
            onClick={onOpenAddProduce}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-cream hover:bg-cream-dark text-forest-dark rounded-xl font-semibold text-xs border border-[#E5E0D0] transition-colors"
          >
            <PlusCircle className="w-4 h-4 text-forest" />
            <span>{t.dashboard.actionAddProduce}</span>
          </button>
        )}
      </div>

      {/* Nav List */}
      <nav className="flex-1 space-y-1 overflow-y-auto pr-1">
        {visibleItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              data-nav-id={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-forest-surface text-forest border border-forest/20 shadow-xs'
                  : 'text-gray-700 hover:bg-[#F8F6EE] hover:text-forest-dark'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-forest' : 'text-mutedGrey'}`} />
              <span className="truncate">{item.label}</span>
              {item.id === 'voice' && (
                <span className="ml-auto text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-full font-bold">
                  IVR
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Philosophy Footnote */}
      <div className="mt-4 pt-3 border-t border-[#E5E0D0] text-[11px] text-mutedGrey leading-relaxed">
        <p className="font-semibold text-forest-dark mb-1">FAIRFARM Motto</p>
        <p className="italic">"{t.corePhilosophy}"</p>
      </div>
    </aside>
  );
};
