'use client'

import type { PropsWithChildren } from 'react'
import type { Locale } from '@/i18n/config'
import type { MessageParams, Messages } from '@/i18n/messages'
import { useCallback, useMemo } from 'react'
import { I18nContext } from '@/i18n/context'
import { translate } from '@/i18n/messages'

interface I18nProviderProps extends PropsWithChildren {
  locale: Locale
  messages: Messages
}

export function I18nProvider({ children, locale, messages }: I18nProviderProps) {
  const t = useCallback((key: string, params?: MessageParams) => {
    return translate(messages, key, params)
  }, [messages])

  const value = useMemo(() => {
    return {
      locale,
      t,
    }
  }, [locale, t])

  return <I18nContext value={value}>{children}</I18nContext>
}
