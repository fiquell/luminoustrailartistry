import { site } from '@/config/site'
import { MetadataRoute } from 'next'

const Manifest = (): MetadataRoute.Manifest => {
  return {
    name: site.name,
    short_name: site.short_name,
    description: site.description,
    icons: [
      {
        src: '/16x16.png',
        type: 'image/png',
        sizes: '16x16',
      },
      {
        src: '/32x32.png',
        type: 'image/png',
        sizes: '32x32',
      },
      {
        src: '/192x192.png',
        type: 'image/png',
        sizes: '192x192',
      },
      {
        src: '/512x512.png',
        type: 'image/png',
        sizes: '512x512',
      },
    ],
    id: '/',
    start_url: '/',
    theme_color: '#ffe6e6',
    background_color: '#ffe6e6',
    display: 'standalone',
  }
}

export default Manifest
