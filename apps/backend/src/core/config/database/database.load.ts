import type { DatabaseO } from './database.schema'
import { env } from 'node:process'
import { registerAs } from '@nestjs/config'

export default registerAs('database', (): DatabaseO => ({
  DATABASE_URL: env.DATABASE_URL,
}))
