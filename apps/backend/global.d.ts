import type { PayloadType } from '@app/auth'
import type { ConfigSchema } from './src/core/config'

declare global {
  namespace NodeJS {
    interface ProcessEnv extends ConfigSchema {}
  }
}

declare module 'express' {
  interface Request {
    user: PayloadType
    cookies: Record<string, string | undefined>
  }
}

export {}
