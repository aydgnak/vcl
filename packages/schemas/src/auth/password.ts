import { t } from '@utils/t'
import { minLength, pipe, regex, string } from 'valibot'

export const passwordSchema = pipe(
  string(t('shared.required')),
  minLength(8, t('shared.minLength')),
  regex(/\p{Ll}/u, t('auth.passwordLowercase')),
  regex(/\p{Lu}/u, t('auth.passwordUppercase')),
  regex(/\d/, t('auth.passwordNumber')),
  regex(/[^\p{L}\d\s]/u, t('auth.passwordSpecialChar')),
)
