import type { MetadataRoute } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rminu.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages = [
    { path: '', priority: 1, changeFrequency: 'weekly' as const },
    { path: '/lacan', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/alminer', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/shop', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/shop/alminer', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/about', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/business', priority: 0.6, changeFrequency: 'monthly' as const },
  ];

  return pages.map((page) => ({
    url: `${siteUrl}${page.path}`,
    lastModified: now,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
    alternates: {
      languages: {
        'ko-KR': `${siteUrl}${page.path}`,
        'en-US': `${siteUrl}${page.path}`,
        'th-TH': `${siteUrl}${page.path}`,
      },
    },
  }));
}
