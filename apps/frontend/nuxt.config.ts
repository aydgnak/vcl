// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxtjs/i18n',
  ],
  eslint: {
    config: {
      standalone: false,
    },
  },
  css: [
    '~/assets/css/main.css',
  ],
  i18n: {
    langDir: '../locales',
    locales: [
      { code: 'en', name: 'English', file: 'en.json' },
      { code: 'tr', name: 'Türkçe', file: 'tr.json' },
    ],
    defaultLocale: 'tr',
    strategy: 'no_prefix',
    detectBrowserLanguage: {
      cookieKey: 'locale',
    },
  },
})
