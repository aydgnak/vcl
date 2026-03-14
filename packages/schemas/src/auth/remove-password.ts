import type { InferInput, InferOutput } from 'valibot'
import { object } from 'valibot'
import { currentPasswordSchema } from './current-password'

export const removePasswordSchema = object({
  currentPassword: currentPasswordSchema,
})

export type RemovePasswordI = InferInput<typeof removePasswordSchema>
export type RemovePasswordO = InferOutput<typeof removePasswordSchema>
