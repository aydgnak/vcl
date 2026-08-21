import type { InferOutput } from 'valibot'
import { intersect } from 'valibot'
import { databaseSchema } from './database'
import { runtimeSchema } from './runtime'

export const configSchema = intersect([
  runtimeSchema,
  databaseSchema,
])

export type ConfigO = InferOutput<typeof configSchema>
