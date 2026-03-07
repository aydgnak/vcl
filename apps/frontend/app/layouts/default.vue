<script setup lang="ts">
import SettingsGeneralTab from '~/components/settings/SettingsGeneralTab.vue'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const { isLoggedIn, user, logout } = useAuth()
const isSettingsModalOpen = ref<boolean>(false)

type SettingsTabKey = 'general'

const activeSettingsTab = ref<SettingsTabKey>('general')

const settingsTabs = computed(() => [
  {
    value: 'general' as const,
    label: t('settings.nav.general'),
    icon: 'i-lucide-settings-2',
  },
])

const settingsTabComponents = {
  general: SettingsGeneralTab,
} as const

const activeSettingsTabComponent = computed(() => settingsTabComponents[activeSettingsTab.value])
const activeSettingsTabLabel = computed(() => {
  return settingsTabs.value.find(tab => tab.value === activeSettingsTab.value)?.label ?? ''
})

const settingsHashPrefix = '#settings/'
const legacySettingsHashPrefix = '#settings-'

const settingsHashByTab: Record<SettingsTabKey, string> = {
  general: '#settings/general',
}

function isSettingsHash(hash: string): boolean {
  return hash.startsWith(settingsHashPrefix) || hash.startsWith(legacySettingsHashPrefix)
}

function getSettingsTabFromHash(hash: string): SettingsTabKey | null {
  let tab: string | null = null

  if (hash.startsWith(settingsHashPrefix)) {
    tab = hash.slice(settingsHashPrefix.length)
  }
  else if (hash.startsWith(legacySettingsHashPrefix)) {
    tab = hash.slice(legacySettingsHashPrefix.length)
  }

  if (!tab) {
    return null
  }

  if (tab === 'general' || tab === 'security') {
    return 'general'
  }

  return null
}

watch(
  () => route.hash,
  (hash) => {
    if (!import.meta.client) {
      return
    }

    const tab = getSettingsTabFromHash(hash)

    if (tab) {
      if (activeSettingsTab.value !== tab) {
        activeSettingsTab.value = tab
      }

      if (!isSettingsModalOpen.value) {
        isSettingsModalOpen.value = true
      }

      const normalizedHash = settingsHashByTab[tab]

      if (hash !== normalizedHash) {
        void router.replace({ path: route.path, query: route.query, hash: normalizedHash })
      }

      return
    }

    if (isSettingsHash(hash)) {
      void router.replace({ path: route.path, query: route.query, hash: '' })
      return
    }

    if (isSettingsModalOpen.value) {
      isSettingsModalOpen.value = false
    }
  },
  { immediate: true },
)

watch(
  [isSettingsModalOpen, activeSettingsTab],
  ([isOpen, activeTab]) => {
    if (!import.meta.client) {
      return
    }

    if (!isOpen) {
      if (isSettingsHash(route.hash)) {
        void router.replace({ path: route.path, query: route.query, hash: '' })
      }

      return
    }

    const nextHash = settingsHashByTab[activeTab]

    if (route.hash !== nextHash) {
      void router.replace({ path: route.path, query: route.query, hash: nextHash })
    }
  },
)

const userMenuItems = computed(() => [[
  {
    type: 'label' as const,
    label: user.value?.email ?? '-',
  },
  {
    label: t('settings.menu.label'),
    icon: 'i-lucide-settings',
    onSelect: () => {
      activeSettingsTab.value = 'general'
      isSettingsModalOpen.value = true
    },
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
  <div class="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
    <header
      v-if="isLoggedIn"
      class="sticky top-0 z-40 bg-white/75 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:bg-slate-950/65 dark:supports-[backdrop-filter]:bg-slate-950/55"
    >
      <div class="mx-auto w-full max-w-7xl px-4 py-3 md:px-8 md:py-4">
        <div class="flex h-12 items-center justify-between rounded-xl border border-slate-200/80 bg-white/80 px-3 shadow-[0_8px_24px_rgba(15,23,42,0.12)] dark:border-white/12 dark:bg-slate-900/70 dark:shadow-[0_8px_24px_rgba(2,6,23,0.35)] md:px-4">
          <NuxtLink to="/" class="text-base font-semibold tracking-[0.12em] text-slate-900/95 dark:text-slate-100/95">
            VCL
          </NuxtLink>

          <div class="flex items-center gap-1.5">
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
                class="h-8 w-8 justify-center p-0 transition-colors duration-200 hover:bg-slate-100 dark:hover:bg-white/10"
                :avatar="{ alt: user?.email ?? 'User', size: 'sm' }"
              />
            </UDropdownMenu>
          </div>
        </div>
      </div>
    </header>

    <main class="flex-1 bg-slate-50 dark:bg-slate-950">
      <slot />
    </main>

    <UModal
      v-if="isLoggedIn"
      v-model:open="isSettingsModalOpen"
      :title="t('settings.title')"
      :description="t('settings.subtitle')"
      :close="false"
      :ui="{
        content: 'w-[calc(100vw-2rem)] sm:max-w-4xl h-[78vh] overflow-hidden border border-slate-200/80 bg-white/98 text-slate-900 shadow-[0_30px_90px_rgba(15,23,42,0.16)] dark:border-white/10 dark:bg-slate-900/98 dark:text-slate-100 dark:shadow-[0_40px_120px_rgba(2,6,23,0.65)]',
      }"
    >
      <template #content="{ close }">
        <div class="grid h-[78vh] grid-cols-1 overflow-hidden md:grid-cols-[15rem_minmax(0,1fr)]">
          <aside class="border-b border-slate-200 bg-slate-100/85 p-2 dark:border-white/10 dark:bg-slate-950/85 md:border-b-0 md:border-r md:p-3">
            <div class="mb-2 flex items-center justify-between px-2 py-1">
              <p class="text-sm font-medium text-slate-900 dark:text-slate-100">
                {{ t('settings.title') }}
              </p>
              <UButton
                color="neutral"
                variant="ghost"
                size="sm"
                icon="i-lucide-x"
                class="h-7 w-7 items-center justify-center p-0 transition-colors duration-150 hover:bg-slate-200 active:bg-slate-300/80 dark:hover:bg-white/10 dark:active:bg-white/15"
                :aria-label="t('settings.actions.close')"
                @click="close"
              />
            </div>

            <nav class="grid grid-cols-1 gap-1">
              <button
                v-for="tab in settingsTabs"
                :key="tab.value"
                type="button"
                class="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors"
                :class="activeSettingsTab === tab.value
                  ? 'bg-slate-200 text-slate-900 dark:bg-white/14 dark:text-slate-100'
                  : 'text-slate-600 hover:bg-slate-200 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/6 dark:hover:text-slate-100'"
                @click="activeSettingsTab = tab.value"
              >
                <UIcon :name="tab.icon" class="size-4 shrink-0" />
                <span class="truncate">{{ tab.label }}</span>
              </button>
            </nav>
          </aside>

          <section class="flex min-h-0 flex-col bg-white/70 dark:bg-slate-900/70">
            <div class="border-b border-slate-200 px-4 py-3 dark:border-white/10 md:px-6">
              <h2 class="text-base font-semibold text-slate-900 dark:text-slate-100">
                {{ activeSettingsTabLabel }}
              </h2>
            </div>

            <div class="min-h-0 flex-1 overflow-y-auto">
              <component
                :is="activeSettingsTabComponent"
                v-if="activeSettingsTabComponent"
                :key="activeSettingsTab"
              />
            </div>
          </section>
        </div>
      </template>
    </UModal>
  </div>
</template>
