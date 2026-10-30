import React, { useState } from 'react';
import { useTranslation, LANGUAGE_REGISTRY } from '../../i18n';
import { AppLanguage, UserRole } from '../../types';
import { Logo } from './Logo';
import { store } from '../../services/store';
import {
  Globe,
  UserCheck,
  Building2,
  ShieldCheck,
  Sprout,
  ArrowRight,
  Check,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (role: UserRole) => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose,
  onComplete,
}) => {
  const { language, setLanguage, t } = useTranslation();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedRole, setSelectedRole] = useState<UserRole>('farmer');
  const [formData, setFormData] = useState({
    name: 'Ramesh Gowda',
    phone: '+91 98451 23410',
    district: 'Bengaluru Rural',
    village: 'Hoskote Taluk (Doddagattiganabbe)',
    crops: 'Tomato, Beans',
  });

  if (!isOpen) return null;

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else {
      store.setRole(selectedRole);
      onComplete(selectedRole);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#E5E0D0] animate-in zoom-in-95">
        {/* Header */}
        <div className="flex flex-col items-center text-center pb-4 border-b border-gray-100 mb-5">
          <Logo size="md" className="mb-2" />
          <div className="text-xs font-semibold text-mutedGrey uppercase tracking-wider">
            Step {step} of 3
          </div>
          <h2 className="text-xl font-bold text-forest-dark mt-1">
            {step === 1 && t.onboarding.chooseLanguage}
            {step === 2 && t.onboarding.selectRole}
            {step === 3 && t.onboarding.profileSetup}
          </h2>
        </div>

        {/* STEP 1: Language selection */}
        {step === 1 && (
          <div className="space-y-3">
            <p className="text-xs text-gray-600 text-center mb-4">
              Please choose your primary mother tongue. The entire application, market notifications, and voice assistant will adapt.
            </p>
            <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
              {Object.values(LANGUAGE_REGISTRY).map((item) => {
                const isSelected = language === item.code;
                return (
                  <button
                    key={item.code}
                    type="button"
                    onClick={() => setLanguage(item.code)}
                    style={{ fontFamily: item.fontFamily }}
                    className={`w-full text-left p-3.5 rounded-2xl border-2 transition-all flex items-center justify-between group active:scale-[0.99] ${
                      isSelected
                        ? 'border-forest bg-forest-surface text-forest ring-2 ring-forest/20 shadow-xs'
                        : 'border-gray-200 bg-white hover:border-[#D7A53A]'
                    }`}
                  >
                    <div className="space-y-0.5">
                      <div className="text-[9px] font-extrabold uppercase tracking-widest text-mutedGrey">
                        {item.englishLabel}
                      </div>
                      <div className="text-lg font-extrabold text-forest-dark tracking-tight">
                        {item.nativeScript}
                      </div>
                      <div className="text-xs font-medium text-forest italic flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-gold shrink-0" />
                        <span>{item.nativeGreeting}</span>
                      </div>
                    </div>
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                        isSelected
                          ? 'bg-forest text-gold shadow-xs'
                          : 'border-2 border-gray-300 group-hover:border-gold'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 2: Role selection */}
        {step === 2 && (
          <div className="space-y-2.5">
            <div
              onClick={() => setSelectedRole('farmer')}
              className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                selectedRole === 'farmer'
                  ? 'border-forest bg-forest-surface ring-2 ring-forest/30 shadow-xs'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-emerald-100 text-forest">
                  <Sprout className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="font-bold text-sm text-forest-dark flex items-center justify-between">
                    <span>{t.nav.roleFarmer} (Farmer / Producer)</span>
                    {selectedRole === 'farmer' && <Check className="w-4 h-4 text-forest" />}
                  </div>
                  <p className="text-xs text-gray-600 mt-0.5">{t.onboarding.roleFarmerDesc}</p>
                </div>
              </div>
            </div>

            <div
              onClick={() => setSelectedRole('buyer')}
              className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                selectedRole === 'buyer'
                  ? 'border-forest bg-forest-surface ring-2 ring-forest/30 shadow-xs'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-blue-100 text-blue-800">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="font-bold text-sm text-forest-dark flex items-center justify-between">
                    <span>{t.nav.roleBuyer} (Wholesale / Retail / Processor)</span>
                    {selectedRole === 'buyer' && <Check className="w-4 h-4 text-forest" />}
                  </div>
                  <p className="text-xs text-gray-600 mt-0.5">{t.onboarding.roleBuyerDesc}</p>
                </div>
              </div>
            </div>

            <div
              onClick={() => setSelectedRole('fpo')}
              className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                selectedRole === 'fpo'
                  ? 'border-forest bg-forest-surface ring-2 ring-forest/30 shadow-xs'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-amber-100 text-amber-800">
                  <Building2 className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="font-bold text-sm text-forest-dark flex items-center justify-between">
                    <span>{t.nav.roleFPO} (FPO Representative)</span>
                    {selectedRole === 'fpo' && <Check className="w-4 h-4 text-forest" />}
                  </div>
                  <p className="text-xs text-gray-600 mt-0.5">{t.onboarding.roleFPODesc}</p>
                </div>
              </div>
            </div>

            <div
              onClick={() => setSelectedRole('admin')}
              className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                selectedRole === 'admin'
                  ? 'border-forest bg-forest-surface ring-2 ring-forest/30 shadow-xs'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-purple-100 text-purple-800">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="font-bold text-sm text-forest-dark flex items-center justify-between">
                    <span>{t.nav.roleAdmin} (Platform Administrator)</span>
                    {selectedRole === 'admin' && <Check className="w-4 h-4 text-forest" />}
                  </div>
                  <p className="text-xs text-gray-600 mt-0.5">{t.onboarding.roleAdminDesc}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Profile Form */}
        {step === 3 && (
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">{t.onboarding.fullName}</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-forest focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">{t.onboarding.mobileNumber}</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-forest focus:outline-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">{t.onboarding.district}</label>
                <input
                  type="text"
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-forest focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">{t.onboarding.village}</label>
                <input
                  type="text"
                  value={formData.village}
                  onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-forest focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">{t.onboarding.mainCrops}</label>
              <input
                type="text"
                value={formData.crops}
                onChange={(e) => setFormData({ ...formData, crops: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-forest focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="mt-6 flex items-center justify-between gap-3 pt-3 border-t border-gray-100">
          {step > 1 ? (
            <button
              onClick={() => setStep((s) => (s - 1) as any)}
              className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-gray-900"
            >
              {t.common.back}
            </button>
          ) : (
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-gray-400 hover:text-gray-600"
            >
              Skip
            </button>
          )}

          <button
            onClick={handleNext}
            className="px-6 py-2.5 bg-forest hover:bg-forest-dark text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition-all active:scale-95 ml-auto"
          >
            <span>{step === 3 ? t.onboarding.startExploring : t.common.next}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

