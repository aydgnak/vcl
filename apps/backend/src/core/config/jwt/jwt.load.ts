import type { JwtO } from './jwt.schema'
import { env } from 'node:process'
import { registerAs } from '@nestjs/config'

export default registerAs('jwt', (): JwtO => ({
  JWT_ACCESS_TOKEN_PRIVATE_KEY: env.JWT_ACCESS_TOKEN_PRIVATE_KEY,
  JWT_ACCESS_TOKEN_PUBLIC_KEY: env.JWT_ACCESS_TOKEN_PUBLIC_KEY,
  JWT_ACCESS_TOKEN_EXPIRES_IN: env.JWT_ACCESS_TOKEN_EXPIRES_IN,
  JWT_REFRESH_TOKEN_SECRET: env.JWT_REFRESH_TOKEN_SECRET,
  JWT_REFRESH_TOKEN_EXPIRES_IN: env.JWT_REFRESH_TOKEN_EXPIRES_IN,
}))
