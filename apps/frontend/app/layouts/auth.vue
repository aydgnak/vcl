<script setup lang="ts">
import LanguageSwitcher from './LanguageSwitcher.vue'
</script>

<template>
  <div class="relative">
    <div class="absolute right-4 top-4 z-10 md:right-6 md:top-6">
      <LanguageSwitcher />
    </div>
    <slot />
  </div>
</template>
