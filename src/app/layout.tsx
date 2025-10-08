import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import { APP_CONFIG } from '@/lib/constants'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: APP_CONFIG.name,
  description: APP_CONFIG.description,
  keywords: ['AI', 'Companion', 'Chat', 'Productivity', 'Social'],
  authors: [{ name: APP_CONFIG.author }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#3b82f6',
  manifest: '/manifest.json',
  openGraph: {
    title: APP_CONFIG.name,
    description: APP_CONFIG.description,
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: APP_CONFIG.name,
    description: APP_CONFIG.description,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content={APP_CONFIG.name} />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className={`${inter.className} h-full antialiased`}>
        <div id="root" className="h-full">
          {children}
        </div>
      </body>
    </html>
  )
}
