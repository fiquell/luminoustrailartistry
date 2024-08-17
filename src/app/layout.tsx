import { inter } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import '@/styles/globals.css'
import type { Metadata } from 'next'

export const metadata = {
  title: 'Luminous Trail Artistry',
  description: 'Gracefully illuminating cursor movements',
  icons: {
    icon: '/favicon.ico',
  },
} satisfies Metadata

interface RootLayoutProps {
  children: React.ReactNode
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang='en'>
      <body className={cn('font-sans antialiased', inter.variable)}>
        {children}
      </body>
    </html>
  )
}

export default RootLayout
