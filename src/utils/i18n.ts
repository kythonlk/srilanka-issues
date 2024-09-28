import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from '../locales/en.json';
import siTranslations from '../locales/si.json';
import taTranslations from '../locales/ti.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslations },
      si: { translation: siTranslations },
      ta: { translation: taTranslations }
    },
    lng: "si",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
