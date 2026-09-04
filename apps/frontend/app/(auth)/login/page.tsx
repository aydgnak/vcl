import type { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { LocaleSwitcher } from '@/components/auth/locale-switcher'
import { LoginForm } from '@/components/auth/login-form'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export async function generateMetadata() {
  const t = await getTranslations('auth')

  return {
    title: t('login.title'),
  } satisfies Metadata
}

export default function LoginPage() {
  const t = useTranslations()

  return (
    <main className="flex min-h-svh items-center justify-center bg-muted px-5 sm:px-8">
      <section className="w-full max-w-md">
        <LocaleSwitcher />
        <Card className="w-full max-w-md bg-background py-6 shadow-sm [--card-spacing:--spacing(5)] sm:py-8">
          <CardHeader className="px-6 sm:px-8">
            <CardTitle className="text-2xl text-center font-semibold tracking-[-0.03em]">
              {t('app.name')}
            </CardTitle>
          </CardHeader>

          <CardContent className="px-6 sm:px-8">
            <LoginForm />
          </CardContent>

          <CardFooter className="flex-col items-stretch gap-5 border-0 px-6 pb-6 pt-0 sm:px-8">
            <Button type="submit" form="login-form" className="h-10 w-full text-sm">
              {t('auth.login.button')}
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              {t('auth.login.noAccount')}
              {' '}
              <Link
                href="/register"
                className="font-medium text-foreground underline underline-offset-4 hover:text-primary"
              >
                {t('auth.login.createAccount')}
              </Link>
            </p>
          </CardFooter>
        </Card>
      </section>
    </main>
  )
}
