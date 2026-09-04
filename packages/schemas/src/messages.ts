import type { RegisterValidationMessage } from './auth/register'
import type { EmailValidationMessage } from './common/email'
import type { PasswordValidationMessage } from './common/password'

export type ValidationMessage
  = | EmailValidationMessage
    | PasswordValidationMessage
    | RegisterValidationMessage
