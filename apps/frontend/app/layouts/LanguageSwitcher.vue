<script setup lang="ts">
const { locale, setLocale, t } = useI18n()

interface LocaleOption {
  code: 'tr' | 'en'
  short: string
  fullLabel: string
  flag: string
}

const defaultLocaleOption: LocaleOption = {
  code: 'tr',
  short: 'TR',
  fullLabel: 'Türkçe',
  flag: '🇹🇷',
}

const localeOptions = computed<LocaleOption[]>(() => [
  {
    code: 'tr',
    short: t('language.tr'),
    fullLabel: t('language.trFull'),
    flag: '🇹🇷',
  },
  {
    code: 'en',
    short: t('language.en'),
    fullLabel: t('language.enFull'),
    flag: '🇬🇧',
  },
])

const activeLocale = computed<LocaleOption>(() => {
  return localeOptions.value.find(item => item.code === locale.value) ?? defaultLocaleOption
})

const menuItems = computed(() => {
  return localeOptions.value.map(item => ({
    type: 'checkbox' as const,
    label: item.fullLabel,
    flag: item.flag,
    checked: item.code === locale.value,
    onSelect: () => changeLanguage(item.code),
  }))
})

async function changeLanguage(code: 'tr' | 'en') {
  if (locale.value === code) {
    return
  }

  await setLocale(code)
}
</script>

<template>
  <UDropdownMenu
    :items="menuItems"
    :content="{ align: 'end', sideOffset: 8 }"
    :ui="{ content: 'min-w-44' }"
  >
    <template #item-label="{ item }">
      <span class="inline-flex items-center gap-1.5">
        <span>{{ item.flag }}</span>
        <span>{{ item.label }}</span>
      </span>
    </template>

    <UButton
      color="neutral"
      variant="ghost"
      size="sm"
      class="h-8 rounded-md px-2.5 text-xs font-medium tracking-wide text-slate-700 transition-colors duration-200 hover:bg-slate-100 dark:text-slate-100/90 dark:hover:bg-white/10"
      :aria-label="t('language.label')"
    >
      <span class="inline-flex items-center gap-1.5">
        <span>{{ activeLocale.flag }}</span>
        <span>{{ activeLocale.short }}</span>
      </span>
    </UButton>
  </UDropdownMenu>
</template>
