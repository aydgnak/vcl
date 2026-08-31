import type { Route } from 'next'
import type { NextRequest, ProxyConfig } from 'next/server'
import { NextResponse } from 'next/server'

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

export function proxy(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken')
  const { pathname, origin } = request.nextUrl

  const isPublicRoute = publicRoutes.has(pathname)

  if (!accessToken && !isPublicRoute) {
    return NextResponse.redirect(
      new URL('/login', origin),
    )
  }

  if (accessToken && (isPublicRoute || pathname === '/')) {
    return NextResponse.redirect(
      new URL('/dashboard', origin),
    )
  }

  return NextResponse.next()
}
