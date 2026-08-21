import type { ConfigO } from '@app/core/config'

declare global {
  namespace NodeJS {
    interface ProcessEnv extends ConfigO {}
  }
}

export {}
