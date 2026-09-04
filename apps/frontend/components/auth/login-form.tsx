'use client'

import type { LoginI } from 'schemas'
import type { ValidationMessage } from 'schemas/messages'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { LockKeyhole, Mail } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'
import { loginSchema } from 'schemas'
import { toast } from '@/lib/toast'
import { Field, FieldError, FieldGroup, FieldLabel } from '../ui/field'
import { Input } from '../ui/input'

export function LoginForm() {
  const router = useRouter()
  const t = useTranslations()

  const form = useForm<LoginI>({
    resolver: valibotResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(data: LoginI) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`, {
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

    router.replace('/dashboard')
  }

  return (
    <form id="login-form" noValidate onSubmit={event => void form.handleSubmit(onSubmit)(event)}>
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
                  id="password"
                  type="password"
                  className="h-10 pl-9 text-sm md:text-sm"
                  aria-invalid={fieldState.invalid}
                  placeholder={t('auth.form.password.placeholder')}
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
