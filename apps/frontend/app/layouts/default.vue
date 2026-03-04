<script setup lang="ts">
import LanguageSwitcher from './LanguageSwitcher.vue'

const { t } = useI18n()
const { isLoggedIn, user, logout } = useAuth()

const userMenuItems = computed(() => [[
  {
    type: 'label' as const,
    label: user.value?.email ?? '-',
  },
  {
    type: 'separator' as const,
  },
  {
    label: t('logout.button.label'),
    icon: 'i-lucide-log-out',
    color: 'error' as const,
    onSelect: () => {
      void onLogout()
    },
  },
]])

async function onLogout() {
  await logout()
  await navigateTo('/login')
}
</script>

<template>
  <div class="min-h-screen flex flex-col bg-slate-950">
    <header
      v-if="isLoggedIn"
      class="sticky top-0 z-40 bg-slate-950/65 backdrop-blur supports-[backdrop-filter]:bg-slate-950/55"
    >
      <div class="mx-auto w-full max-w-7xl px-4 py-3 md:px-8 md:py-4">
        <div class="flex h-12 items-center justify-between rounded-xl border border-white/12 bg-slate-900/70 px-3 shadow-[0_8px_24px_rgba(2,6,23,0.35)] md:px-4">
          <NuxtLink to="/" class="text-base font-semibold tracking-[0.12em] text-slate-100/95">
            VCL
          </NuxtLink>

          <div class="flex items-center gap-1.5">
            <LanguageSwitcher />
            <UDropdownMenu
              :items="userMenuItems"
              :content="{ align: 'end', sideOffset: 8 }"
              :ui="{ content: 'min-w-56' }"
            >
              <UButton
                color="neutral"
                variant="ghost"
                size="sm"
                leading
                class="h-8 w-8 justify-center p-0 transition-colors duration-200 hover:bg-white/10"
                :avatar="{ alt: user?.email ?? 'User', size: 'sm' }"
              />
            </UDropdownMenu>
          </div>
        </div>
      </div>
    </header>

    <main class="flex-1 bg-slate-950">
      <slot />
    </main>
  </div>
</template>
