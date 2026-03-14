import { LocaleSwitcher } from '@/components/locale-switcher'
import { ThemeSwitcher } from '@/components/theme-switcher'

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-transparent text-foreground">
      <div className="relative flex min-h-screen w-full flex-col">
        <header className="bg-transparent">
          <div className="flex h-16 w-full items-center justify-end px-4 sm:px-6">
            <div className="flex items-center gap-2">
              <LocaleSwitcher />
              <ThemeSwitcher />
            </div>
          </div>
        </header>

        <div className="flex flex-1 items-center justify-center px-4 py-8 sm:px-6">
          {children}
        </div>
      </div>
    </main>
  )
}
