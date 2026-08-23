import { email, pipe, string, trim } from 'valibot'

export const emailSchema = pipe(
  string(),
  trim(),
  email(),
)
