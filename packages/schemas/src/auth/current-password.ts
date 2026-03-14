import { t } from '@utils/t'
import { minLength, pipe, string } from 'valibot'

export const currentPasswordSchema = pipe(
  string(t('shared.required')),
  minLength(1, t('shared.required')),
)
