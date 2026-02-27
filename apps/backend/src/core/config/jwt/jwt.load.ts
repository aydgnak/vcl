import type { JwtO } from './jwt.schema'
import { env } from 'node:process'
import { registerAs } from '@nestjs/config'

export default registerAs('jwt', (): JwtO => ({
  JWT_ACCESS_SECRET: env.JWT_ACCESS_SECRET,
  JWT_ACCESS_EXPIRES_IN: env.JWT_ACCESS_EXPIRES_IN,
  JWT_REFRESH_SECRET: env.JWT_REFRESH_SECRET,
  JWT_REFRESH_EXPIRES_IN: env.JWT_REFRESH_EXPIRES_IN,
}))
