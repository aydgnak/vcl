import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { SettingsPanel } from '@/components/settings-panel'
import { defaultSettingsTab, getSettingsTabPath, isSettingsTab } from '@/components/settings-tabs'
import { getDictionary, resolveRequestLocale } from '@/i18n/dictionaries'
import { translate } from '@/i18n/messages'

interface SettingsTabPageProps {
  params: Promise<{
    tab: string
  }>
}

export async function generateMetadata({ params }: SettingsTabPageProps): Promise<Metadata> {
  const { tab } = await params
  const locale = await resolveRequestLocale()
  const messages = await getDictionary(locale)
  const settingsTitle = translate(messages, 'settings.title')

  if (!isSettingsTab(tab)) {
    return {
      title: settingsTitle,
    }
  }

  return {
    title: `${translate(messages, `settings.tabs.${tab}`)} ${settingsTitle}`,
  }
}

export default async function SettingsTabPage({ params }: SettingsTabPageProps) {
  const { tab } = await params

  if (!isSettingsTab(tab)) {
    redirect(getSettingsTabPath(defaultSettingsTab))
  }

  return (
    <main className="min-h-[calc(100dvh-4rem)] px-4 py-8 sm:px-6">
      <SettingsPanel activeTab={tab} />
    </main>
  )
}
