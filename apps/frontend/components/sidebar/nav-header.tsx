import { useTranslations } from 'next-intl'
import Image from 'next/image'
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
} from '@/components//ui/sidebar'

export function NavHeader() {
  const t = useTranslations()

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-3">
            <Image
              src="/images/logo.png"
              alt="VCL"
              width={25}
              height={25}
            />
            <span className="whitespace-nowrap text-sm group-data-[collapsible=icon]:hidden">
              {t('app.name')}
            </span>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
