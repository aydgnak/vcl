import { redirect } from 'next/navigation'
import { SettingsPanel } from '@/components/settings-panel'
import { defaultSettingsTab, getSettingsTabPath, isSettingsTab } from '@/components/settings-tabs'

interface SettingsTabPageProps {
  params: Promise<{
    tab: string
  }>
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
