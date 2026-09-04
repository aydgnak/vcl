import type { Metadata } from 'next'
import { KeyRound, LockKeyhole, Mail } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { LocaleSwitcher } from '@/components/auth/locale-switcher'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'

export async function generateMetadata() {
  const t = await getTranslations('auth')

  return {
    title: t('register.title'),
  } satisfies Metadata
}

export default function RegisterPage() {
  const t = useTranslations()

  return (
    <main className="flex min-h-svh items-center justify-center bg-muted px-5 py-8 sm:px-8">
      <section className="w-full max-w-md">
        <LocaleSwitcher />
        <Card className="w-full bg-background py-6 shadow-sm [--card-spacing:--spacing(5)] sm:py-8">
          <CardHeader className="px-6 text-center sm:px-8">
            <CardTitle className="text-2xl font-semibold tracking-[-0.03em]">
              {t('app.name')}
            </CardTitle>
          </CardHeader>

          <CardContent className="px-6 sm:px-8">
            <FieldGroup>
              <Field>
                <FieldLabel className="text-sm" htmlFor="email">
                  {t('auth.form.email.label')}
                </FieldLabel>
                <div className="relative">
                  <Mail
                    aria-hidden="true"
                    className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
                  />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder={t('auth.form.email.placeholder')}
                    required
                    className="h-10 pl-9 text-sm md:text-sm"
                  />
                </div>
              </Field>

              <Field>
                <FieldLabel className="text-sm" htmlFor="password">
                  {t('auth.form.password.label')}
                </FieldLabel>
                <div className="relative">
                  <LockKeyhole
                    aria-hidden="true"
                    className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
                  />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    placeholder={t('auth.form.password.placeholder')}
                    required
                    className="h-10 pl-9 text-sm md:text-sm"
                  />
                </div>
              </Field>

              <Field>
                <FieldLabel className="text-sm" htmlFor="confirm-password">
                  {t('auth.form.confirmPassword.label')}
                </FieldLabel>
                <div className="relative">
                  <KeyRound
                    aria-hidden="true"
                    className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
                  />
                  <Input
                    id="confirm-password"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    placeholder={t('auth.form.confirmPassword.placeholder')}
                    required
                    className="h-10 pl-9 text-sm md:text-sm"
                  />
                </div>
              </Field>
            </FieldGroup>
          </CardContent>

          <CardFooter className="flex-col items-stretch gap-5 border-0 px-6 pb-6 pt-0 sm:px-8">
            <Button type="button" className="h-10 w-full text-sm">
              {t('auth.register.button')}
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              {t('auth.register.hasAccount')}
              {' '}
              <Link
                href="/login"
                className="font-medium text-foreground underline underline-offset-4 hover:text-primary"
              >
                {t('auth.register.login')}
              </Link>
            </p>
          </CardFooter>
        </Card>
      </section>
    </main>
  )
}
