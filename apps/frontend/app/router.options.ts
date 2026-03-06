import type { RouterConfig } from '@nuxt/schema'

const settingsHashPrefix = '#settings/'

export default <RouterConfig>{
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }

    if (to.hash?.startsWith(settingsHashPrefix)) {
      return false
    }

    if (to.hash) {
      return {
        el: to.hash,
        top: 0,
      }
    }

    return {
      top: 0,
    }
  },
}
