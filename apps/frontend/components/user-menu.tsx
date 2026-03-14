'use client'

import { Dropdown } from '@heroui/react'
import { useState } from 'react'
import { useI18n } from '@/i18n/use-i18n'

const LOGIN_PATH = '/login'
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
            key={LOGOUT_MENU_KEY}
            textValue={t('header.user.logout')}
            className="rounded-md"
            isDisabled={isSubmitting}
            onAction={() => { void onLogout() }}
          >
            <span className="inline-flex items-center gap-2">
              <LogoutIcon className="size-4 text-foreground/65" />
              <span>{isSubmitting ? t('header.user.loggingOut') : t('header.user.logout')}</span>
            </span>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  )
}
