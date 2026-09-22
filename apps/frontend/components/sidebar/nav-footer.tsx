'use client'

import { ChevronsUpDownIcon } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import { useSidebar } from '@/components/ui/sidebar-context'
import { LanguageSwitcher } from './footer/language-switcher'
import { LogoutButton } from './footer/logout-button'
import { ThemeSwitcher } from './footer/theme-switcher'

export function NavFooter() {
  const { isMobile } = useSidebar()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger render={(
            <SidebarMenuButton size="lg">
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">Name Surname</span>
                <span className="truncate text-xs">name.surname@mail.com</span>
              </div>
              <ChevronsUpDownIcon className="ml-auto size-4" />
            </SidebarMenuButton>
          )}
          />
          <DropdownMenuContent
            side={isMobile ? 'bottom' : 'right'}
            className="data-[side=bottom]:w-64 data-[side=right]:w-fit"
          >
            <DropdownMenuGroup>
              <LanguageSwitcher />
              <ThemeSwitcher />
              <DropdownMenuSeparator />
              <LogoutButton />
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
