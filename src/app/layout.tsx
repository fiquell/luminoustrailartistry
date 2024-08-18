import { site } from '@/config/site'
import { inter } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import '@/styles/globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: site.name,
  description: site.description,
  authors: [
    {
      name: 'fiquell',
      url: 'https://fiquell.com',
    },
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
  children: React.ReactNode
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang='en'>
      <body
        className={cn(
          'bg-background text-foreground font-sans antialiased',
          inter.variable
        )}>
        {children}
      </body>
    </html>
  )
}

export default RootLayout
