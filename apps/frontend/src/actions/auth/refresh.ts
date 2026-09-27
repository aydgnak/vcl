'use server'

import type { NextRequest } from 'next/server'
import { REFRESH_TOKEN_COOKIE_NAME } from '@/lib/constants'

export async function refreshAction(request: NextRequest) {
  const refreshToken = request.cookies.get(REFRESH_TOKEN_COOKIE_NAME)

  if (refreshToken === undefined) {
    return false
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh`, {
    method: 'POST',
    headers: {
      Cookie: `${REFRESH_TOKEN_COOKIE_NAME}=${refreshToken.value}`,
    },
  })

  if (response.status !== 204) {
    return false
  }

  return response.headers.getSetCookie()
}
