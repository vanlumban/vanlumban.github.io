import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Van Lumban',
  description: 'Android Developer'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
