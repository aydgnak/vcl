import type { InferOutput } from 'valibot'
import { intersect } from 'valibot'
import { commonSchema } from './common'
import { databaseSchema } from './database'
import { jwtSchema } from './jwt'

export const configSchema = intersect([
  commonSchema,
  databaseSchema,
  jwtSchema,
])

export type ConfigSchema = InferOutput<typeof configSchema>
