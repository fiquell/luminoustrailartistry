import { siteConfig } from '@/config/site-config'
import { MetadataRoute } from 'next'

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
