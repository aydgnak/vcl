import type { InferInput, InferOutput } from 'valibot'
import { object } from 'valibot'
import { currentPasswordSchema } from './current-password'
import { passwordSchema } from './password'

export const updatePasswordSchema = object({
  currentPassword: currentPasswordSchema,
  newPassword: passwordSchema,
})

export type UpdatePasswordI = InferInput<typeof updatePasswordSchema>
export type UpdatePasswordO = InferOutput<typeof updatePasswordSchema>
