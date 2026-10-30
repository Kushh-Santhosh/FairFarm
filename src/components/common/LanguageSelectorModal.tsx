import React from 'react';
import { useTranslation, LANGUAGE_REGISTRY, LanguageInfo } from '../../i18n';
import { AppLanguage } from '../../types';
import { Check, X, Globe, Sparkles } from 'lucide-react';

interface LanguageSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LanguageSelectorModal: React.FC<LanguageSelectorModalProps> = ({ isOpen, onClose }) => {
  const { language, setLanguage } = useTranslation();

  if (!isOpen) return null;

  const languages = Object.values(LANGUAGE_REGISTRY);

  const handleSelect = (code: AppLanguage) => {
    setLanguage(code);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="language-selector-title"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200"
    >
      {/* Click outside backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal / Mobile Bottom Sheet */}
      <div className="relative bg-white rounded-t-3xl sm:rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-[#E5E0D0] z-10 animate-in slide-in-from-bottom-6 sm:zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
        {/* Mobile Pull Indicator */}
        <div className="sm:hidden w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-4" />

        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-gray-100 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-forest-surface text-forest flex items-center justify-center border border-forest/20">
              <Globe className="w-5 h-5 text-forest" />
            </div>
            <div>
              <h2 id="language-selector-title" className="text-lg font-bold text-forest-dark">
                Choose Language / ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ
              </h2>
              <p className="text-xs text-mutedGrey mt-0.5">
                The entire platform adapts to your mother tongue
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close language selector"
            className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Language Selection Cards Grid */}
        <div className="space-y-3">
          {languages.map((item: LanguageInfo) => {
            const isSelected = language === item.code;

            return (
              <button
                key={item.code}
                type="button"
                data-lang={item.code}
                onClick={() => handleSelect(item.code)}
                style={{ fontFamily: item.fontFamily }}
                className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-center justify-between group active:scale-[0.99] ${
                  isSelected
                    ? 'border-forest bg-forest-surface/60 shadow-xs ring-2 ring-forest/20'
                    : 'border-gray-200 bg-white hover:border-[#D7A53A] hover:bg-cream/50'
                }`}
              >
                <div className="space-y-1">
                  {/* Category Pill: English uppercase label */}
                  <div className="text-[10px] font-extrabold uppercase tracking-widest text-mutedGrey">
                    {item.englishLabel}
                  </div>

                  {/* Native Script Language Name */}
                  <div className="text-xl font-extrabold text-forest-dark tracking-tight">
                    {item.nativeScript}
                  </div>

                  {/* Native Language Greeting */}
                  <div className="text-xs font-medium text-forest italic flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-gold shrink-0" />
                    <span>{item.nativeGreeting}</span>
                  </div>

                  {/* Region Footnote */}
                  <div className="text-[10px] text-gray-500 font-sans pt-0.5">
                    {item.region}
                  </div>
                </div>

                {/* Selection Indicator */}
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                    isSelected
                      ? 'bg-forest text-gold shadow-xs scale-110'
                      : 'border-2 border-gray-300 group-hover:border-gold'
                  }`}
                >
                  {isSelected && <Check className="w-4 h-4 stroke-[3]" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer Note */}
        <div className="mt-5 pt-4 border-t border-gray-100 text-center">
          <p className="text-[11px] text-mutedGrey">
            Language selection persists across sessions and sets your simulated IVR voice preference.
          </p>
        </div>
      </div>
    </div>
  );
};

