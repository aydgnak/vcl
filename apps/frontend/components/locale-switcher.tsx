'use client'

import type { Locale } from '@/i18n/config'
import { Dropdown } from '@heroui/react'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { localeMeta, locales } from '@/i18n/config'
import { useI18n } from '@/i18n/use-i18n'

interface IconProps {
  className?: string
}

const LOCALE_MENU_ARIA_LABEL = 'Language / Dil'

function ChevronDownIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

async function setLocale(locale: Locale) {
  const response = await fetch('/api/locale', {
    body: JSON.stringify({ locale }),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  })

  if (!response.ok)
    throw new Error('Failed to update locale')
}

export function LocaleSwitcher() {
  const { locale: activeLocale } = useI18n()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const activeOption = localeMeta[activeLocale]

  function onLocaleChange(locale: Locale) {
    if (locale === activeLocale)
      return

    startTransition(async () => {
      await setLocale(locale)
      router.refresh()
    })
  }

  return (
    <Dropdown>
      <Dropdown.Trigger
        type="button"
        aria-label={LOCALE_MENU_ARIA_LABEL}
        className="inline-flex items-center gap-2 rounded-xl border border-border/70 bg-surface px-2.5 py-1.5 text-xs font-semibold tracking-wide text-foreground hover:bg-default/70"
        isDisabled={isPending}
      >
        <span className="inline-flex items-center gap-2">
          <span aria-hidden="true">{activeOption.flag}</span>
          <ChevronDownIcon className="size-3 text-foreground/60" />
        </span>
      </Dropdown.Trigger>

      <Dropdown.Popover placement="bottom end">
        <Dropdown.Menu
          aria-label={LOCALE_MENU_ARIA_LABEL}
          className="min-w-40"
          disallowEmptySelection
          selectedKeys={[activeLocale]}
          selectionMode="single"
        >
          {locales.map((locale) => {
            const option = localeMeta[locale]
            const isActive = locale === activeLocale

            return (
              <Dropdown.Item
                key={locale}
                textValue={option.label}
                aria-label={option.label}
                onAction={() => onLocaleChange(locale)}
                className={isActive ? 'bg-default/40' : undefined}
              >
                <span className={isActive ? 'flex items-center gap-2 text-sm font-semibold' : 'flex items-center gap-2 text-sm'}>
                  <span aria-hidden="true">{option.flag}</span>
                  <span>{option.label}</span>
                </span>
              </Dropdown.Item>
            )
          })}
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  )
}
