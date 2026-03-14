import type { Metadata } from 'next'
import { getDictionary, resolveRequestLocale } from '@/i18n/dictionaries'
import { translate } from '@/i18n/messages'

export async function generateMetadata(): Promise<Metadata> {
  const locale = await resolveRequestLocale()
  const messages = await getDictionary(locale)

  return {
    title: translate(messages, 'home.title'),
  }
}

export default function RootPage() {
  return <main className="min-h-[calc(100dvh-4rem)]" />
}
