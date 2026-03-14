import { redirect } from 'next/navigation'
import { defaultSettingsTab, getSettingsTabPath } from '@/components/settings-tabs'

export default function SettingsPage() {
  redirect(getSettingsTabPath(defaultSettingsTab))
}
