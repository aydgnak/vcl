import { AppHeader } from '@/components/app-header'
import { Providers } from './providers'
import './globals.css'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className="antialiased">
        <Providers>
          <div className="min-h-screen bg-background text-foreground">
            <AppHeader />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  )
}
