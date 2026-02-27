import type { ConfigFactory } from '@nestjs/config'
import commonLoad from './common/common.load'
import databaseLoad from './database/database.load'
import jwtLoad from './jwt/jwt.load'

export const configLoads: ConfigFactory[] = [
  commonLoad,
  databaseLoad,
  jwtLoad,
]
