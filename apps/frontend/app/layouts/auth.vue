<script setup lang="ts">
import LanguageSwitcher from './LanguageSwitcher.vue'
</script>

<template>
  <div class="relative min-h-dvh overflow-hidden bg-slate-950 text-slate-100">
    <div class="pointer-events-none absolute -left-20 top-8 h-72 w-72 rounded-full bg-emerald-400/15 blur-3xl" />
    <div class="pointer-events-none absolute -right-20 bottom-6 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />

    <div class="absolute right-4 top-4 z-20 md:right-6 md:top-6">
      <LanguageSwitcher />
    </div>

    <div class="relative mx-auto flex min-h-dvh w-full max-w-md items-center px-4 py-8 md:px-6 md:py-10">
      <div class="w-full">
        <slot />
      </div>
    </div>
  </div>
</template>
