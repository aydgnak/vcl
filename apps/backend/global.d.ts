import type { ConfigSchema } from './src/core/config'

declare global {
  namespace NodeJS {
    interface ProcessEnv extends ConfigSchema {}
  }
}

export {}
