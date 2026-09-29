import type { CarR } from 'shared/types'
import useSWR from 'swr'
import { api } from '@/lib/api'

export function useCarFindOne(uuid?: string) {
  const key = uuid !== undefined && uuid.length > 0 ? `/car/${uuid}` : null

  return useSWR<CarR, Error, string | null>(key, async (url: string) => {
    const { data } = await api.get<CarR>(url)

    return data
  })
}
