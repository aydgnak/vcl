'use client'

import type { AppLocale } from '@/i18n/routing'
import { LanguagesIcon } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import { setLocale } from '@/actions/set-locale'
import {
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '@/components/ui/dropdown-menu'

export function LanguageSwitcher() {
  const t = useTranslations('sidebar.footer')
  const locale = useLocale()

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        <LanguagesIcon />
        {t('language')}
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          <DropdownMenuLabel>{t('language')}</DropdownMenuLabel>
          <DropdownMenuRadioGroup
            value={locale}
            onValueChange={(value: AppLocale) => void setLocale(value)}
          >
            <DropdownMenuRadioItem value="en">
              <Image
                src="/images/flags/en.png"
                alt="English"
                width={20}
                height={20}
              />
              English
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="tr">
              <Image
                src="/images/flags/tr.png"
                alt="English"
                width={20}
                height={20}
              />
              Türkçe
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  )
}
