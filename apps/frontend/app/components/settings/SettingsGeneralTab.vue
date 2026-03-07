<script setup lang="ts">
const { locale, setLocale, t } = useI18n()
const colorMode = useColorMode()

type LocaleCode = 'tr' | 'en'
type ColorModePreference = 'system' | 'dark' | 'light'

interface LocaleOption {
  code: LocaleCode
  fullLabel: string
}

interface ColorModeOption {
  value: ColorModePreference
  label: string
}

const colorModeOptions = computed<ColorModeOption[]>(() => [
  {
    value: 'system',
    label: t('settings.general.appearance.options.system'),
  },
  {
    value: 'dark',
    label: t('settings.general.appearance.options.dark'),
  },
  {
    value: 'light',
    label: t('settings.general.appearance.options.light'),
  },
])

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

const selectedColorMode = computed<ColorModePreference>({
  get() {
    return colorMode.preference === 'dark' || colorMode.preference === 'light'
      ? colorMode.preference
      : 'system'
  },
  set(value) {
    colorMode.preference = value
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
  <div class="border-b border-slate-200 dark:border-white/10 px-4 py-3.5 md:px-6">
    <div class="flex items-center justify-between gap-4">
      <p class="text-sm text-slate-700 dark:text-slate-200">
        {{ t('settings.general.appearance.label') }}
      </p>

      <USelectMenu
        v-model="selectedColorMode"
        :items="colorModeOptions"
        value-key="value"
        label-key="label"
        color="neutral"
        variant="outline"
        size="md"
        class="min-w-52"
      />
    </div>
  </div>

  <div class="border-b border-slate-200 dark:border-white/10 px-4 py-3.5 md:px-6">
    <div class="flex items-center justify-between gap-4">
      <p class="text-sm text-slate-700 dark:text-slate-200">
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
