import { MetadataRoute } from 'next'

const BASE = 'https://ach-tech.com'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE,                                   lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${BASE}/mentions-legales`,             lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.2 },
    { url: `${BASE}/politique-de-confidentialite`, lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.2 },
    { url: `${BASE}/cgu`,                          lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.2 },
  ]
}
