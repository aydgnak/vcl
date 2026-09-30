import type { InferInput, InferOutput } from 'valibot'
import { requiredStringSchema } from '@schemas/common'
import { validationMessages } from '@schemas/messages'
import {
  integer,
  maxLength,
  maxValue,
  minEntries,
  minLength,
  minValue,
  object,
  partial,
  pipe,
  toNumber,
  toUpperCase,
  transform,
  trim,
} from 'valibot'

const carSchema = object({
  plate: pipe(
    requiredStringSchema,
    transform(value => value.replace(/\s+/g, '')),
    toUpperCase(),
    minLength(1, validationMessages.required),
    maxLength(32, validationMessages.car.plate.maxLength),
  ),

  brand: pipe(
    requiredStringSchema,
    trim(),
    minLength(1, validationMessages.required),
  ),

  model: pipe(
    requiredStringSchema,
    trim(),
    minLength(1, validationMessages.required),
  ),

  modelYear: pipe(
    requiredStringSchema,
    trim(),
    minLength(1, validationMessages.required),
    toNumber(validationMessages.car.modelYear.number),
    integer(validationMessages.car.modelYear.integer),
    minValue(1900, validationMessages.car.modelYear.minValue),
    maxValue(2100, validationMessages.car.modelYear.maxValue),
  ),
}, validationMessages.type.object)

export const createCarSchema = carSchema
export type CreateCarI = InferInput<typeof createCarSchema>
export type CreateCarO = InferOutput<typeof createCarSchema>

export const updateCarSchema = pipe(
  partial(carSchema),
  minEntries(1, validationMessages.emptyUpdate),
)
export type UpdateCarI = InferInput<typeof updateCarSchema>
export type UpdateCarO = InferOutput<typeof updateCarSchema>
