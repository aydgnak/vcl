'use client'

import { Button, useIsHydrated } from '@heroui/react'
import { useTheme } from 'next-themes'
import { useI18n } from '@/i18n/use-i18n'

type ThemeMode = 'system' | 'light' | 'dark'

interface IconProps {
  className?: string
}

interface ThemeOption {
  icon: (props: IconProps) => React.JSX.Element
  labelKey: string
  value: ThemeMode
}

function SystemIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M8 20h8" />
      <path d="M12 16v4" />
    </svg>
  )
}

function SunIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2.5" />
      <path d="M12 19v2.5" />
      <path d="M4.9 4.9l1.8 1.8" />
      <path d="M17.3 17.3l1.8 1.8" />
      <path d="M2.5 12H5" />
      <path d="M19 12h2.5" />
      <path d="M4.9 19.1l1.8-1.8" />
      <path d="M17.3 6.7l1.8-1.8" />
    </svg>
  )
}

function MoonIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
      <path d="M20 14.2A8 8 0 1 1 9.8 4 6.6 6.6 0 1 0 20 14.2z" />
    </svg>
  )
}

const THEME_OPTIONS: ThemeOption[] = [
  { icon: SystemIcon, labelKey: 'header.theme.system', value: 'system' },
  { icon: SunIcon, labelKey: 'header.theme.light', value: 'light' },
  { icon: MoonIcon, labelKey: 'header.theme.dark', value: 'dark' },
]

const THEME_ORDER: ThemeMode[] = ['system', 'light', 'dark']

function getNextTheme(theme: ThemeMode): ThemeMode {
  const currentIndex = THEME_ORDER.indexOf(theme)
  const nextIndex = (currentIndex + 1) % THEME_ORDER.length

  return THEME_ORDER[nextIndex]
}

export function ThemeSwitcher() {
  const { t } = useI18n()
  const { setTheme, theme } = useTheme()
  const isHydrated = useIsHydrated()

  const selectedTheme = theme === 'light' || theme === 'dark' || theme === 'system'
    ? theme
    : 'system'

  const renderedTheme = isHydrated ? selectedTheme : 'system'

  const activeOption = THEME_OPTIONS.find(option => option.value === renderedTheme) ?? THEME_OPTIONS[0]
  const nextTheme = getNextTheme(renderedTheme)
  const nextOption = THEME_OPTIONS.find(option => option.value === nextTheme) ?? THEME_OPTIONS[0]
  const ActiveIcon = activeOption.icon
  const activeLabel = t(activeOption.labelKey)
  const nextLabel = t(nextOption.labelKey)

  return (
    <Button
      type="button"
      isIconOnly
      size="sm"
      aria-label={t('header.theme.ariaLabel', { current: activeLabel, next: nextLabel })}
      variant="outline"
      className="rounded-md bg-surface text-foreground hover:bg-default/70"
      onPress={() => setTheme(nextTheme)}
    >
      <ActiveIcon className="size-4" />
    </Button>
  )
}
