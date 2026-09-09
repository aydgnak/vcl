import type { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { LocaleSwitcher } from '../_components/locale-switcher'
import { RegisterForm } from './register-form'

export async function generateMetadata() {
  const t = await getTranslations('auth')

  return {
    title: t('register.title'),
  } satisfies Metadata
}

export default function RegisterPage() {
  const t = useTranslations()

  return (
    <main className="flex min-h-svh items-center justify-center px-5 py-8 sm:px-8">
      <section className="w-full max-w-md">
        <LocaleSwitcher />
        <Card className="w-full py-6 shadow-sm [--card-spacing:--spacing(5)] sm:py-8">
          <CardHeader className="px-6 text-center sm:px-8">
            <CardTitle className="text-2xl font-semibold tracking-[-0.03em]">
              {t('app.name')}
            </CardTitle>
          </CardHeader>

          <CardContent className="px-6 sm:px-8">
            <RegisterForm />
          </CardContent>

          <CardFooter className="flex-col items-stretch gap-5 border-0 px-6 pb-6 pt-0 sm:px-8">
            <Button type="submit" form="register-form" className="h-10 w-full text-sm">
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
