import type { InferInput, InferOutput } from 'valibot'
import { object } from 'valibot'
import { passwordSchema } from './password'

export const setPasswordSchema = object({
  newPassword: passwordSchema,
})

export type SetPasswordI = InferInput<typeof setPasswordSchema>
export type SetPasswordO = InferOutput<typeof setPasswordSchema>
