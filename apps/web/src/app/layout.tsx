import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AgriLink LOP',
  description: 'Logistics Operations Platform',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
