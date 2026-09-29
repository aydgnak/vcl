import {
  minValue,
  number,
  optional,
  pipe,
  regex,
  safeInteger,
  string,
  transform,
  union,
} from 'valibot'

export const positiveIntegerSchema = pipe(
  union([
    number(),
    pipe(
      string(),
      regex(/^[1-9]\d*$/),
      transform(Number),
    ),
  ]),
  number(),
  safeInteger(),
  minValue(1),
)

export function optionalPositiveIntegerSchema(defaultValue: number) {
  return optional(positiveIntegerSchema, defaultValue)
}
