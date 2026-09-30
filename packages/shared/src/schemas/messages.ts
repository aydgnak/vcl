export const validationMessages = {
  required: 'validation.required',
  type: {
    string: 'validation.type.string',
    object: 'validation.type.object',
  },
  email: 'validation.email',
  password: {
    minLength: 'validation.password.minLength',
    digit: 'validation.password.digit',
    specialCharacter: 'validation.password.specialCharacter',
    mismatch: 'validation.password.mismatch',
  },
  positiveInteger: 'validation.positiveInteger',
  car: {
    plate: {
      maxLength: 'validation.car.plate.maxLength',
    },
    modelYear: {
      number: 'validation.car.modelYear.number',
      integer: 'validation.car.modelYear.integer',
      minValue: 'validation.car.modelYear.minValue',
      maxValue: 'validation.car.modelYear.maxValue',
    },
  },
  pagination: {
    limit: {
      maxValue: 'validation.pagination.limit.maxValue',
    },
  },
  emptyUpdate: 'validation.emptyUpdate',
} as const

type DeepValue<T> = T extends string
  ? T
  : T extends Record<string, unknown>
    ? DeepValue<T[keyof T]>
    : never

export type ValidationMessage = DeepValue<typeof validationMessages>
