import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import { cn } from '@/lib/utils'
import './globals.css'

const roboto = Roboto({
  subsets: ['latin'],
  variable: '--font-sans',
  preload: false,
})

export const metadata: Metadata = {
  title: {
    default: 'Vehicle Cost Ledger',
    template: '%s | VCL',
  },
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={cn('font-sans', roboto.variable)}>
      <body>{children}</body>
    </html>
  )
}
