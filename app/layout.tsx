import type { Metadata } from 'next'

import Footer from '@/components/Footer/Footer'
import Header from '@/components/Header/Header'
import { fontSans } from '@/libs/fonts'
import { cn } from '@/libs/utils'

import './globals.css'

export const metadata: Metadata = {
  title: 'SawMovie',
  description: 'A Movie Catalog'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          'bg-background font-sans antialiased box-border',
          fontSans.variable
        )}
        suppressHydrationWarning
      >
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
