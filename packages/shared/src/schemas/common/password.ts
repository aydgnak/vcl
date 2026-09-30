import { validationMessages } from '@schemas/messages'
import { minLength, pipe, regex } from 'valibot'
import { requiredStringSchema } from './required-string'

export const passwordSchema = pipe(
  requiredStringSchema,
  minLength(
    10,
    issue =>
      issue.input.length === 0
        ? validationMessages.required
        : validationMessages.password.minLength,
  ),
  regex(/\d/, validationMessages.password.digit),
  regex(
    /[\x21-\x2F\x3A-\x40\x5B-\x60\x7B-\x7E]/,
    validationMessages.password.specialCharacter,
  ),
)
