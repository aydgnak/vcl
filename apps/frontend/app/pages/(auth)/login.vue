<script setup lang="ts">
import type { AuthFormField } from '@nuxt/ui'
import type { LoginI } from 'schemas'
import { loginSchema } from 'schemas'

const toast = useToast()

const fields: (AuthFormField & { name: keyof LoginI })[] = [
  {
    type: 'email',
    name: 'email',
    label: 'Email',
    required: true,
    icon: 'i-lucide-mail',
    placeholder: 'Enter your email',
  },
  {
    type: 'password',
    name: 'password',
    label: 'Password',
    required: true,
    icon: 'i-lucide-lock',
    placeholder: 'Enter your password',
  },
]

const isSubmitted = ref<boolean>(false)
function onSubmit() {
  isSubmitted.value = true

  setTimeout(() => {
    toast.add({
      icon: 'i-lucide-check-circle',
      title: 'Test Success',
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
        @submit="onSubmit"
      />
    </UPageCard>
  </div>
</template>
