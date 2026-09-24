import { cookies } from 'next/headers'
import { AppSidebar } from '@/components/sidebar/app'
import { Separator } from '@/components/ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

export default async function ProtectedLayout({ children }: LayoutProps<'/'>) {
  const cookieStore = await cookies()

  const sidebarDefaultOpen = (cookieStore.get('sidebar_state')?.value ?? 'true') === 'true'

  return (
    <SidebarProvider defaultOpen={sidebarDefaultOpen}>
      <AppSidebar />
      <SidebarInset>
        <header className="p-4">
          <SidebarTrigger />
        </header>
        <Separator />
        <main className="p-4">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
