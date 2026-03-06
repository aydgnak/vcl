<script setup lang="ts">
import type { AuthFormField, FormSubmitEvent } from '@nuxt/ui'
import { emailSchema, passwordSchema } from 'schemas'
import { object } from 'valibot'

interface RegisterI {
  email: string
  password: string
  passwordConfirm: string
}

const registerFormSchema = object({
  email: emailSchema,
  password: passwordSchema,
  passwordConfirm: passwordSchema,
})

const { t } = useI18n()
const { register } = useAuth()
const { public: { apiBaseUrl } } = useRuntimeConfig()

definePageMeta({
  layout: 'auth',
})

const fields = computed<(AuthFormField & { name: keyof RegisterI })[]>(() => [
  {
    type: 'email',
    name: 'email',
    label: t('register.fields.email.label'),
    required: true,
    icon: 'i-lucide-mail',
    placeholder: t('register.fields.email.placeholder'),
  },
  {
    type: 'password',
    name: 'password',
    label: t('register.fields.password.label'),
    required: true,
    icon: 'i-lucide-lock',
    placeholder: t('register.fields.password.placeholder'),
  },
  {
    type: 'password',
    name: 'passwordConfirm',
    label: t('register.fields.passwordConfirm.label'),
    required: true,
    icon: 'i-lucide-shield-check',
    placeholder: t('register.fields.passwordConfirm.placeholder'),
  },
])

const providers = computed(() => [
  {
    label: t('register.providers.google'),
    icon: 'i-logos-google-icon',
    onClick: () => {
      navigateTo(`${apiBaseUrl}/auth/google`, { external: true })
    },
  },
])

const isSubmitted = ref<boolean>(false)
const registerError = ref<string | null>(null)

function getStatusCode(error: unknown) {
  if (typeof error !== 'object' || error === null) {
    return null
  }

  if (!('statusCode' in error)) {
    return null
  }

  const statusCode = error.statusCode

  return typeof statusCode === 'number' ? statusCode : null
}

async function onSubmit(event: FormSubmitEvent<RegisterI>) {
  registerError.value = null

  if (event.data.password !== event.data.passwordConfirm) {
    registerError.value = t('register.toast.passwordMismatch')
    return
  }

  isSubmitted.value = true

  try {
    await register(event.data.email, event.data.password)
    await navigateTo('/')
  }
  catch (error) {
    if (getStatusCode(error) === 404) {
      registerError.value = t('register.toast.unavailable')
      return
    }

    if (getStatusCode(error) === 409) {
      registerError.value = t('register.toast.conflict')
      return
    }

    registerError.value = t('register.toast.error')
  }
  finally {
    isSubmitted.value = false
  }
}
</script>

<template>
  <UPageCard class="w-full border border-white/10 bg-slate-900/80 shadow-[0_30px_80px_rgba(2,6,23,0.45)] backdrop-blur">
    <UAuthForm
      title="VCL"
      :description="t('register.form.description')"
      :schema="registerFormSchema"
      :fields="fields"
      :providers="providers"
      :separator="t('register.separator')"
      :loading="isSubmitted"
      :submit="{
        label: t('register.button.label'),
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
            v-if="registerError"
            color="error"
            variant="subtle"
            :description="registerError"
          />
        </Transition>
      </template>

      <template #footer>
        <p class="mb-2 text-center text-xs text-muted">
          {{ t('register.passwordPolicy') }}
        </p>
        <p class="text-center text-xs text-muted">
          {{ t('register.loginPrompt') }}
          <NuxtLink to="/login" class="font-semibold text-cyan-300 transition-colors duration-200 hover:text-cyan-200">
            {{ t('register.loginAction') }}
          </NuxtLink>
        </p>
      </template>
    </UAuthForm>
  </UPageCard>
</template>
