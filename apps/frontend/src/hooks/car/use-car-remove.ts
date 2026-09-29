import { useSWRConfig } from 'swr'
import useSWRMutation from 'swr/mutation'
import { api } from '@/lib/api'

export function useCarRemove() {
  const { mutate } = useSWRConfig()

  return useSWRMutation<void, Error, '/car', string>(
    '/car',
    async (url, { arg: uuid }) => {
      const detailKey = `${url}/${uuid}`

      await api.delete(detailKey)

      await Promise.all([
        mutate(detailKey, undefined, { revalidate: false }),
        mutate(key => typeof key === 'string' && key.startsWith('/car?')),
      ])
    },
    { revalidate: false },
  )
}
