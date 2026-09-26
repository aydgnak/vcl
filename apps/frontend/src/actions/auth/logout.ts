'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { ACCESS_TOKEN_COOKIE_NAME, REFRESH_TOKEN_COOKIE_NAME } from '@/lib/constants'

export async function logoutAction(redirectToLogin: boolean = true) {
  const cookieStore = await cookies()

  if (cookieStore.has(ACCESS_TOKEN_COOKIE_NAME)) {
    cookieStore.delete(ACCESS_TOKEN_COOKIE_NAME)
  }

  if (cookieStore.has(REFRESH_TOKEN_COOKIE_NAME)) {
    cookieStore.delete(REFRESH_TOKEN_COOKIE_NAME)
  }

  if (redirectToLogin === true) {
    redirect('/login')
  }
}
