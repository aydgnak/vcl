<script setup lang="ts">
import type { AuthFormField, FormSubmitEvent } from '@nuxt/ui'
import type { LoginI } from 'schemas'
import { loginSchema } from 'schemas'

const toast = useToast()
const { t } = useI18n()
const { login } = useAuth()
const { public: { apiBaseUrl } } = useRuntimeConfig()

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
    icon: 'i-simple-icons-google',
    onClick: () => {
      navigateTo(`${apiBaseUrl}/auth/google`, { external: true })
    },
  },
])

const isSubmitted = ref<boolean>(false)
async function onSubmit(event: FormSubmitEvent<LoginI>) {
  isSubmitted.value = true

  try {
    await login(event.data.email, event.data.password)
    await navigateTo('/')
  }
  catch {
    toast.add({
      icon: 'i-lucide-circle-x',
      title: t('shared.toast.title.error'),
      description: t('login.toast.error'),
      color: 'error',
    })
  }
  finally {
    isSubmitted.value = false
  }
}
</script>

<template>
  <div class="h-screen flex flex-col items-center justify-center gap-4 p-4">
    <UPageCard class="w-full max-w-md">
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
      />
    </UPageCard>
  </div>
</template>
