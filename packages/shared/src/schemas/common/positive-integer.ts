import { validationMessages } from '@schemas/messages'
import {
  message,
  minValue,
  number,
  optional,
  pipe,
  regex,
  safeInteger,
  string,
  toNumber,
  union,
} from 'valibot'

export const positiveIntegerSchema = message(
  pipe(
    union([
      number(),
      pipe(
        string(),
        regex(/^[1-9]\d*$/),
        toNumber(),
      ),
    ]),
    safeInteger(),
    minValue(1),
  ),
  validationMessages.positiveInteger,
)

export function optionalPositiveIntegerSchema(defaultValue: number) {
  return optional(positiveIntegerSchema, defaultValue)
}
