import type { InferOutput } from 'valibot'
import { object, string } from 'valibot'

export const jwtSchema = object({
  JWT_ACCESS_TOKEN_SECRET: string(),
  JWT_ACCESS_TOKEN_EXPIRES_IN: string(),
  JWT_REFRESH_TOKEN_SECRET: string(),
  JWT_REFRESH_TOKEN_EXPIRES_IN: string(),
})

export type JwtO = InferOutput<typeof jwtSchema>
