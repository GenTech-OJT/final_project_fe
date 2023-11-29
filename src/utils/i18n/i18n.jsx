import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import English from '../lang/en.json'
import Vietnamese from '../lang/vi.json'

const resources = {
  en: {
    translation: English,
  },
  vi: {
    translation: Vietnamese,
  },
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'en', // Set the default language
  fallbackLng: 'en', // Fallback language
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
