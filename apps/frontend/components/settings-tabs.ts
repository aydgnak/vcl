export const settingsTabKeys = ['general', 'security'] as const

export type SettingsTab = (typeof settingsTabKeys)[number]

export const defaultSettingsTab: SettingsTab = 'general'

export function isSettingsTab(value: string): value is SettingsTab {
  return settingsTabKeys.includes(value as SettingsTab)
}

export function getSettingsTabPath(tab: SettingsTab) {
  return `/settings/${tab}`
}
