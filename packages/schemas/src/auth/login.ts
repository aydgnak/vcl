import type { InferInput, InferOutput } from 'valibot'
import { t } from '@utils/t'
import { email, minLength, object, pipe, string } from 'valibot'

export const loginSchema = object({
  email: pipe(
    string(t('shared.required')),
    email(t('auth.email')),
  ),
  password: pipe(
    string(t('shared.required')),
    minLength(3, t('shared.minLength')),
  ),
})

export type LoginI = InferInput<typeof loginSchema>
export type LoginO = InferOutput<typeof loginSchema>
