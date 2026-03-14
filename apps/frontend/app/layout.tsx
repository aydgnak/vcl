import type { Metadata } from 'next'
import { getDictionary, resolveRequestLocale } from '@/i18n/dictionaries'
import { Providers } from './providers'
import './globals.css'

export const metadata: Metadata = {
  title: 'VCL',
}

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
            {children}
          </div>
        </Providers>
      </body>
    </html>
  )
}
