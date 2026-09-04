import type { NextRequest } from 'next/server'
import { env } from 'node:process'
import { importSPKI, jwtVerify } from 'jose'
import { NextResponse } from 'next/server'
import { ACCESS_TOKEN_COOKIE_NAME } from './constants'

let publicKey: ReturnType<typeof importSPKI> | undefined

async function getPublicKey() {
  const encodedPublicKey = env.JWT_ACCESS_TOKEN_PUBLIC_KEY

  if (encodedPublicKey === undefined || encodedPublicKey === '') {
    throw new Error('JWT_ACCESS_TOKEN_PUBLIC_KEY is required')
  }

  publicKey ??= importSPKI(atob(encodedPublicKey), 'RS256')

  return publicKey
}

export function redirectToLogin(request: NextRequest, clearAccessToken = false) {
  const response = NextResponse.redirect(new URL('/login', request.nextUrl.origin))

  if (clearAccessToken) {
    response.cookies.delete(ACCESS_TOKEN_COOKIE_NAME)
  }

  return response
}

export async function isValidAccessToken(accessToken: string) {
  const key = await getPublicKey()

  try {
    await jwtVerify(accessToken, key, {
      algorithms: ['RS256'],
      requiredClaims: ['sub', 'exp'],
    })

    return true
  }
  catch {
    return false
  }
}
