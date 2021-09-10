/* eslint-disable @typescript-eslint/no-floating-promises */
import i18n from 'i18next'
import ptBR from './ptBR/common.json'
import en from './en/common.json'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

export const resources = {
  en: {
    translation: en
  },
  pt: {
    translation: ptBR
  }
} as const

const options = {
  order: ['querystring', 'navigator'],
  lookupQuerystring: 'lng'
}

// eslint-disable-next-line @typescript-eslint/no-unused-expressions
i18n.use(LanguageDetector).use(initReactI18next).init({
  lng: 'pt',
  detection: options,
  resources
})

i18n.changeLanguage()
