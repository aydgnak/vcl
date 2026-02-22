import type { InferOutput } from 'valibot'
import { object, string } from 'valibot'

export const databaseSchema = object({
  DATABASE_URL: string(),
})

export type DatabaseO = InferOutput<typeof databaseSchema>
