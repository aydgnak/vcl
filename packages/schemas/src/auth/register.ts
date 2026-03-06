import type { InferInput, InferOutput } from 'valibot'
import { object } from 'valibot'
import { emailSchema } from './email'
import { passwordSchema } from './password'

export const registerSchema = object({
  email: emailSchema,
  password: passwordSchema,
})

export type RegisterI = InferInput<typeof registerSchema>
export type RegisterO = InferOutput<typeof registerSchema>
