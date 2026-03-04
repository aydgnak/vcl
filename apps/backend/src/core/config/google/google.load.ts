import type { GoogleO } from './google.schema'
import { env } from 'node:process'
import { registerAs } from '@nestjs/config'

export default registerAs('google', (): GoogleO => ({
  GOOGLE_CLIENT_ID: env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: env.GOOGLE_CLIENT_SECRET,
  GOOGLE_CALLBACK_URL: env.GOOGLE_CALLBACK_URL,
}))
