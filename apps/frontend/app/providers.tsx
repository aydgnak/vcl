'use client'

import type { PropsWithChildren } from 'react'
import type { Locale } from '@/i18n/config'
import type { Messages } from '@/i18n/messages'
import { ThemeProvider } from 'next-themes'
import { I18nProvider } from '@/i18n/provider'

interface ProvidersProps extends PropsWithChildren {
  locale: Locale
  messages: Messages
}

export function Providers({ children, locale, messages }: ProvidersProps) {
  return (
    <I18nProvider locale={locale} messages={messages}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        disableTransitionOnChange
        enableSystem
      >
        {children}
      </ThemeProvider>
    </I18nProvider>
  )
}
