import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

const ACCESS_COOKIE_NAME = 'accessToken'
const REFRESH_COOKIE_NAME = 'refreshToken'
const HOME_PATH = '/'
const LOGIN_PATH = '/login'
const REGISTER_PATH = '/register'
const TOKEN_EXPIRY_SKEW_MS = 5000
const TRAILING_SLASH_REGEX = /\/+$/
const BASE64_URL_DASH_REGEX = /-/g
const BASE64_URL_UNDERSCORE_REGEX = /_/g

function getEnv(name: 'API_URL' | 'NEXT_PUBLIC_API_URL' | 'NODE_ENV') {
  // eslint-disable-next-line node/prefer-global/process
  return process.env[name]
}

function getApiBaseUrl() {
  const configured = getEnv('API_URL') ?? getEnv('NEXT_PUBLIC_API_URL')

  if (configured !== undefined && configured.length > 0)
    return configured.replace(TRAILING_SLASH_REGEX, '')

  return 'http://localhost:8000'
}

function decodeTokenExp(token: string): number | null {
  const parts = token.split('.')

  if (parts.length < 2)
    return null

  const encodedPayload = parts[1]

  if (encodedPayload == null || encodedPayload.length === 0)
    return null

  const normalizedPayload = encodedPayload
    .replace(BASE64_URL_DASH_REGEX, '+')
    .replace(BASE64_URL_UNDERSCORE_REGEX, '/')

  const paddedPayload = normalizedPayload.padEnd(Math.ceil(normalizedPayload.length / 4) * 4, '=')

  try {
    const decodedPayload = atob(paddedPayload)
    const payload = JSON.parse(decodedPayload) as { exp?: unknown }

    return typeof payload.exp === 'number' ? payload.exp : null
  }
  catch {
    return null
  }
}

function hasValidAccessToken(request: NextRequest) {
  const accessToken = request.cookies.get(ACCESS_COOKIE_NAME)?.value

  if (accessToken == null || accessToken.length === 0)
    return false

  const tokenExp = decodeTokenExp(accessToken)

  if (tokenExp === null)
    return false

  return Date.now() + TOKEN_EXPIRY_SKEW_MS < tokenExp * 1000
}

function setAccessTokenCookie(response: NextResponse, accessToken: string) {
  const tokenExp = decodeTokenExp(accessToken)
  const nowInSeconds = Math.floor(Date.now() / 1000)

  response.cookies.set({
    name: ACCESS_COOKIE_NAME,
    value: accessToken,
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    secure: getEnv('NODE_ENV') === 'production',
    ...(typeof tokenExp === 'number' && tokenExp > nowInSeconds
      ? { maxAge: tokenExp - nowInSeconds }
      : {}),
  })
}

function clearAuthCookies(response: NextResponse) {
  response.cookies.delete(ACCESS_COOKIE_NAME)
  response.cookies.delete(REFRESH_COOKIE_NAME)
}

async function refreshAccessToken(request: NextRequest): Promise<string | null> {
  const refreshToken = request.cookies.get(REFRESH_COOKIE_NAME)?.value

  if (refreshToken == null || refreshToken.length === 0)
    return null

  const response = await fetch(`${getApiBaseUrl()}/auth/refresh`, {
    method: 'POST',
    cache: 'no-store',
    headers: {
      cookie: request.headers.get('cookie') ?? '',
    },
  })

  if (!response.ok)
    return null

  const payload = await response.json().catch(() => null) as { accessToken?: unknown } | null

  if (payload == null || typeof payload.accessToken !== 'string' || payload.accessToken.length === 0)
    return null

  return payload.accessToken
}

function createLoginRedirect(request: NextRequest) {
  const loginUrl = new URL(LOGIN_PATH, request.url)
  const response = NextResponse.redirect(loginUrl)

  clearAuthCookies(response)

  return response
}

export async function proxy(request: NextRequest) {
  const isAuthPage = request.nextUrl.pathname === LOGIN_PATH || request.nextUrl.pathname === REGISTER_PATH
  const isAuthenticated = hasValidAccessToken(request)

  if (isAuthenticated) {
    if (isAuthPage)
      return NextResponse.redirect(new URL(HOME_PATH, request.url))

    return NextResponse.next()
  }

  const refreshedAccessToken = await refreshAccessToken(request)

  if (refreshedAccessToken == null || refreshedAccessToken.length === 0) {
    if (isAuthPage) {
      const response = NextResponse.next()

      clearAuthCookies(response)

      return response
    }

    return createLoginRedirect(request)
  }

  if (isAuthPage) {
    const response = NextResponse.redirect(new URL(HOME_PATH, request.url))

    setAccessTokenCookie(response, refreshedAccessToken)

    return response
  }

  const response = NextResponse.next()

  setAccessTokenCookie(response, refreshedAccessToken)

  return response
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)',
  ],
}
