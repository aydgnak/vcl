<script setup lang="ts">
import LanguageSwitcher from './LanguageSwitcher.vue'
</script>

<template>
  <div class="relative min-h-dvh overflow-hidden bg-slate-100 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
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
