import type { Route } from 'next'
import type { ReactNode } from 'react'
import { LayoutDashboardIcon } from 'lucide-react'
import Link from 'next/link'
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
  const links: LinkType[] = [
    {
      href: '/dashboard',
      label: 'Dashboard',
      icon: <LayoutDashboardIcon />,
    },
  ]

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          {links.map(link => (
            <SidebarMenuItem key={link.href}>
              <SidebarMenuButton tooltip={link.label} render={<Link href={link.href} />}>
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
