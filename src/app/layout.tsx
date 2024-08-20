import { site } from '@/config/site'
import { inter } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import '@/styles/globals.css'
import type { Metadata } from 'next'
import { ReactNode } from 'react'

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.name,
  description: site.description,
  authors: [
    {
      url: 'https://fiquell.com',
      name: 'fiquell',
    },
  ],
  keywords: [
    'Next.js',
    'React',
    'Tailwind CSS',
    '2D Context Graphics',
    'Interactive Canvas Animation',
    'JavaScript Drawing Effects',
  ],
  creator: 'fiquell',
  openGraph: {
    type: 'website',
    url: site.url,
    title: site.name,
    description: site.description,
    siteName: site.name,
    images: [
      {
        url: site.opengraph_image,
        type: 'image/png',
        width: 1200,
        height: 630,
        alt: site.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@_fiquell',
    title: site.name,
    description: site.description,
    images: site.opengraph_image,
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

interface RootLayoutProps {
  children: ReactNode
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang='en'>
      <body
        className={cn(
          'bg-background font-sans text-foreground antialiased',
          inter.variable
        )}>
        <main className='container'>{children}</main>
      </body>
    </html>
  )
}

export default RootLayout
