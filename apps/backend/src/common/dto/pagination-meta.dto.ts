import type { PaginationMetaR } from 'shared/types'
import { Expose } from 'class-transformer'

export class PaginationMetaDto implements PaginationMetaR {
  @Expose()
  page: number

  @Expose()
  limit: number

  @Expose()
  total: number

  @Expose()
  totalPages: number
}
