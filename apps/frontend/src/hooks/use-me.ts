import type { MeR } from 'shared/types'
import useSWRImmutable from 'swr/immutable'
import { api } from '@/lib/api'

export function useMe() {
  return useSWRImmutable('/user/me', async (url) => {
    const { data } = await api.post<MeR>(url)

    return data
  })
}
