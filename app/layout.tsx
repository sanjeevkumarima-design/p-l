import '../styles/globals.css'
import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import { CartProvider } from '../providers/CartProvider'
import Navbar from 'components/Navbar'
import Footer from 'components/Footer'

export const metadata: Metadata = {
  title: 'E-Commerce Store',
  description: 'Discover our amazing collection of products',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    title: 'E-Commerce Store',
    description: 'Discover our amazing collection of products',
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="h-full bg-white">
      <body className="h-full bg-gray-50">
        <CartProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 pt-20 md:pt-24">
              {children}
            </main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  )
}
