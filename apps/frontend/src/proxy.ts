import type { Route } from 'next'
import type { NextRequest, ProxyConfig } from 'next/server'
import { NextResponse } from 'next/server'
import { refreshAction, validateAction } from '@/actions/auth'
import { ACCESS_TOKEN_COOKIE_NAME, REFRESH_TOKEN_COOKIE_NAME } from '@/lib/constants'

export const config: ProxyConfig = {
  matcher: [
    '/((?!api|_next/static|_next/image|images|favicon.ico).*)',
  ],
}

const publicRoutes = new Set<string>(
  [
    '/login',
    '/register',
  ] satisfies Route[],
)

export async function proxy(request: NextRequest) {
  const { nextUrl: { pathname }, url, cookies } = request

  const isPublicRoute = publicRoutes.has(pathname)
  const hasAccessToken = cookies.has(ACCESS_TOKEN_COOKIE_NAME)

  if (hasAccessToken) {
    const isValid = await validateAction(request)

    if (isValid) {
      if (isPublicRoute || pathname === '/') {
        return redirectToDashboard(url)
      }

      return NextResponse.next()
    }
  }

  const refreshedCookies = await refreshAction(request)

  if (refreshedCookies !== false) {
    const response = isPublicRoute || pathname === '/'
      ? redirectToDashboard(url)
      : NextResponse.next()

    setCookies(response, refreshedCookies)

    return response
  }

  if (isPublicRoute) {
    return NextResponse.next()
  }

  return redirectToLogin(request, true)
}

function redirectToDashboard(url: string) {
  return NextResponse.redirect(new URL('/dashboard', url))
}

function redirectToLogin(request: NextRequest, clearCookies = false) {
  const redirect = `${request.nextUrl.pathname}${request.nextUrl.search}`

  const loginUrl = new URL('/login', request.url)
  loginUrl.searchParams.set('redirect', redirect)

  const response = NextResponse.redirect(loginUrl)

  if (clearCookies) {
    response.cookies.delete(ACCESS_TOKEN_COOKIE_NAME)
    response.cookies.delete(REFRESH_TOKEN_COOKIE_NAME)
  }

  return response
}

function setCookies(response: NextResponse, cookies: string[]) {
  for (const cookie of cookies) {
    response.headers.append('Set-Cookie', cookie)
  }
}
