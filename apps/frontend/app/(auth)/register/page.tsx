import type { Metadata } from 'next'
import { RegisterForm } from '@/components/register-form'
import { getDictionary, resolveRequestLocale } from '@/i18n/dictionaries'
import { translate } from '@/i18n/messages'

export async function generateMetadata(): Promise<Metadata> {
  const locale = await resolveRequestLocale()
  const messages = await getDictionary(locale)

  return {
    title: translate(messages, 'auth.register.page.title'),
  }
}

export default function RegisterPage() {
  return (
    <div className="mx-auto w-full max-w-md overflow-hidden rounded-lg border border-border/70 bg-surface shadow-md">
      <div className="h-1.5 w-full bg-linear-to-r from-accent/65 via-accent/30 to-transparent" aria-hidden="true" />

      <div className="p-6 sm:p-7">
        <RegisterForm />
      </div>
    </div>
  )
}
