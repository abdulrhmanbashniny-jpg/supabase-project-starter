import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { ar } from './ar';
import { en } from './en';

type Translations = typeof ar | typeof en;
type Lang = 'ar' | 'en';

interface I18nContextType {
  t: typeof ar;
  lang: Lang;
  setLang: (lang: Lang) => void;
  dir: 'rtl' | 'ltr';
}

const translations = { ar, en } as const;

const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    return (localStorage.getItem('lang') as Lang) || 'ar';
  });

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    localStorage.setItem('lang', l);
  }, []);

  const t = translations[lang] as typeof ar;

  useEffect(() => {
    document.documentElement.dir = t.dir;
    document.documentElement.lang = lang;
  }, [lang, t.dir]);

  return (
    <I18nContext.Provider value={{ t, lang, setLang, dir: t.dir }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}
