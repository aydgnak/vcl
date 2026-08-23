import type { RedisO } from './redis.schema'
import { env } from 'node:process'
import { registerAs } from '@nestjs/config'

export default registerAs('redis', (): RedisO => ({
  REDIS_URL: env.REDIS_URL,
}))
