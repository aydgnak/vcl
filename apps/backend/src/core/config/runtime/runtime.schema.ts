import type { InferOutput } from 'valibot'
import { object, picklist, pipe, string, transform, url } from 'valibot'

export const runtimeSchema = object({
  PORT: pipe(string(), transform(Number)),
  NODE_ENV: picklist(['development', 'production']),
  CLIENT_ORIGIN: pipe(string(), url()),
})

export type RuntimeO = InferOutput<typeof runtimeSchema>
