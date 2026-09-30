import { validationMessages } from '@schemas/messages'
import { email, pipe, trim } from 'valibot'
import { requiredStringSchema } from './required-string'

export const emailSchema = pipe(
  requiredStringSchema,
  trim(),
  email(issue =>
    issue.input.length === 0
      ? validationMessages.required
      : validationMessages.email,
  ),
)
