import { siteConfig } from '@/config/site-config'
import { MetadataRoute } from 'next'

const manifest = (): MetadataRoute.Manifest => {
  return {
    name: siteConfig.name,
    short_name: siteConfig.short_name,
    description: siteConfig.description,
    icons: [
      {
        src: `${siteConfig.url}/16x16.png`,
        type: 'image/png',
        sizes: '16x16',
      },
      {
        src: `${siteConfig.url}/32x32.png`,
        type: 'image/png',
        sizes: '32x32',
      },
      {
        src: `${siteConfig.url}/192x192.png`,
        type: 'image/png',
        sizes: '192x192',
      },
      {
        src: `${siteConfig.url}/512x512.png`,
        type: 'image/png',
        sizes: '512x512',
      },
    ],
    id: '/',
    start_url: '/',
    theme_color: siteConfig.color,
    background_color: siteConfig.color,
    display: 'standalone',
  }
}

export default manifest
