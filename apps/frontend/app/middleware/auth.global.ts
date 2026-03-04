export default defineNuxtRouteMiddleware(async (to) => {
  const { isLoggedIn, refresh } = useAuth()

  if (to.path === '/login') {
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
