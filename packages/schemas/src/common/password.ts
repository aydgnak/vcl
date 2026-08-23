import { minLength, pipe, regex, string } from 'valibot'

export const passwordSchema = pipe(
  string(),
  minLength(10),
  regex(/\d/, 'Password must contain at least one digit'),
  regex(/[\x21-\x2F\x3A-\x40\x5B-\x60\x7B-\x7E]/, 'Password must contain at least one special character'),
)
