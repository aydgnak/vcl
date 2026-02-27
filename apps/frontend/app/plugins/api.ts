import type { FetchOptions } from 'ofetch'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const baseURL = config.public.apiBaseUrl

  let isRefreshing = false
  let refreshQueue: Array<{
    resolve: (value: void) => void
    reject: (reason: unknown) => void
  }> = []

  function processQueue(error: unknown = null): void {
    for (const { resolve, reject } of refreshQueue) {
      if (error !== null) {
        reject(error)
      }
      else {
        resolve()
      }
    }
    refreshQueue = []
  }

  async function refreshAccessToken(): Promise<void> {
    await $fetch('/auth/refresh', {
      baseURL,
      method: 'POST',
      credentials: 'include',
    })
  }

  async function retryRequest(url: string, options: FetchOptions): Promise<unknown> {
    return $fetch.raw(url, {
      ...(options as Parameters<typeof $fetch.raw>[1]),
      baseURL,
      credentials: 'include',
    })
  }

  const api = $fetch.create({
    baseURL,
    credentials: 'include',

    async onResponseError({ response, options }): Promise<void> {
      if (response.status !== 401) {
        return
      }

      const responseUrl = response.url ?? ''
      const base = options.baseURL ?? ''
      const path = base.length > 0 ? responseUrl.replace(base, '') : responseUrl

      if (path.startsWith('/auth/refresh') || path.startsWith('/auth/login')) {
        return
      }

      if (isRefreshing) {
        await new Promise<void>((resolve, reject) => {
          refreshQueue.push({ resolve, reject })
        })
        await retryRequest(responseUrl, options as FetchOptions)
        return
      }

      isRefreshing = true

      try {
        await refreshAccessToken()

        processQueue()

        await retryRequest(responseUrl, options as FetchOptions)
      }
      catch (refreshError: unknown) {
        processQueue(refreshError)

        if (import.meta.client) {
          await navigateTo('/login')
        }

        throw refreshError
      }
      finally {
        isRefreshing = false
      }
    },
  })

  return {
    provide: {
      api,
    },
  }
})
