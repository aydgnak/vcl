import { AppHeader } from '@/components/app-header'
import { getDictionary, resolveRequestLocale } from '@/i18n/dictionaries'
import { Providers } from './providers'
import './globals.css'

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await resolveRequestLocale()
  const messages = await getDictionary(locale)

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="antialiased">
        <Providers locale={locale} messages={messages}>
          <div className="min-h-screen bg-background text-foreground">
            <AppHeader />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  )
}
