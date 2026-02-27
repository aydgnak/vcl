// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      apiBaseUrl: '',
    },
  },
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
  ],
  eslint: {
    config: {
      standalone: false,
    },
  },
  css: [
    '~/assets/css/main.css',
  ],
})
