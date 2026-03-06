import { t } from '@utils/t'
import { email, pipe, string } from 'valibot'

export const emailSchema = pipe(
  string(t('shared.required')),
  email(t('auth.email')),
)
