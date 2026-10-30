import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppLanguage } from '../types';
import { en } from './locales/en';
import { kn } from './locales/kn';
import { te } from './locales/te';
import { ta } from './locales/ta';
import { hi } from './locales/hi';

const translations: Record<AppLanguage, typeof en> = {
  en,
  kn,
  te,
  ta,
  hi,
};

export interface LanguageInfo {
  code: AppLanguage;
  englishLabel: string;
  nativeScript: string;
  nativeGreeting: string;
  fontFamily: string;
  region: string;
}

export const LANGUAGE_REGISTRY: Record<AppLanguage, LanguageInfo> = {
  en: {
    code: 'en',
    englishLabel: 'ENGLISH',
    nativeScript: 'English',
    nativeGreeting: 'Welcome to FAIRFARM',
    fontFamily: "'Inter', sans-serif",
    region: 'Pan-India & Global',
  },
  kn: {
    code: 'kn',
    englishLabel: 'KANNADA',
    nativeScript: 'ಕನ್ನಡ',
    nativeGreeting: 'FAIRFARM ಗೆ ಸುಸ್ವಾಗತ',
    fontFamily: "'Noto Sans Kannada', sans-serif",
    region: 'Karnataka (Hoskote, Kolar, Mysuru)',
  },
  te: {
    code: 'te',
    englishLabel: 'TELUGU',
    nativeScript: 'తెలుగు',
    nativeGreeting: 'FAIRFARM కు స్వాగతం',
    fontFamily: "'Noto Sans Telugu', sans-serif",
    region: 'Andhra Pradesh & Telangana border',
  },
  ta: {
    code: 'ta',
    englishLabel: 'TAMIL',
    nativeScript: 'தமிழ்',
    nativeGreeting: 'FAIRFARM-க்கு வரவேற்கிறோம்',
    fontFamily: "'Noto Sans Tamil', sans-serif",
    region: 'Tamil Nadu & border districts',
  },
  hi: {
    code: 'hi',
    englishLabel: 'HINDI',
    nativeScript: 'हिन्दी',
    nativeGreeting: 'FAIRFARM में आपका स्वागत है',
    fontFamily: "'Noto Sans Devanagari', sans-serif",
    region: 'Northern & Central agricultural zones',
  },
};

// Backwards compatibility alias
export const LANGUAGE_LABELS = {
  en: { name: 'English', nativeName: 'English', flag: '' },
  kn: { name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '' },
  te: { name: 'Telugu', nativeName: 'తెలుగు', flag: '' },
  ta: { name: 'Tamil', nativeName: 'தமிழ்', flag: '' },
  hi: { name: 'Hindi', nativeName: 'हिन्दी', flag: '' },
};

interface I18nContextType {
  language: AppLanguage;
  setLanguage: (lang: AppLanguage) => void;
  currentLangInfo: LanguageInfo;
  isLangModalOpen: boolean;
  openLangModal: () => void;
  closeLangModal: () => void;
  t: typeof en;
}

const I18nContext = createContext<I18nContextType>({
  language: 'en',
  setLanguage: () => {},
  currentLangInfo: LANGUAGE_REGISTRY.en,
  isLangModalOpen: false,
  openLangModal: () => {},
  closeLangModal: () => {},
  t: en,
});

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<AppLanguage>(() => {
    const saved = localStorage.getItem('fairfarm_lang') as AppLanguage;
    return saved && translations[saved] ? saved : 'en';
  });

  const [isLangModalOpen, setIsLangModalOpen] = useState(false);

  const setLanguage = (lang: AppLanguage) => {
    setLanguageState(lang);
    localStorage.setItem('fairfarm_lang', lang);
    document.documentElement.lang = lang;
    if (typeof document !== 'undefined') {
      document.body.style.fontFamily = LANGUAGE_REGISTRY[lang].fontFamily;
    }
  };

  useEffect(() => {
    document.documentElement.lang = language;
    if (typeof document !== 'undefined') {
      document.body.style.fontFamily = LANGUAGE_REGISTRY[language].fontFamily;
    }
  }, [language]);

  const value = {
    language,
    setLanguage,
    currentLangInfo: LANGUAGE_REGISTRY[language] || LANGUAGE_REGISTRY.en,
    isLangModalOpen,
    openLangModal: () => setIsLangModalOpen(true),
    closeLangModal: () => setIsLangModalOpen(false),
    t: translations[language] || en,
  };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useTranslation = () => useContext(I18nContext);
