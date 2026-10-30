import React, { useState } from 'react';
import { Logo } from '../common/Logo';
import { useTranslation, LANGUAGE_REGISTRY } from '../../i18n';
import { store } from '../../services/store';
import { AppLanguage, UserRole } from '../../types';
import {
  Globe,
  Bell,
  UserCheck,
  Wifi,
  WifiOff,
  PhoneCall,
  Sparkles,
  ChevronDown,
  X,
  ExternalLink,
  ShieldAlert,
  User,
} from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
  role: UserRole;
  isSimpleMode: boolean;
  onToggleSimpleMode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onNavigate,
  role,
  isSimpleMode,
  onToggleSimpleMode,
}) => {
  const { language, setLanguage, currentLangInfo, openLangModal, t } = useTranslation();
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showNotifs, setShowNotifs] = useState(false);

  const notifications = store.getNotifications();
  const unreadCount = notifications.filter((n) => !n.read).length;
  const isOnline = store.getIsOnline();

  const handleRoleSelect = (newRole: UserRole) => {
    store.setRole(newRole);
    setShowRoleMenu(false);
    if (newRole === 'farmer') onNavigate('dashboard');
    else if (newRole === 'buyer') onNavigate('buyers');
    else if (newRole === 'fpo') onNavigate('fpo');
    else if (newRole === 'admin') onNavigate('admin');
  };

  const getRoleBadge = (r: UserRole) => {
    switch (r) {
      case 'farmer':
        return { label: t.nav.roleFarmer, color: 'bg-emerald-100 text-emerald-800 border-emerald-300' };
      case 'buyer':
        return { label: t.nav.roleBuyer, color: 'bg-blue-100 text-blue-800 border-blue-300' };
      case 'fpo':
        return { label: t.nav.roleFPO, color: 'bg-amber-100 text-amber-800 border-amber-300' };
      case 'admin':
        return { label: t.nav.roleAdmin, color: 'bg-purple-100 text-purple-800 border-purple-300' };
    }
  };

  const currentBadge = getRoleBadge(role);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E5E0D0] transition-all shadow-xs overflow-hidden">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 py-2 sm:py-2.5 flex items-center justify-between gap-1.5 sm:gap-3">
        {/* Left: Brand Logo & Optional Desktop Tagline Switch */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <Logo
            size="md"
            className="shrink-0 max-h-8 sm:max-h-10"
            onClick={() => onNavigate(role === 'farmer' ? 'dashboard' : 'landing')}
          />

          {/* Quick Landing Page link (Desktop only) */}
          <button
            onClick={() => onNavigate('landing')}
            className={`hidden md:inline-flex text-xs font-semibold px-2.5 py-1 rounded-full transition-colors ${
              currentTab === 'landing'
                ? 'bg-forest text-white'
                : 'text-forest-dark hover:bg-forest-surface'
            }`}
          >
            {currentTab === 'landing' ? '• Public View' : 'About FAIRFARM'}
          </button>
        </div>

        {/* Right: Controls (Strictly responsive, zero overlap) */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {/* Simple Farmer Mode Switch (Desktop/Tablet) */}
          {role === 'farmer' && (
            <button
              onClick={onToggleSimpleMode}
              className={`hidden sm:flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                isSimpleMode
                  ? 'bg-gold text-forest-dark border-gold-hover shadow-xs ring-2 ring-gold/40'
                  : 'bg-cream text-forest-dark border-[#E5E0D0] hover:bg-white'
              }`}
              title="Toggle Large Simple Cards & Regional Audio for Farmers"
            >
              <Sparkles className="w-3.5 h-3.5 text-gold-hover shrink-0" />
              <span className="hidden md:inline">{isSimpleMode ? 'Simple Mode: ON' : 'Simple Mode'}</span>
              <span className="md:hidden">Simple</span>
            </button>
          )}

          {/* Call Voice Assistant Quick Action */}
          <button
            onClick={() => onNavigate('voice')}
            className={`flex items-center gap-1 px-1.5 sm:px-2.5 py-1.5 rounded-full text-xs font-bold transition-all border ${
              currentTab === 'voice'
                ? 'bg-forest text-white border-forest'
                : 'bg-emerald-50 text-emerald-900 border-emerald-200 hover:bg-emerald-100'
            }`}
            title="Call 1800-FAIR-FARM Voice IVR Assistant"
            aria-label="Call IVR"
          >
            <PhoneCall className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
            <span className="hidden lg:inline">1800-FAIR-FARM</span>
            <span className="lg:hidden text-[10px] sm:text-[11px]">IVR</span>
          </button>

          {/* Redesigned Language Selector Trigger Modal */}
          <button
            onClick={openLangModal}
            className="flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-2 py-1.5 rounded-xl bg-cream hover:bg-cream-dark text-forest-dark border border-[#E5E0D0] text-xs font-semibold transition-all active:scale-95 shadow-2xs group"
            aria-label="Change Language"
            title="Select Language / ಭಾಷೆಯನ್ನು ಬದಲಿಸಿ"
          >
            <Globe className="w-3.5 h-3.5 text-forest group-hover:rotate-12 transition-transform shrink-0" />
            <span
              className="text-[11px] sm:text-xs font-bold tracking-tight text-forest-dark max-w-[60px] sm:max-w-none truncate"
              style={{ fontFamily: currentLangInfo.fontFamily }}
            >
              {currentLangInfo.nativeScript}
            </span>
            <ChevronDown className="w-2.5 h-2.5 text-mutedGrey shrink-0" />
          </button>

          {/* Demo Role Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setShowRoleMenu(!showRoleMenu);
                setShowNotifs(false);
              }}
              className={`flex items-center gap-1 px-1.5 sm:px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${currentBadge.color}`}
              title="Switch demo user perspective"
            >
              <UserCheck className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden sm:inline">{currentBadge.label}</span>
              <ChevronDown className="w-3 h-3 opacity-70 shrink-0" />
            </button>

            {showRoleMenu && (
              <div className="absolute right-0 mt-2 w-56 sm:w-64 bg-white rounded-xl shadow-xl border border-[#E5E0D0] py-1.5 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-mutedGrey border-b border-gray-100 flex items-center justify-between">
                  <span>Demo User Role</span>
                  <span className="text-[10px] bg-amber-100 text-amber-800 px-1 rounded font-bold">Prototype</span>
                </div>
                <button
                  data-role-select="farmer"
                  onClick={() => handleRoleSelect('farmer')}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left ${
                    role === 'farmer' ? 'bg-forest-surface text-forest font-bold' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div>
                    <div className="font-semibold">Ramesh Gowda (Farmer)</div>
                    <div className="text-[10px] text-mutedGrey">Hoskote, Bengaluru Rural</div>
                  </div>
                  {role === 'farmer' && <span className="text-forest font-bold">✓</span>}
                </button>
                <button
                  data-role-select="buyer"
                  onClick={() => handleRoleSelect('buyer')}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left ${
                    role === 'buyer' ? 'bg-forest-surface text-forest font-bold' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div>
                    <div className="font-semibold">City Fresh Foods (Buyer)</div>
                    <div className="text-[10px] text-mutedGrey">Corporate Retail Buyer</div>
                  </div>
                  {role === 'buyer' && <span className="text-forest font-bold">✓</span>}
                </button>
                <button
                  data-role-select="fpo"
                  onClick={() => handleRoleSelect('fpo')}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left ${
                    role === 'fpo' ? 'bg-forest-surface text-forest font-bold' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div>
                    <div className="font-semibold">Hoskote FPO Officer</div>
                    <div className="text-[10px] text-mutedGrey">Collective Aggregation</div>
                  </div>
                  {role === 'fpo' && <span className="text-forest font-bold">✓</span>}
                </button>
                <button
                  data-role-select="admin"
                  onClick={() => handleRoleSelect('admin')}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left ${
                    role === 'admin' ? 'bg-forest-surface text-forest font-bold' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div>
                    <div className="font-semibold">Platform Admin</div>
                    <div className="text-[10px] text-mutedGrey">Oversight & Verification</div>
                  </div>
                  {role === 'admin' && <span className="text-forest font-bold">✓</span>}
                </button>
              </div>
            )}
          </div>

          {/* Notifications Bell */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifs(!showNotifs);
                setShowRoleMenu(false);
              }}
              className="relative p-1.5 sm:p-2 rounded-lg bg-cream hover:bg-cream-dark text-forest-dark border border-[#E5E0D0] transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-forest" />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 w-3 h-3 sm:w-3.5 sm:h-3.5 bg-danger text-white text-[9px] font-bold rounded-full flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifs && (
              <div className="absolute right-0 mt-2 w-72 sm:w-80 md:w-96 bg-white rounded-xl shadow-2xl border border-[#E5E0D0] py-2 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="px-4 py-2 border-b border-gray-100 flex items-center justify-between">
                  <div className="font-bold text-sm text-forest-dark">Notifications</div>
                  <span className="text-xs text-mutedGrey">{unreadCount} unread</span>
                </div>
                <div className="max-h-80 overflow-y-auto divide-y divide-gray-100">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => {
                        store.markNotificationAsRead(n.id);
                        if (n.link) onNavigate(n.link);
                        setShowNotifs(false);
                      }}
                      className={`p-3 text-xs cursor-pointer transition-colors ${
                        !n.read ? 'bg-emerald-50/60 hover:bg-emerald-50' : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-1 mb-1">
                        <span className="font-semibold text-forest-dark">{n.title}</span>
                        <span className="text-[10px] text-mutedGrey whitespace-nowrap">{n.timestamp}</span>
                      </div>
                      <p className="text-gray-600 leading-relaxed">{n.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Connection Status Indicator (Desktop only) */}
          <div
            className={`hidden lg:flex items-center gap-1 px-2 py-1 rounded text-[11px] font-medium ${
              isOnline ? 'text-emerald-700 bg-emerald-50' : 'text-amber-800 bg-amber-50'
            }`}
            title={isOnline ? t.nav.online : t.nav.offline}
          >
            {isOnline ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
            <span className="text-[10px]">{isOnline ? t.nav.online : t.nav.offline}</span>
          </div>
        </div>
      </div>
    </header>
  );
};
