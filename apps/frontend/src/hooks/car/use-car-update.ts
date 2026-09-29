import type { UpdateCarI } from 'shared/schemas'
import type { CarR } from 'shared/types'
import { useSWRConfig } from 'swr'
import useSWRMutation from 'swr/mutation'
import { api } from '@/lib/api'

interface UpdateCarArg {
  uuid: string
  data: UpdateCarI
}

export function useCarUpdate() {
  const { mutate } = useSWRConfig()

  return useSWRMutation<CarR, Error, '/car', UpdateCarArg>(
    '/car',
    async (url, { arg }) => {
      const detailKey = `${url}/${arg.uuid}`
      const { data } = await api.patch<CarR>(detailKey, arg.data)

      await Promise.all([
        mutate(detailKey, data, { revalidate: false }),
        mutate(key => typeof key === 'string' && key.startsWith('/car?')),
      ])

      return data
    },
    { revalidate: false },
  )
}
