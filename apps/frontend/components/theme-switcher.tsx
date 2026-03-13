'use client'

import { Button, useIsHydrated } from '@heroui/react'
import { useTheme } from 'next-themes'

type ThemeMode = 'system' | 'light' | 'dark'

interface IconProps {
  className?: string
}

interface ThemeOption {
  icon: (props: IconProps) => React.JSX.Element
  label: string
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
  { icon: SystemIcon, label: 'Sistem', value: 'system' },
  { icon: SunIcon, label: 'Açık', value: 'light' },
  { icon: MoonIcon, label: 'Koyu', value: 'dark' },
]

const THEME_ORDER: ThemeMode[] = ['system', 'light', 'dark']

function getNextTheme(theme: ThemeMode): ThemeMode {
  const currentIndex = THEME_ORDER.indexOf(theme)
  const nextIndex = (currentIndex + 1) % THEME_ORDER.length

  return THEME_ORDER[nextIndex]
}

export function ThemeSwitcher() {
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

  return (
    <Button
      type="button"
      isIconOnly
      size="sm"
      aria-label={`Tema: ${activeOption.label}. Sonraki: ${nextOption.label}`}
      variant="outline"
      className="rounded-xl bg-surface text-foreground hover:bg-default/70"
      onPress={() => setTheme(nextTheme)}
    >
      <ActiveIcon className="size-4" />
    </Button>
  )
}
