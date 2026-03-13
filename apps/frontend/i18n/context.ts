'use client'

import type { Locale } from '@/i18n/config'
import type { MessageParams } from '@/i18n/messages'
import { createContext } from 'react'

export interface I18nContextValue {
  locale: Locale
  t: (key: string, params?: MessageParams) => string
}

export const I18nContext = createContext<I18nContextValue | null>(null)
