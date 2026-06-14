import type { EnvSchema } from '@app/core'

declare global {
  namespace NodeJS {
    interface ProcessEnv extends EnvSchema {}
  }
}

export {}
