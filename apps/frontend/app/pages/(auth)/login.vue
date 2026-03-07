<script setup lang="ts">
import type { AuthFormField, FormSubmitEvent } from '@nuxt/ui'
import type { LoginI } from 'schemas'
import { loginSchema } from 'schemas'

const { t } = useI18n()
const route = useRoute()
const { login } = useAuth()
const { public: { apiBaseUrl } } = useRuntimeConfig()

definePageMeta({
  layout: 'auth',
})

const fields = computed<(AuthFormField & { name: keyof LoginI })[]>(() => [
  {
    type: 'email',
    name: 'email',
    label: t('login.fields.email.label'),
    required: true,
    icon: 'i-lucide-mail',
    placeholder: t('login.fields.email.placeholder'),
  },
  {
    type: 'password',
    name: 'password',
    label: t('login.fields.password.label'),
    required: true,
    icon: 'i-lucide-lock',
    placeholder: t('login.fields.password.placeholder'),
  },
])

const providers = computed(() => [
  {
    label: t('login.providers.google'),
    icon: 'i-logos-google-icon',
    onClick: () => {
      navigateTo(`${apiBaseUrl}/auth/google`, { external: true })
    },
  },
])

const isSubmitted = ref<boolean>(false)
const loginError = ref<string | null>(null)

const hasRegisteredNotice = computed(() => {
  const queryValue = route.query.registered

  if (Array.isArray(queryValue)) {
    return queryValue.includes('1') || queryValue.includes('true')
  }

  return queryValue === '1' || queryValue === 'true'
})

async function onSubmit(event: FormSubmitEvent<LoginI>) {
  isSubmitted.value = true
  loginError.value = null

  try {
    await login(event.data.email, event.data.password)
    await navigateTo('/')
  }
  catch {
    loginError.value = t('login.toast.error')
  }
  finally {
    isSubmitted.value = false
  }
}
</script>

<template>
  <UPageCard class="w-full border border-slate-200/80 bg-white/90 shadow-[0_24px_70px_rgba(15,23,42,0.16)] backdrop-blur dark:border-white/10 dark:bg-slate-900/80 dark:shadow-[0_30px_80px_rgba(2,6,23,0.45)]">
    <UAuthForm
      title="VCL"
      description="Vehicle Cost Ledger"
      :schema="loginSchema"
      :fields="fields"
      :providers="providers"
      :separator="t('login.separator')"
      :loading="isSubmitted"
      :submit="{
        label: t('login.button.label'),
      }"
      @submit="onSubmit"
    >
      <template #validation>
        <div class="space-y-2">
          <Transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="opacity-0 -translate-y-1"
            enter-to-class="opacity-100 translate-y-0"
          >
            <UAlert
              v-if="hasRegisteredNotice"
              color="success"
              variant="subtle"
              :description="t('login.toast.registered')"
            />
          </Transition>

          <Transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="opacity-0 -translate-y-1"
            enter-to-class="opacity-100 translate-y-0"
          >
            <UAlert
              v-if="loginError"
              color="error"
              variant="subtle"
              :description="loginError"
            />
          </Transition>
        </div>
      </template>

      <template #footer>
        <p class="text-center text-xs text-muted">
          {{ t('login.registerPrompt') }}
          <NuxtLink to="/register" class="font-semibold text-cyan-700 transition-colors duration-200 hover:text-cyan-600 dark:text-cyan-300 dark:hover:text-cyan-200">
            {{ t('login.registerAction') }}
          </NuxtLink>
        </p>
      </template>
    </UAuthForm>
  </UPageCard>
</template>
