import type { InferOutput } from 'valibot'
import { intersect } from 'valibot'
import { runtimeSchema } from './runtime'

export const configSchema = intersect([
  runtimeSchema,
])

export type ConfigO = InferOutput<typeof configSchema>
