import type { StringValue } from 'ms'
import type { InferOutput } from 'valibot'
import ms from 'ms'
import { custom, object, pipe, string } from 'valibot'

const msString = pipe(string(), custom<StringValue>((input) => {
  if (typeof input !== 'string') {
    return false
  }

  try {
    const parse = ms(input as StringValue)
    if (typeof parse !== 'number') {
      return false
    }

    return true
  }
  catch {
    return false
  }
}, issue => `Must be a valid ms string, received "${String(issue.input)}"`))

export const jwtSchema = object({
  JWT_ACCESS_SECRET: string(),
  JWT_ACCESS_EXPIRES_IN: msString,
  JWT_REFRESH_SECRET: string(),
  JWT_REFRESH_EXPIRES_IN: msString,
})

export type JwtO = InferOutput<typeof jwtSchema>
