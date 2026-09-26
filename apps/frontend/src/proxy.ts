import type { Route } from 'next'
import type { NextRequest, ProxyConfig } from 'next/server'
import { NextResponse } from 'next/server.js'
import { logoutAction, refreshAction, validateAction } from './actions/auth'
import { ACCESS_TOKEN_COOKIE_NAME } from './lib/constants'

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
  const accessToken = cookies.has(ACCESS_TOKEN_COOKIE_NAME)

  if (!accessToken && !isPublicRoute) {
    const refresh = await refreshAction(request)

    if (refresh !== false) {
      return refresh
    }

    return redirectToLogin(url)
  }

  if (accessToken && (isPublicRoute || pathname === '/')) {
    const validate = await validateAction(request)

    if (!validate) {
      await logoutAction(false)
      return redirectToLogin(url)
    }

    return NextResponse.redirect(new URL('/dashboard', url))
  }

  return NextResponse.next()
}

function redirectToLogin(url: string) {
  return NextResponse.redirect(new URL('/login', url))
}
