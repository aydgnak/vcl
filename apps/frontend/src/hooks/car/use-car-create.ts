import type { AxiosError } from 'axios'
import type { CreateCarI } from 'shared/schemas'
import type { ApiErrorR, CarR } from 'shared/types'
import { useSWRConfig } from 'swr'
import useSWRMutation from 'swr/mutation'
import { api } from '@/lib/api'

export function useCarCreate() {
  const { mutate } = useSWRConfig()

  return useSWRMutation<CarR, AxiosError<ApiErrorR>, '/car', CreateCarI>(
    '/car',
    async (url, { arg }) => {
      const { data } = await api.post<CarR>(url, arg)

      await mutate(key => typeof key === 'string' && key.startsWith('/car?'))

      return data
    },
    { revalidate: false },
  )
}
