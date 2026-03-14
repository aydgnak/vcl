'use client'

import type { LoginI } from 'schemas'
import { Alert, Button, FieldError, Form, Input, Label, Separator, Text, TextField } from '@heroui/react'
import { valibotResolver } from '@hookform/resolvers/valibot'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { loginSchema } from 'schemas'
import { useI18n } from '@/i18n/use-i18n'

interface ErrorResponseBody {
  message?: string | string[]
}

interface IconProps {
  className?: string
}

const TRAILING_SLASH_REGEX = /\/+$/

function getApiBaseUrl() {
  // eslint-disable-next-line node/prefer-global/process
  const configured = process.env.NEXT_PUBLIC_API_URL

  if (configured !== undefined && configured.length > 0)
    return configured.replace(TRAILING_SLASH_REGEX, '')

  return 'http://localhost:8000'
}

const API_BASE_URL = getApiBaseUrl()

async function getErrorMessage(response: Response) {
  const payload = await response.json().catch(() => null) as ErrorResponseBody | null
  const message = payload?.message

  if (typeof message === 'string' && message.length > 0)
    return message

  if (Array.isArray(message) && typeof message[0] === 'string' && message[0].length > 0)
    return message[0]

  return null
}

function GoogleIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.73 1.22 9.24 3.62l6.88-6.88C35.95 2.33 30.43 0 24 0 14.62 0 6.51 5.38 2.56 13.22l8 6.22C12.47 13.61 17.77 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.64-.15-3.21-.41-4.73H24v9.04h12.92c-.56 2.98-2.25 5.5-4.79 7.2l7.75 6.01c4.52-4.17 7.1-10.31 7.1-17.52z" />
      <path fill="#FBBC05" d="M10.56 28.56a14.5 14.5 0 0 1 0-9.12l-8-6.22A24.02 24.02 0 0 0 0 24c0 3.88.93 7.55 2.56 10.78l8-6.22z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.9-5.79l-7.75-6.01c-2.15 1.44-4.91 2.3-8.15 2.3-6.23 0-11.53-4.11-13.44-9.94l-8 6.22C6.51 42.62 14.62 48 24 48z" />
      <path fill="none" d="M0 0h48v48H0z" />
    </svg>
  )
}

export function LoginForm() {
  const { locale, t } = useI18n()
  const router = useRouter()

  const resolver = useMemo(() => {
    return valibotResolver(loginSchema, { lang: locale })
  }, [locale])

  const {
    clearErrors,
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    setError,
  } = useForm<LoginI>({
    resolver,
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  })

  async function onSubmit(values: LoginI) {
    clearErrors('root.server')

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        body: JSON.stringify(values),
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      })

      if (!response.ok) {
        const message = await getErrorMessage(response) ?? t('auth.login.errorDefault')

        setError('root.server', {
          type: 'server',
          message,
        })

        return
      }

      router.replace('/')
      router.refresh()
    }
    catch {
      setError('root.server', {
        type: 'network',
        message: t('auth.login.errorDefault'),
      })
    }
  }

  function onGoogleLogin() {
    window.location.assign(`${API_BASE_URL}/auth/google`)
  }

  const emailError = typeof errors.email?.message === 'string'
    ? errors.email.message
    : null

  const isEmailInvalid = emailError !== null

  const passwordError = typeof errors.password?.message === 'string'
    ? errors.password.message
    : null

  const isPasswordInvalid = passwordError !== null

  const serverError = typeof errors.root?.server?.message === 'string'
    ? errors.root.server.message
    : null

  return (
    <section>
      <div className="flex flex-col items-center gap-2">
        <Text className="block text-3xl font-semibold text-foreground text-center">
          {t('auth.login.page.title')}
        </Text>

        <Text className="block text-sm tracking-[0.01em] text-foreground/65 text-center">
          {t('auth.login.page.subtitle')}
        </Text>
      </div>

      <Button
        type="button"
        isDisabled={isSubmitting}
        onPress={onGoogleLogin}
        variant="secondary"
        fullWidth
        className="mt-7 inline-flex items-center justify-center gap-2 rounded-md border border-foreground/12 bg-default/80 px-4 py-2.5 text-sm font-semibold text-foreground shadow-sm transition hover:bg-default/95 hover:shadow disabled:cursor-not-allowed disabled:opacity-60"
      >
        <GoogleIcon className="size-5" />
        {t('auth.login.google')}
      </Button>

      <div className="my-6 flex items-center gap-3 text-xs font-medium text-foreground/65">
        <Separator className="flex-1 bg-foreground/20" />
        <Text className="text-xs font-medium text-foreground/65">{t('auth.login.separator')}</Text>
        <Separator className="flex-1 bg-foreground/20" />
      </div>

      <Form
        className="space-y-5"
        validationBehavior="aria"
        onSubmit={(event) => {
          void handleSubmit(onSubmit)(event)
        }}
      >
        <TextField isInvalid={isEmailInvalid} className="space-y-2">
          <Label className={isEmailInvalid ? 'block text-sm font-medium text-danger' : 'block text-sm font-medium text-foreground/95'} htmlFor="email">
            {t('auth.login.email.label')}
          </Label>

          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder={t('auth.login.email.placeholder')}
            {...register('email', {
              onChange: () => clearErrors('root.server'),
            })}
            aria-invalid={isEmailInvalid}
            className={isEmailInvalid
              ? 'w-full rounded-md border border-danger/60 bg-default-50 px-3 py-2.5 text-sm text-foreground outline-none transition focus:border-danger focus:ring-1 focus:ring-danger/25'
              : 'w-full rounded-md border border-foreground/25 bg-default-50 px-3 py-2.5 text-sm text-foreground outline-none transition focus:border-foreground/60 focus:ring-1 focus:ring-foreground/20'}
            disabled={isSubmitting}
          />

          {emailError !== null && (
            <FieldError className="text-sm text-danger">
              {emailError}
            </FieldError>
          )}
        </TextField>

        <TextField isInvalid={isPasswordInvalid} className="space-y-2">
          <Label className={isPasswordInvalid ? 'block text-sm font-medium text-danger' : 'block text-sm font-medium text-foreground/95'} htmlFor="password">
            {t('auth.login.password.label')}
          </Label>

          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            placeholder={t('auth.login.password.placeholder')}
            {...register('password', {
              onChange: () => clearErrors('root.server'),
            })}
            aria-invalid={isPasswordInvalid}
            className={isPasswordInvalid
              ? 'w-full rounded-md border border-danger/60 bg-default-50 px-3 py-2.5 text-sm text-foreground outline-none transition focus:border-danger focus:ring-1 focus:ring-danger/25'
              : 'w-full rounded-md border border-foreground/25 bg-default-50 px-3 py-2.5 text-sm text-foreground outline-none transition focus:border-foreground/60 focus:ring-1 focus:ring-foreground/20'}
            disabled={isSubmitting}
          />

          {passwordError !== null && (
            <FieldError className="text-sm text-danger">
              {passwordError}
            </FieldError>
          )}
        </TextField>

        {serverError !== null && (
          <Alert status="danger" className="w-full rounded-md border border-danger/35 bg-danger/10 px-3 py-2">
            <Alert.Content>
              <Alert.Description className="text-sm leading-5 text-danger">
                {serverError}
              </Alert.Description>
            </Alert.Content>
          </Alert>
        )}

        <Button
          type="submit"
          variant="primary"
          isDisabled={isSubmitting}
          fullWidth
          className="inline-flex items-center justify-center rounded-md px-4 py-2.5 text-sm font-semibold shadow-sm transition hover:opacity-95 hover:shadow disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? t('auth.login.submitting') : t('auth.login.submit')}
        </Button>

        <Text className="pt-3 text-center text-sm text-foreground/60">
          {t('auth.login.switch.prompt')}
          {' '}
          <Link href="/register" className="text-sm font-semibold text-accent/90 underline-offset-4 transition hover:text-accent hover:underline">
            {t('auth.login.switch.action')}
          </Link>
        </Text>
      </Form>
    </section>
  )
}
