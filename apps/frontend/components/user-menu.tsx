'use client'

import { Dropdown } from '@heroui/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useI18n } from '@/i18n/use-i18n'

const LOGIN_PATH = '/login'
const SETTINGS_PATH = '/settings/general'
const SETTINGS_MENU_KEY = 'settings'
const LOGOUT_MENU_KEY = 'logout'
const TRAILING_SLASH_REGEX = /\/+$/

interface IconProps {
  className?: string
}

function LogoutIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" className={className} aria-hidden="true">
      <path d="M14 4h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4" />
      <path d="M10 17 15 12 10 7" />
      <path d="M15 12H4" />
    </svg>
  )
}

function SettingsIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" className={className} aria-hidden="true">
      <path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" />
      <path d="M19.4 15a1.1 1.1 0 0 0 .22 1.2l.04.04a1.3 1.3 0 0 1 0 1.84l-.7.7a1.3 1.3 0 0 1-1.84 0l-.04-.04a1.1 1.1 0 0 0-1.2-.22 1.1 1.1 0 0 0-.66 1v.06A1.3 1.3 0 0 1 13.92 21h-1.84a1.3 1.3 0 0 1-1.3-1.3v-.06a1.1 1.1 0 0 0-.66-1 1.1 1.1 0 0 0-1.2.22l-.04.04a1.3 1.3 0 0 1-1.84 0l-.7-.7a1.3 1.3 0 0 1 0-1.84l.04-.04A1.1 1.1 0 0 0 4.6 15a1.1 1.1 0 0 0-1-.66h-.06A1.3 1.3 0 0 1 2.2 13.04v-1.08a1.3 1.3 0 0 1 1.3-1.3h.06a1.1 1.1 0 0 0 1-.66 1.1 1.1 0 0 0-.22-1.2l-.04-.04a1.3 1.3 0 0 1 0-1.84l.7-.7a1.3 1.3 0 0 1 1.84 0l.04.04a1.1 1.1 0 0 0 1.2.22 1.1 1.1 0 0 0 .66-1V4.3A1.3 1.3 0 0 1 10.08 3h1.84a1.3 1.3 0 0 1 1.3 1.3v.06a1.1 1.1 0 0 0 .66 1 1.1 1.1 0 0 0 1.2-.22l.04-.04a1.3 1.3 0 0 1 1.84 0l.7.7a1.3 1.3 0 0 1 0 1.84l-.04.04a1.1 1.1 0 0 0-.22 1.2 1.1 1.1 0 0 0 1 .66h.06a1.3 1.3 0 0 1 1.3 1.3v1.08a1.3 1.3 0 0 1-1.3 1.3h-.06a1.1 1.1 0 0 0-1 .66Z" />
    </svg>
  )
}

function getApiBaseUrl() {
  // eslint-disable-next-line node/prefer-global/process
  const configured = process.env.NEXT_PUBLIC_API_URL

  if (configured !== undefined && configured.length > 0)
    return configured.replace(TRAILING_SLASH_REGEX, '')

  return 'http://localhost:8000'
}

const API_BASE_URL = getApiBaseUrl()

async function logout() {
  await fetch(`${API_BASE_URL}/auth/logout`, {
    method: 'POST',
    credentials: 'include',
  })
}

export function UserMenu() {
  const { t } = useI18n()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function onLogout() {
    if (isSubmitting)
      return

    setIsSubmitting(true)

    try {
      await logout()
    }
    finally {
      window.location.assign(LOGIN_PATH)
    }
  }

  return (
    <Dropdown>
      <Dropdown.Trigger
        type="button"
        aria-label={t('header.user.ariaLabel')}
        className="inline-flex items-center rounded-md border border-border/70 bg-surface px-1.5 py-1.5 text-xs font-semibold text-foreground hover:bg-default/70"
        isDisabled={isSubmitting}
      >
        <span className="inline-flex size-6 items-center justify-center rounded-full border border-border/70 bg-default-100 text-[11px] font-bold leading-none text-foreground/80">
          U
        </span>
      </Dropdown.Trigger>

      <Dropdown.Popover placement="bottom end" className="rounded-lg">
        <Dropdown.Menu aria-label={t('header.user.ariaLabel')}>
          <Dropdown.Item
            key={SETTINGS_MENU_KEY}
            textValue={t('header.user.settings')}
            className="rounded-md"
            onAction={() => router.push(SETTINGS_PATH)}
          >
            <span className="inline-flex items-center gap-2">
              <SettingsIcon className="size-4 text-foreground/65" />
              <span>{t('header.user.settings')}</span>
            </span>
          </Dropdown.Item>

          <Dropdown.Section className="mt-1 border-t border-border/70 pt-1">
            <Dropdown.Item
              key={LOGOUT_MENU_KEY}
              textValue={t('header.user.logout')}
              className="rounded-md text-danger"
              isDisabled={isSubmitting}
              onAction={() => { void onLogout() }}
            >
              <span className="inline-flex items-center gap-2">
                <LogoutIcon className="size-4 text-danger" />
                <span>{isSubmitting ? t('header.user.loggingOut') : t('header.user.logout')}</span>
              </span>
            </Dropdown.Item>
          </Dropdown.Section>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  )
}
