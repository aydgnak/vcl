import type { ConfigFactory } from '@nestjs/config'
import databaseLoad from './database/database.load'
import jwtLoad from './jwt/jwt.load'
import redisLoad from './redis/redis.load'
import runtimeLoad from './runtime/runtime.load'

export const loads: ConfigFactory[] = [
  runtimeLoad,
  databaseLoad,
  redisLoad,
  jwtLoad,
]
