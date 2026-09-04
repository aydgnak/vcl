import { minLength, pipe, regex, string } from 'valibot'

const passwordValidationMessage = {
  minLength: 'validation.password.minLength',
  digit: 'validation.password.digit',
  specialCharacter: 'validation.password.specialCharacter',
} as const

export type PasswordValidationMessage = typeof passwordValidationMessage[keyof typeof passwordValidationMessage]

export const passwordSchema = pipe(
  string(),
  minLength(10, passwordValidationMessage.minLength),
  regex(/\d/, passwordValidationMessage.digit),
  regex(/[\x21-\x2F\x3A-\x40\x5B-\x60\x7B-\x7E]/, passwordValidationMessage.specialCharacter),
)
