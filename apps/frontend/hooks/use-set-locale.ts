'use client'

import type { AppLocale } from '@/i18n/routing'
import { useRouter } from 'next/navigation'

export function useSetLocale() {
  const router = useRouter()

  return (locale: AppLocale) => {
    document.cookie = `lang=${locale}; path=/; samesite=lax`

    router.refresh()
  }
}
