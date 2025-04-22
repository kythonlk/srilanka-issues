import { useCallback } from 'react';
import { useStore } from '../store/useStore';
import { Language } from '../types';
import translations from '../locales/translations';

export const useTranslation = () => {
  const { language, setLanguage } = useStore();
  
  const t = useCallback((key: string): string => {
    const parts = key.split('.');
    let result: any = translations;
    
    // Navigate through the nested translation object
    for (const part of parts) {
      if (result && typeof result === 'object' && part in result) {
        result = result[part];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
    }
    
    // Get the translation for the current language
    if (result && typeof result === 'object' && language in result) {
      return result[language];
    }
    
    console.warn(`No translation found for language: ${language}, key: ${key}`);
    return key;
  }, [language]);
  
  const changeLanguage = useCallback((newLanguage: Language) => {
    setLanguage(newLanguage);
  }, [setLanguage]);
  
  return { t, language, changeLanguage };
};