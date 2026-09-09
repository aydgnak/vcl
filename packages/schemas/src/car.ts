import type { InferInput, InferOutput } from 'valibot'
import { updateValidationMessage } from '@app/common'
import {
  integer,
  maxLength,
  maxValue,
  minEntries,
  minLength,
  minValue,
  number,
  object,
  partial,
  pipe,
  string,
  transform,
  trim,
} from 'valibot'

const carSchema = object({
  plate: pipe(
    string(),
    transform(value => value.replace(/\s+/g, '').toUpperCase()),
    minLength(1),
    maxLength(32),
  ),

  brand: pipe(
    string(),
    trim(),
    minLength(1),
  ),

  model: pipe(
    string(),
    trim(),
    minLength(1),
  ),

  modelYear: pipe(
    number(),
    integer(),
    minValue(1900),
    maxValue(2100),
  ),
})

export const createCarSchema = carSchema
export type CreateCarI = InferInput<typeof createCarSchema>
export type CreateCarO = InferOutput<typeof createCarSchema>

export const updateCarSchema = pipe(partial(carSchema), minEntries(1, updateValidationMessage.emptyUpdate))
export type UpdateCarI = InferInput<typeof updateCarSchema>
export type UpdateCarO = InferOutput<typeof updateCarSchema>
