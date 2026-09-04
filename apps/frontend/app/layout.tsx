import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { Roboto } from 'next/font/google'
import { Toaster } from '@/components/ui/toast'
import { cn } from '@/lib/utils'
import './globals.css'

const roboto = Roboto({
  subsets: ['latin'],
  variable: '--font-sans',
  preload: false,
})

export async function generateMetadata() {
  const t = await getTranslations('app')

  return {
    title: {
      default: t('name'),
      template: '%s | VCL',
    },
  } satisfies Metadata
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={cn('font-sans', roboto.variable)}>
      <body>
        <NextIntlClientProvider>
          {children}
          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
