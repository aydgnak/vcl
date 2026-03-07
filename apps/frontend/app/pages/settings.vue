<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div class="relative min-h-full overflow-hidden bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
    <div class="relative mx-auto w-full max-w-5xl px-4 py-6 md:px-8 md:py-8">
      <section class="rounded-2xl border border-slate-200/80 bg-white/80 p-5 backdrop-blur dark:border-white/10 dark:bg-white/5 md:p-7">
        <h1 class="text-2xl font-semibold text-slate-900 dark:text-white md:text-3xl">
          {{ t('settings.title') }}
        </h1>
        <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">
          {{ t('settings.subtitle') }}
        </p>
      </section>
    </div>
  </div>
</template>
