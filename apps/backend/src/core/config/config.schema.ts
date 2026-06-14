import type { InferOutput } from 'valibot'
import { intersect } from 'valibot'
import { runtimeSchema } from './runtime'

export const envSchema = intersect([
  runtimeSchema,
])

export type EnvSchema = InferOutput<typeof envSchema>
