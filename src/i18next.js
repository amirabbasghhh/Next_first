// src/i18next.js
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18next
  .use(Backend) // loads translations from your server
  .use(LanguageDetector) // detects user language
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    fallbackLng: 'en', // fallback language
    lng: 'en', // default language
    interpolation: {
      escapeValue: false, // React already does escaping
    },
    resources: {
      en: {
        translation: {
            posts: "Posts",
            albums: "Albums",
            users: "Users"
        },
      },
      fa: {
        translation: {
            welcome: "خوش آمدید",
            posts: "پست ها",
            albums: "آلبوم ها",
            users: "کاربرها"
        },
      },
    },
  });

export default i18next;
