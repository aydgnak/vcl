import type { InferInput, InferOutput } from 'valibot'
import { emailSchema, passwordSchema } from '@app/common'
import { object } from 'valibot'

export const loginSchema = object({
  email: emailSchema,
  password: passwordSchema,
})

export type LoginI = InferInput<typeof loginSchema>
export type LoginO = InferOutput<typeof loginSchema>
