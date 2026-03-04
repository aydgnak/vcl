import type { InferOutput } from 'valibot'
import { intersect } from 'valibot'
import { commonSchema } from './common'
import { databaseSchema } from './database'
import { googleSchema } from './google'
import { jwtSchema } from './jwt'

export const configSchema = intersect([
  commonSchema,
  databaseSchema,
  jwtSchema,
  googleSchema,
])

export type ConfigSchema = InferOutput<typeof configSchema>
