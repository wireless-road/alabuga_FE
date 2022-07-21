/* istanbul ignore file */
import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import { messages_en } from './index'

i18next
  .use(initReactI18next)
  .init({
    interpolation: { escapeValue: false },      // React already does escaping
    lng: navigator.language.split(/[-_]/)[0] || 'en',  // language to use
    resources: {
      en: {
        translation: messages_en
      }
    },
    debug: process.env.NODE_ENV !== 'production',
    returnObjects: true,
    fallbackLng: 'en'
  })

export default i18next
