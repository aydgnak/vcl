<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div class="relative min-h-full overflow-hidden bg-slate-950 text-slate-100">
    <div class="pointer-events-none absolute -left-20 top-8 h-72 w-72 rounded-full bg-cyan-400/15 blur-3xl" />
    <div class="pointer-events-none absolute -right-20 top-36 h-80 w-80 rounded-full bg-emerald-400/10 blur-3xl" />

    <div class="relative mx-auto w-full max-w-5xl px-4 py-6 md:px-8 md:py-8">
      <section class="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur md:p-7">
        <h1 class="text-2xl font-semibold text-white md:text-3xl">
          {{ t('settings.title') }}
        </h1>
        <p class="mt-2 text-sm text-slate-300">
          {{ t('settings.subtitle') }}
        </p>
      </section>
    </div>
  </div>
</template>
