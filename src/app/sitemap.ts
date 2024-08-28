import { siteConfig } from '@/config/site-config'
import { MetadataRoute } from 'next'

const sitemap = (): MetadataRoute.Sitemap => {
  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
  ]
}

export default sitemap
