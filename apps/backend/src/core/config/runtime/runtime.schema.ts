import type { InferOutput } from 'valibot'
import { object, picklist, pipe, string, transform } from 'valibot'

export const runtimeSchema = object({
  PORT: pipe(string(), transform(Number)),
  NODE_ENV: picklist(['development', 'production']),
})

export type RuntimeO = InferOutput<typeof runtimeSchema>
