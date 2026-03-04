import type { InferOutput } from 'valibot'
import { object, pipe, string, url } from 'valibot'

export const googleSchema = object({
  GOOGLE_CLIENT_ID: string(),
  GOOGLE_CLIENT_SECRET: string(),
  GOOGLE_CALLBACK_URL: pipe(string(), url()),
})

export type GoogleO = InferOutput<typeof googleSchema>
