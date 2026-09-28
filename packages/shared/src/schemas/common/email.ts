import { email, pipe, string, trim } from 'valibot'

const emailValidationMessage = {
  email: 'validation.email',
} as const

export type EmailValidationMessage = typeof emailValidationMessage[keyof typeof emailValidationMessage]

export const emailSchema = pipe(
  string(),
  trim(),
  email(emailValidationMessage.email),
)
