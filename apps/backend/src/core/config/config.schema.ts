import type { InferOutput } from 'valibot'
import { intersect } from 'valibot'
import { commonSchema } from './common'
import { databaseSchema } from './database'

export const configSchema = intersect([
  commonSchema,
  databaseSchema,
])

export type ConfigSchema = InferOutput<typeof configSchema>
