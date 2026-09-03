'use client'

import type { AppLocale } from '@/i18n/routing'
import { useLocale } from 'next-intl'
import { Button } from '@/components/ui/button'
import { useSetLocale } from '@/hooks/use-set-locale'

const locales = [
  { code: 'en', flag: '🇬🇧', label: 'English' },
  { code: 'tr', flag: '🇹🇷', label: 'Türkçe' },
] as const satisfies ReadonlyArray<{ code: AppLocale, flag: string, label: string }>

export function LocaleSwitcher() {
  const locale = useLocale()
  const setLocale = useSetLocale()

  return (
    <div className="flex translate-x-px justify-end" role="group">
      {locales.map(({ code, flag, label }) => {
        const isSelected = locale === code

        return (
          <Button
            aria-pressed={isSelected}
            className={isSelected ? 'cursor-pointer border-x-foreground/10 border-t-foreground/10 border-b-transparent' : 'cursor-pointer'}
            key={code}
            onClick={() => {
              if (!isSelected) {
                setLocale(code)
              }
            }}
            size="xs"
            type="button"
            variant={isSelected ? 'outline' : 'secondary'}
          >
            <span aria-hidden="true">{flag}</span>
            {label}
          </Button>
        )
      })}
    </div>
  )
}
