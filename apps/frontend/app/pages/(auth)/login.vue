<script setup lang="ts">
import type { AuthFormField } from '@nuxt/ui'
import type { LoginI } from 'schemas'
import { loginSchema } from 'schemas'

const toast = useToast()
const { t } = useI18n()

const fields = computed<(AuthFormField & { name: keyof LoginI })[]>(() => [
  {
    type: 'email',
    name: 'email',
    label: t('login.fields.email.label'),
    required: true,
    icon: 'i-lucide-mail',
    placeholder: t('login.fields.email.placeholder'),
    defaultValue: 'asd@mail.com',
  },
  {
    type: 'password',
    name: 'password',
    label: t('login.fields.password.label'),
    required: true,
    icon: 'i-lucide-lock',
    placeholder: t('login.fields.password.placeholder'),
    defaultValue: '1234',
  },
])

const isSubmitted = ref<boolean>(false)
function onSubmit() {
  isSubmitted.value = true

  setTimeout(() => {
    toast.add({
      icon: 'i-lucide-check-circle',
      title: t('shared.toast.title.success'),
      description: 'This is a test toast message.',
    })

    isSubmitted.value = false
  }, 2000)
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
        :loading="isSubmitted"
        :submit="{
          label: t('login.button.label'),
        }"
        @submit="onSubmit"
      />
    </UPageCard>
  </div>
</template>
