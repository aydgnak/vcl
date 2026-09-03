import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'

export async function generateMetadata() {
  const t = await getTranslations('auth')

  return {
    title: t('register.title'),
  } satisfies Metadata
}

export default function RegisterPage() {
  return (
    <div>
      Register Page

      <br></br>
      <br></br>

      <Link href="/login">Login</Link>
    </div>
  )
}
