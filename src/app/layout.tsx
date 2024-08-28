import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google'
import { siteConfig } from '@/config/site-config'
import { inter } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import '@/styles/globals.css'
import { Metadata } from 'next'
import { ReactNode } from 'react'

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.name,
  description: siteConfig.description,
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
    'Framer Motion',
    '2D Context Graphics',
    'Interactive Canvas Animation',
    'JavaScript Drawing Effects',
  ],
  creator: 'fiquell',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.opengraph_image,
        type: 'image/png',
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@_fiquell',
    title: siteConfig.name,
    description: siteConfig.description,
    images: siteConfig.opengraph_image,
  },
  icons: {
    icon: `${siteConfig.url}/favicon.ico`,
    apple: `${siteConfig.url}/apple-touch-icon.png`,
  },
}

interface RootLayoutProps {
  children: ReactNode
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang='en'>
      <GoogleAnalytics gaId='G-290KN8LRVJ' />
      <GoogleTagManager gtmId='GTM-PZ9C7MSZ' />
      <body
        className={cn(
          'bg-background font-sans text-foreground antialiased',
          inter.variable
        )}>
        <main>{children}</main>
      </body>
    </html>
  )
}

export default RootLayout
