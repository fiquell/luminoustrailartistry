import { MetadataRoute } from 'next'

import { siteConfig } from '@/config/site-config'

const robots = (): MetadataRoute.Robots => {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '',
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  }
}

export default robots
