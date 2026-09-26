'use server'

import type { NextRequest } from 'next/server'
import { ACCESS_TOKEN_COOKIE_NAME } from '@/lib/constants'

export async function validateAction(request: NextRequest) {
  const { cookies } = request

  const accessToken = cookies.get(ACCESS_TOKEN_COOKIE_NAME)
  if (accessToken === undefined) {
    return false
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/me`, {
    method: 'POST',
    headers: {
      Cookie: `${ACCESS_TOKEN_COOKIE_NAME}=${accessToken.value}`,
    },
  })

  if (response.ok) {
    return true
  }

  return false
}
