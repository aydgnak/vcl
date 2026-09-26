'use client'

import { LogOutIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { logoutAction } from '@/actions/auth'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'

export function LogoutButton() {
  const t = useTranslations('sidebar.footer')

  return (
    <DropdownMenuItem
      variant="destructive"
      onClick={() => void logoutAction()}
    >
      <LogOutIcon />
      {t('logout')}
    </DropdownMenuItem>
  )
}
