'use server'

import type { AppLocale } from '@/i18n/routing'
import { cookies } from 'next/headers'

export async function setLocale(locale: AppLocale) {
  const cookieStore = await cookies()

  cookieStore.set('lang', locale, {
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
    path: '/',
  })
}
