import { validationMessages } from '@schemas/messages'
import { string } from 'valibot'

export const requiredStringSchema = string(issue =>
  issue.input == null
    ? validationMessages.required
    : validationMessages.type.string,
)
