export interface PaginationMetaR {
  page: number
  limit: number
  total: number
  totalPages: number
}

export interface PaginatedR<T> {
  data: T[]
  meta: PaginationMetaR
}
