import type { InferOutput } from 'valibot'
import { optionalPositiveIntegerSchema } from '@schemas/common'
import { validationMessages } from '@schemas/messages'
import { maxValue, object, pipe } from 'valibot'

export const paginationSchema = object({
  page: optionalPositiveIntegerSchema(1),
  limit: pipe(
    optionalPositiveIntegerSchema(20),
    maxValue(100, validationMessages.pagination.limit.maxValue),
  ),
}, validationMessages.type.object)

export type PaginationO = InferOutput<typeof paginationSchema>
