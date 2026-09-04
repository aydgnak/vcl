import type { Route } from 'next'
import type { NextRequest, ProxyConfig } from 'next/server'
import { NextResponse } from 'next/server'
import { ACCESS_TOKEN_COOKIE_NAME } from '@/lib/constants'
import { isValidAccessToken, redirectToLogin } from '@/lib/proxy-auth'

export const config: ProxyConfig = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}

const publicRoutes = new Set<string>(
  [
    '/login',
    '/register',
  ] satisfies Route[],
)

export async function proxy(request: NextRequest) {
  const accessToken = request.cookies.get(ACCESS_TOKEN_COOKIE_NAME)
  const { pathname, origin } = request.nextUrl

  const isPublicRoute = publicRoutes.has(pathname)

  if (!accessToken && !isPublicRoute) {
    return redirectToLogin(request)
  }

  if (accessToken && !await isValidAccessToken(accessToken.value)) {
    if (isPublicRoute) {
      const response = NextResponse.next()
      response.cookies.delete(ACCESS_TOKEN_COOKIE_NAME)

      return response
    }

    return redirectToLogin(request, true)
  }

  if (accessToken && (isPublicRoute || pathname === '/')) {
    return NextResponse.redirect(
      new URL('/dashboard', origin),
    )
  }

  return NextResponse.next()
}
