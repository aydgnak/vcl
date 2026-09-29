import type { CarR, PaginatedR } from 'shared/types'
import useSWR from 'swr'
import { api } from '@/lib/api'

export function useCarFindAll(page = 1, limit = 20) {
  const key = `/car?page=${page}&limit=${limit}` as const

  return useSWR<PaginatedR<CarR>, Error, typeof key>(key, async (url) => {
    const { data } = await api.get<PaginatedR<CarR>>(url)

    return data
  })
}
