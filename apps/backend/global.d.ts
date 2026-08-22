import type { JwtPayload } from '@app/auth'
import type { ConfigO } from '@app/core/config'

declare global {
  namespace NodeJS {
    interface ProcessEnv extends ConfigO {}
  }
}

declare module 'express' {
  interface Request {
    cookies: Record<string, string | undefined>
    user: JwtPayload
  }
}

export {}
