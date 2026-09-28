import useSWRImmutable from 'swr/immutable'
import { api } from '@/lib/api'

interface CurrentUser {
  name?: string | null
  surname?: string | null
  email: string
}

export function useCurrentUser() {
  return useSWRImmutable('/user/me', async (url) => {
    const { data } = await api.post<CurrentUser>(url)

    return data
  })
}
