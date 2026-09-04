import type { InferInput, InferOutput } from 'valibot'
import { emailSchema, passwordSchema } from '@app/common'
import { forward, object, partialCheck, pipe } from 'valibot'

const registerValidationMessage = {
  passwordsMismatch: 'validation.passwordsMismatch',
} as const

export type RegisterValidationMessage = typeof registerValidationMessage[keyof typeof registerValidationMessage]

export const registerSchema = pipe(
  object({
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: passwordSchema,
  }),
  forward(
    partialCheck(
      [['password'], ['confirmPassword']],
      input => input.password === input.confirmPassword,
      registerValidationMessage.passwordsMismatch,
    ),
    ['confirmPassword'],
  ),
)

export type RegisterI = InferInput<typeof registerSchema>
export type RegisterO = InferOutput<typeof registerSchema>
