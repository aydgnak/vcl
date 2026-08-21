import type { InferOutput } from 'valibot'
import { object, pipe, string, url } from 'valibot'

export const databaseSchema = object({
  DATABASE_URL: pipe(string(), url()),
})

export type DatabaseO = InferOutput<typeof databaseSchema>
