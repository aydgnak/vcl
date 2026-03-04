export default defineNuxtRouteMiddleware(async (to) => {
  const { isLoggedIn, fetchUser } = useAuth()

  if (!isLoggedIn.value) {
    await fetchUser()
  }

  if (isLoggedIn.value && to.path === '/login') {
    return navigateTo('/')
  }

  if (!isLoggedIn.value && to.path !== '/login') {
    return navigateTo('/login')
  }
})
