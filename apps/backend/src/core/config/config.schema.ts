import type { InferOutput } from 'valibot'
import { intersect } from 'valibot'
import { commonSchema } from './common'

export const configSchema = intersect([
  commonSchema,
])

export type ConfigSchema = InferOutput<typeof configSchema>
