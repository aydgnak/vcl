import { setGlobalConfig } from 'valibot'
import '@valibot/i18n/tr'

export default defineNuxtPlugin(() => {
  const i18n = useNuxtApp().$i18n
  const locale = i18n.locale

  setGlobalConfig({ lang: locale.value })

  watch(locale, (newLocale) => {
    setGlobalConfig({ lang: newLocale })
  })
})
