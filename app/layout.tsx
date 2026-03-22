import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/Header'

export const metadata: Metadata = {
  title: 'Van Lumban | Senior Android Developer',
  description: 'Senior Android Developer with 7+ years building production apps.'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Header />
        <main className="pt-16">
          {children}
        </main>
      </body>
    </html>
  )
}
