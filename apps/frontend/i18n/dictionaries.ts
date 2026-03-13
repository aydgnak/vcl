import type { Locale } from './config'
import type { Messages } from './messages'
import { cookies, headers } from 'next/headers'
import { defaultLocale, isLocale, localeCookieName } from './config'
import 'server-only'

const dictionaries: Record<Locale, () => Promise<Messages>> = {
  en: async () => (await import('@/dictionaries/en.json')).default,
  tr: async () => (await import('@/dictionaries/tr.json')).default,
}

function matchLocale(languageTag: string): Locale | null {
  const normalized = languageTag.toLowerCase()

  if (isLocale(normalized))
    return normalized

  const [baseLanguage] = normalized.split('-')

  return isLocale(baseLanguage) ? baseLanguage : null
}

function parseAcceptLanguage(headerValue: string | null): string[] {
  if (headerValue == null || headerValue.length === 0)
    return []

  return headerValue
    .split(',')
    .map(chunk => chunk.trim().split(';')[0]?.toLowerCase())
    .filter((value): value is string => Boolean(value))
}

export async function getDictionary(locale: Locale): Promise<Messages> {
  return dictionaries[locale]()
}

export async function resolveRequestLocale(): Promise<Locale> {
  const cookieStore = await cookies()
  const cookieLocale = cookieStore.get(localeCookieName)?.value

  if (isLocale(cookieLocale))
    return cookieLocale

  const headerStore = await headers()
  const acceptedLanguages = parseAcceptLanguage(headerStore.get('accept-language'))

  for (const languageTag of acceptedLanguages) {
    const locale = matchLocale(languageTag)

    if (locale)
      return locale
  }

  return defaultLocale
}
