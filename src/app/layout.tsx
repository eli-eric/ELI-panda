import './globals.css'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Panda App - Privacy Policy',
  description:
    'Privacy Policy for Panda App - Internal spare parts management system for ELI facilities',
  robots: {
    index: false,
    follow: false
  }
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">{children}</body>
    </html>
  )
}
