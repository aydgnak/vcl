import type { RegisterValidationMessage } from './auth/register'
import type { UpdateValidationMessage } from './common'
import type { EmailValidationMessage } from './common/email'
import type { PasswordValidationMessage } from './common/password'

export type ValidationMessage
  = | EmailValidationMessage
    | PasswordValidationMessage
    | RegisterValidationMessage
    | UpdateValidationMessage
