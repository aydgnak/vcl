<script setup lang="ts">
const { locale, setLocale, t } = useI18n()

type LocaleCode = 'tr' | 'en'

interface LocaleOption {
  code: LocaleCode
  fullLabel: string
}

const localeOptions = computed<LocaleOption[]>(() => [
  {
    code: 'tr',
    fullLabel: t('language.trFull'),
  },
  {
    code: 'en',
    fullLabel: t('language.enFull'),
  },
])

const selectedLocale = computed<LocaleCode>({
  get() {
    return locale.value === 'en' ? 'en' : 'tr'
  },
  set(value) {
    void changeLanguage(value)
  },
})

async function changeLanguage(code: LocaleCode) {
  if (locale.value === code) {
    return
  }

  await setLocale(code)
}
</script>

<template>
  <div class="border-b border-white/10 px-4 py-3.5 md:px-6">
    <div class="flex items-center justify-between gap-4">
      <p class="text-sm text-slate-200">
        {{ t('language.label') }}
      </p>

      <USelectMenu
        v-model="selectedLocale"
        :items="localeOptions"
        value-key="code"
        label-key="fullLabel"
        color="neutral"
        variant="outline"
        size="md"
        class="min-w-52"
        :search-input="{ placeholder: t('settings.general.searchPlaceholder') }"
      />
    </div>
  </div>
</template>
