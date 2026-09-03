import type messages from './messages/en.json'
import { defineRouting } from 'next-intl/routing'

interface MessageModule {
  default: typeof messages
}

const messageLoaders = {
  en: async () => import('./messages/en.json'),
  tr: async () => import('./messages/tr.json'),
} satisfies Record<string, () => Promise<MessageModule>>

export type AppLocale = keyof typeof messageLoaders

const locales = Object.keys(messageLoaders) as [AppLocale, ...AppLocale[]]

export const routing = defineRouting({
  defaultLocale: 'en',
  locales,
})

export async function loadMessages(locale: AppLocale) {
  return (await messageLoaders[locale]()).default
}
