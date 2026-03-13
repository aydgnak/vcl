import process from 'node:process'
import { NextResponse } from 'next/server'
import { defaultLocale, isLocale, localeCookieMaxAge, localeCookieName } from '@/i18n/config'

interface LocaleRequestBody {
  locale?: string
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as LocaleRequestBody | null
  const requestedLocale = body?.locale

  const locale = isLocale(requestedLocale)
    ? requestedLocale
    : defaultLocale

  const response = NextResponse.json({ locale })

  response.cookies.set({
    httpOnly: true,
    maxAge: localeCookieMaxAge,
    name: localeCookieName,
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    value: locale,
  })

  return response
}
