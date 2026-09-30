import type { InferInput, InferOutput } from 'valibot'
import { emailSchema, passwordSchema } from '@schemas/common'
import { validationMessages } from '@schemas/messages'
import { object } from 'valibot'

export const loginSchema = object({
  email: emailSchema,
  password: passwordSchema,
}, validationMessages.type.object)

export type LoginI = InferInput<typeof loginSchema>
export type LoginO = InferOutput<typeof loginSchema>
