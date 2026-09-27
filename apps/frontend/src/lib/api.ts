import type { InternalAxiosRequestConfig } from 'axios'
import axios, { HttpStatusCode, isAxiosError } from 'axios'

interface RetryableRequestConfig extends InternalAxiosRequestConfig {
  retry?: boolean
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

let isRefreshing = false
let failedQueue: Array<{
  resolve: () => void
  reject: (error: unknown) => void
}> = []

function processQueue(error?: unknown) {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error !== undefined) {
      reject(error)
    }
    else {
      resolve()
    }
  })

  failedQueue = []
}

api.interceptors.response.use(
  response => response,
  async (error) => {
    if (
      !isAxiosError(error)
      || error.response?.status !== HttpStatusCode.Unauthorized
      || !error.config
    ) {
      return Promise.reject(error)
    }

    const originalRequest = error.config as RetryableRequestConfig

    if (originalRequest.retry) {
      return Promise.reject(error)
    }

    originalRequest.retry = true

    if (isRefreshing) {
      return new Promise<void>((resolve, reject) => {
        failedQueue.push({ resolve, reject })
      }).then(async () => api(originalRequest))
    }

    isRefreshing = true

    try {
      await axios.post('/auth/refresh', undefined, {
        baseURL: api.defaults.baseURL,
        withCredentials: true,
      })
    }
    catch (refreshError) {
      isRefreshing = false
      processQueue(refreshError)

      if (typeof window !== 'undefined') {
        const redirect = `${window.location.pathname}${window.location.search}`

        const loginUrl = new URL('/login', window.location.origin)
        loginUrl.searchParams.set('redirect', redirect)

        window.location.replace(loginUrl)
      }

      throw refreshError
    }

    isRefreshing = false
    processQueue()

    return api(originalRequest)
  },
)

export {
  api,
}
