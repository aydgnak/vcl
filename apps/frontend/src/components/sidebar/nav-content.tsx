'use client'

import type { Route } from 'next'
import type { ReactNode } from 'react'
import { CarIcon, LayoutDashboardIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

interface LinkType {
  href: Route
  label: string
  icon: ReactNode
}

export function NavContent() {
  const t = useTranslations('sidebar.navigation')
  const pathname = usePathname()

  const links: LinkType[] = [
    {
      href: '/dashboard',
      label: t('dashboard'),
      icon: <LayoutDashboardIcon />,
    },
    {
      href: '/car',
      label: t('car'),
      icon: <CarIcon />,
    },
  ]

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          {links.map(link => (
            <SidebarMenuItem key={link.href}>
              <SidebarMenuButton
                tooltip={link.label}
                isActive={pathname === link.href || pathname.startsWith(`${link.href}/`)}
                render={<Link href={link.href} />}
              >
                {link.icon}
                {link.label}
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
