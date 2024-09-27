import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "thankYou": "Thank You!",
      "feedbackSubmitted": "Your feedback has been submitted successfully.",
    }
  },
  si: {
    translation: {
      "thankYou": "ඔබට ස්තුතියි!",
      "feedbackSubmitted": "ඔබේ ප්‍රතිචාර සාර්ථකව ඉදිරිපත් කර ඇත.",
    }
  },
  ta: {
    translation: {
      "thankYou": "நன்றி!",
      "feedbackSubmitted": "உங்கள் கருத்து வெற்றிகரமாக சமர்ப்பிக்கப்பட்டது.",
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", // default language
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
