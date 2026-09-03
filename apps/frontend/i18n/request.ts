import { hasLocale } from 'next-intl'
import { getRequestConfig } from 'next-intl/server'
import { cookies } from 'next/headers'
import { loadMessages, routing } from './routing'

export default getRequestConfig(async () => {
  const store = await cookies()

  const requestedLocale = store.get('lang')?.value
  const locale = hasLocale(routing.locales, requestedLocale)
    ? requestedLocale
    : routing.defaultLocale

  return {
    locale,
    messages: await loadMessages(locale),
  }
})
