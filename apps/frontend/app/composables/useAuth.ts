interface AuthUser {
  uuid: string
  email: string
}

export function useAuth() {
  const user = useState<AuthUser | null>('auth-user', () => null)
  const { public: { apiBaseUrl } } = useRuntimeConfig()

  const isLoggedIn = computed(() => user.value !== null)

  async function login(email: string, password: string) {
    const data = await $fetch<{ accessToken: string, refreshToken: string }>(`${apiBaseUrl}/auth/login`, {
      method: 'POST',
      body: { email, password },
      credentials: 'include',
    })

    await fetchUser()

    return data
  }

  async function fetchUser() {
    try {
      const data = await $fetch<AuthUser>(`${apiBaseUrl}/auth/me`, {
        credentials: 'include',
      })

      user.value = data
    }
    catch {
      user.value = null
    }
  }

  async function refresh() {
    try {
      await $fetch(`${apiBaseUrl}/auth/refresh`, {
        method: 'POST',
        credentials: 'include',
      })

      await fetchUser()
    }
    catch {
      user.value = null
    }
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
    fetchUser,
    refresh,
    logout,
  }
}
