import type { Metadata } from 'next'

import Footer from '@/components/Footer/Footer'
import Header from '@/components/Header/Header'
import SearchInput from '@/components/Search/SearchInput'
import { CartProvider } from '@/hooks/cart'
import { SearchProvider } from '@/hooks/search'
import { fontSans } from '@/libs/fonts'
import { cn } from '@/libs/utils'

import './globals.css'

export const metadata: Metadata = {
  title: 'SawMovie',
  description: 'A Movie Catalog',
  icons: '/favicon.ico',
  manifest: '/site.webmanifest'
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
        <CartProvider>
          <SearchProvider>
            <div data-testid="layout-header">
              <Header />
            </div>
            <main>{children}</main>
            <div data-testid="layout-footer">
              <Footer />
            </div>
            <SearchInput />
          </SearchProvider>
        </CartProvider>
      </body>
    </html>
  )
}
