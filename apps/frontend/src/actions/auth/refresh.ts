'use server'

import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { REFRESH_TOKEN_COOKIE_NAME } from '@/lib/constants'

export async function refreshAction(request: NextRequest) {
  const { cookies, nextUrl: { pathname }, url } = request

  const refreshToken = cookies.get(REFRESH_TOKEN_COOKIE_NAME)
  if (refreshToken === undefined) {
    return false
  }

  const refreshResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh`, {
    method: 'POST',
    headers: {
      Cookie: `${REFRESH_TOKEN_COOKIE_NAME}=${refreshToken.value}`,
    },
  })

  if (!refreshResponse.ok || refreshResponse.status !== 204) {
    return false
  }

  const setCookies = refreshResponse.headers.getSetCookie()

  const response = pathname === '/'
    ? NextResponse.redirect(new URL('/dashboard', url))
    : NextResponse.next()

  for (const setCookie of setCookies) {
    response.headers.append('Set-Cookie', setCookie)
  }

  return response
}
