'use client'

import { LogOutIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'

export function LogoutButton() {
  const router = useRouter()
  const t = useTranslations('sidebar.footer')

  async function handleLogout() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    })

    if (!response.ok) {
      throw new Error('Logout Failed')
    }

    router.replace('/login')
  }

  return (
    <DropdownMenuItem
      variant="destructive"
      onClick={() => void handleLogout()}
    >
      <LogOutIcon />
      {t('logout')}
    </DropdownMenuItem>
  )
}
