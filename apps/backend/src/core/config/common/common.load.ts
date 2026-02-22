import type { CommonO } from './common.schema'
import { env } from 'node:process'
import { registerAs } from '@nestjs/config'

export default registerAs('common', (): CommonO => ({
  PORT: env.PORT,
  NODE_ENV: env.NODE_ENV,
}))
