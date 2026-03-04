<script setup lang="ts">
import type { AuthFormField, FormSubmitEvent } from '@nuxt/ui'
import type { LoginI } from 'schemas'
import { loginSchema } from 'schemas'

const { t } = useI18n()
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
  <div class="relative min-h-dvh overflow-hidden bg-slate-950 p-4 md:p-6">
    <div class="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
    <div class="pointer-events-none absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-emerald-500/15 blur-3xl" />

    <div class="relative mx-auto flex min-h-[calc(100dvh-2rem)] w-full max-w-md items-center md:min-h-[calc(100dvh-3rem)]">
      <UPageCard class="w-full border border-white/10 bg-slate-900/80 backdrop-blur">
        <UAuthForm
          title="VCL"
          :description="t('login.form.description')"
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
          </template>

          <template #footer>
            <p class="text-center text-xs text-muted">
              {{ t('login.providersHint') }}
            </p>
          </template>
        </UAuthForm>
      </UPageCard>
    </div>
  </div>
</template>
