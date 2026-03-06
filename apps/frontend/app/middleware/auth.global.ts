export default defineNuxtRouteMiddleware(async (to) => {
  const { isLoggedIn, refresh } = useAuth()
  const authRoutes = new Set(['/login', '/register'])

  if (authRoutes.has(to.path)) {
    if (isLoggedIn.value) {
      return navigateTo('/')
    }

    return
  }

  if (!isLoggedIn.value) {
    await refresh()
  }

  if (!isLoggedIn.value) {
    return navigateTo('/login')
  }
})
