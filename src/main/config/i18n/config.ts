/* eslint-disable @typescript-eslint/no-floating-promises */
import i18n from 'i18next'
import ptBR from './ptBR/common.json'
import en from './en/common.json'
import { initReactI18next } from 'react-i18next'

export const resources = {
  en: {
    translation: en
  },
  pt: {
    translation: ptBR
  }
} as const

// eslint-disable-next-line @typescript-eslint/no-unused-expressions
i18n.use(initReactI18next).init({
  lng: 'pt',
  resources
})
