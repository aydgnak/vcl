import Link from 'next/link'
import { UserMenu } from '@/components/user-menu'

export function AppHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-border/70 bg-surface/80 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="text-xs font-semibold uppercase tracking-[0.16em] text-foreground/60 transition hover:text-foreground/85">
          VCL
        </Link>

        <div className="flex items-center gap-2">
          <UserMenu />
        </div>
      </div>
    </header>
  )
}
