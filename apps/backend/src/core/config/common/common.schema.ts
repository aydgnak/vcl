import type { InferOutput } from 'valibot'
import { object, optional, picklist, pipe, string, transform, url } from 'valibot'

export const commonSchema = object({
  PORT: optional(pipe(string(), transform(value => Number(value))), '8000'),
  NODE_ENV: picklist(['development', 'production']),
  CLIENT_URL: pipe(string(), url()),
})

export type CommonO = InferOutput<typeof commonSchema>
