'use server'

import type { NextRequest } from 'next/server'
import { ACCESS_TOKEN_COOKIE_NAME } from '@/lib/constants'

export async function validateAction(request: NextRequest) {
  const accessToken = request.cookies.get(ACCESS_TOKEN_COOKIE_NAME)

  if (accessToken === undefined) {
    return false
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/validate`, {
    method: 'GET',
    headers: {
      Cookie: `${ACCESS_TOKEN_COOKIE_NAME}=${accessToken.value}`,
    },
  })

  return response.status === 204
}
