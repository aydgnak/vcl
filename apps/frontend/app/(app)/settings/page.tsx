import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { defaultSettingsTab, getSettingsTabPath } from '@/components/settings-tabs'
import { getDictionary, resolveRequestLocale } from '@/i18n/dictionaries'
import { translate } from '@/i18n/messages'

export async function generateMetadata(): Promise<Metadata> {
  const locale = await resolveRequestLocale()
  const messages = await getDictionary(locale)

  return {
    title: translate(messages, 'settings.title'),
  }
}

export default function SettingsPage() {
  redirect(getSettingsTabPath(defaultSettingsTab))
}
