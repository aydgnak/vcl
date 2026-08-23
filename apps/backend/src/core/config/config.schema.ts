import type { InferOutput } from 'valibot'
import { intersect } from 'valibot'
import { databaseSchema } from './database'
import { jwtSchema } from './jwt'
import { redisSchema } from './redis'
import { runtimeSchema } from './runtime'

export const configSchema = intersect([
  runtimeSchema,
  databaseSchema,
  redisSchema,
  jwtSchema,
])

export type ConfigO = InferOutput<typeof configSchema>
