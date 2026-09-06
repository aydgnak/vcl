'use client'

import type { RegisterI } from 'schemas'
import type { ValidationMessage } from 'schemas/messages'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { KeyRound, LockKeyhole, Mail } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'
import { registerSchema } from 'schemas'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { toast } from '@/lib/toast'

export function RegisterForm() {
  const router = useRouter()
  const t = useTranslations()

  const form = useForm({
    resolver: valibotResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  async function onSubmit(data: RegisterI) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      credentials: 'include',
    })

    if (!res.ok) {
      const error = await res.json() as {
        message: string
        statusCode: number
      }

      toast.add({
        type: 'error',
        title: error.message,
        data: { hideClose: true, variant: 'destructive' },
      })

      return
    }

    router.replace('/login')
  }

  return (
    <form id="register-form" noValidate onSubmit={event => void form.handleSubmit(onSubmit)(event)}>
      <FieldGroup>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel className="text-sm" htmlFor={field.name}>
                {t('auth.form.email.label')}
              </FieldLabel>
              <div className="relative">
                <Mail
                  aria-hidden="true"
                  className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
                />
                <Input
                  {...field}
                  id={field.name}
                  type="email"
                  className="h-10 pl-9 text-sm md:text-sm"
                  aria-invalid={fieldState.invalid}
                  placeholder={t('auth.form.email.placeholder')}
                />
              </div>
              {fieldState.error && (
                <FieldError>{t(fieldState.error.message as ValidationMessage)}</FieldError>
              )}
            </Field>
          )}
        />

        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel className="text-sm" htmlFor={field.name}>
                {t('auth.form.password.label')}
              </FieldLabel>
              <div className="relative">
                <LockKeyhole
                  aria-hidden="true"
                  className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
                />
                <Input
                  {...field}
                  id={field.name}
                  type="password"
                  placeholder={t('auth.form.password.placeholder')}
                  className="h-10 pl-9 text-sm md:text-sm"
                  aria-invalid={fieldState.invalid}
                />
              </div>
              {fieldState.error && (
                <FieldError>{t(fieldState.error.message as ValidationMessage)}</FieldError>
              )}
            </Field>
          )}
        />

        <Controller
          name="confirmPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel className="text-sm" htmlFor={field.name}>
                {t('auth.form.confirmPassword.label')}
              </FieldLabel>
              <div className="relative">
                <KeyRound
                  aria-hidden="true"
                  className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
                />
                <Input
                  {...field}
                  id={field.name}
                  type="password"
                  placeholder={t('auth.form.confirmPassword.placeholder')}
                  className="h-10 pl-9 text-sm md:text-sm"
                  aria-invalid={fieldState.invalid}
                />
              </div>
              {fieldState.error && (
                <FieldError>{t(fieldState.error.message as ValidationMessage)}</FieldError>
              )}
            </Field>
          )}
        />
      </FieldGroup>
    </form>
  )
}
