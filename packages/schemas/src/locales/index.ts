import type { NestedMessages } from '@utils/t'
import en from './en.json'
import tr from './tr.json'

export const locales: Record<string, NestedMessages> = {
  en,
  tr,
}

export const fallbackLocale = 'en'
