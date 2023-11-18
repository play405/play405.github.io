import { designers } from '@/lib/designer';
import { MetadataRoute } from 'next';

const baseUrl = 'https://play405.github.io';

export default function sitemap(): MetadataRoute.Sitemap {
  const works = designers.map(designer => ({
    url: `${baseUrl}/works/${designer.id}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1,
  })) as MetadataRoute.Sitemap;

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/works`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...works,
    {
      url: `${baseUrl}/designers`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
  ];
}
