export const locales = ['en', 'tr'] as const

export type Locale = (typeof locales)[number]

interface LocaleMeta {
  flag: string
  label: string
}

export const localeMeta: Record<Locale, LocaleMeta> = {
  en: {
    flag: '🇺🇸',
    label: 'English',
  },
  tr: {
    flag: '🇹🇷',
    label: 'Türkçe',
  },
}

export const defaultLocale: Locale = 'en'

export const localeCookieMaxAge = 60 * 60 * 24 * 365 * 10
export const localeCookieName = 'locale'

export function isLocale(value: string | null | undefined): value is Locale {
  if (value == null || value.length === 0)
    return false

  return locales.includes(value as Locale)
}
