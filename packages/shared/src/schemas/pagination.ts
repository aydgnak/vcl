import type { InferOutput } from 'valibot'
import { optionalPositiveIntegerSchema } from '@schemas/common'
import { maxValue, object, pipe } from 'valibot'

export const paginationSchema = object({
  page: optionalPositiveIntegerSchema(1),
  limit: pipe(optionalPositiveIntegerSchema(20), maxValue(100)),
})

export type PaginationO = InferOutput<typeof paginationSchema>
