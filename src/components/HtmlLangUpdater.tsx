'use client';

import { useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';

const langMap = { ko: 'ko', en: 'en', th: 'th' } as const;

export default function HtmlLangUpdater() {
  const { language } = useLanguage();

  useEffect(() => {
    document.documentElement.lang = langMap[language] || 'ko';
  }, [language]);

  return null;
}
