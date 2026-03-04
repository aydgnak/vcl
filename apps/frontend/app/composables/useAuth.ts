interface AuthUser {
  uuid: string
  email: string
}

interface LoginResponse {
  accessToken: string
  refreshToken: string
  user: AuthUser
}

interface RefreshResponse {
  accessToken: string
  user: AuthUser
}

function isAuthUser(data: unknown): data is AuthUser {
  if (typeof data !== 'object' || data === null) {
    return false
  }

  const user = data as Partial<AuthUser>

  return typeof user.uuid === 'string'
    && user.uuid.length > 0
    && typeof user.email === 'string'
    && user.email.length > 0
}

export function useAuth() {
  const user = useState<AuthUser | null>('auth-user', () => null)
  const { public: { apiBaseUrl } } = useRuntimeConfig()

  const isLoggedIn = computed(() => {
    if (user.value === null) {
      return false
    }

    return user.value.uuid.length > 0 && user.value.email.length > 0
  })

  async function login(email: string, password: string) {
    const data = await $fetch<LoginResponse>(`${apiBaseUrl}/auth/login`, {
      method: 'POST',
      body: { email, password },
      credentials: 'include',
    })

    user.value = isAuthUser(data.user) ? data.user : null

    return data
  }

  async function refresh() {
    try {
      const headers = import.meta.server ? useRequestHeaders(['cookie']) : undefined

      const data = await $fetch<RefreshResponse>(`${apiBaseUrl}/auth/refresh`, {
        method: 'POST',
        credentials: 'include',
        cache: 'no-store',
        headers: {
          ...headers,
          'cache-control': 'no-cache',
          'pragma': 'no-cache',
        },
      })

      user.value = isAuthUser(data.user) ? data.user : null
    }
    catch {
      user.value = null
    }

    return user.value
  }

  async function logout() {
    try {
      await $fetch(`${apiBaseUrl}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      })
    }
    finally {
      user.value = null
    }
  }

  return {
    user,
    isLoggedIn,
    login,
    refresh,
    logout,
  }
}
