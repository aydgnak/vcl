export default defineNuxtRouteMiddleware(async (to) => {
  const { isLoggedIn, refresh } = useAuth()
  const authRoutes = new Set(['/login', '/register'])

  function hasCookie(name: string) {
    const expected = `${name}=`

    if (import.meta.server) {
      const cookieHeader = useRequestHeaders(['cookie']).cookie

      if (cookieHeader == null || cookieHeader.length === 0) {
        return false
      }

      return cookieHeader
        .split(';')
        .some(cookie => cookie.trim().startsWith(expected))
    }

    return document.cookie
      .split(';')
      .some(cookie => cookie.trim().startsWith(expected))
  }

  async function ensureAuthResolved() {
    if (!isLoggedIn.value) {
      await refresh()
    }
  }

  if (authRoutes.has(to.path)) {
    if (!isLoggedIn.value && hasCookie('refreshToken')) {
      await refresh()
    }

    if (isLoggedIn.value) {
      return navigateTo('/')
    }

    return
  }

  await ensureAuthResolved()

  if (!isLoggedIn.value) {
    return navigateTo('/login')
  }
})
