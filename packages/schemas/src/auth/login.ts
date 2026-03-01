import type { InferInput, InferOutput } from 'valibot'
import { email, minLength, object, pipe, string } from 'valibot'

export const loginSchema = object({
  email: pipe(string(), email()),
  password: pipe(string(), minLength(3)),
})

export type LoginI = InferInput<typeof loginSchema>
export type LoginO = InferOutput<typeof loginSchema>
