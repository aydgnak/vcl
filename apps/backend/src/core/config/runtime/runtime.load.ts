import type { RuntimeO } from './runtime.schema'
import { env } from 'node:process'
import { registerAs } from '@nestjs/config'

export default registerAs('runtime', (): RuntimeO => ({
  PORT: env.PORT,
  NODE_ENV: env.NODE_ENV,
}))
