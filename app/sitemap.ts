import type { MetadataRoute } from 'next';
import { articles, expertServiceRecords, legalServiceRecords } from '@/lib/site-data';
import { SITE_URL } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_URL;
  const fixed = ['', '/legal-services', '/expert-services', '/corporate', '/request', '/experts', '/knowledge', '/faq', '/glossary', '/about', '/join', '/contact', '/book', '/contract-review'];
  return [
    ...fixed.map((path) => ({ url: `${base}${path}`, changeFrequency: path === '' ? 'weekly' as const : 'monthly' as const, priority: path === '' ? 1 : 0.7 })),
    ...legalServiceRecords.map(({ slug }) => ({ url: `${base}/legal-services/${slug}`, changeFrequency: 'monthly' as const, priority: 0.8 })),
    ...expertServiceRecords.map(({ slug }) => ({ url: `${base}/expert-services/${slug}`, changeFrequency: 'monthly' as const, priority: 0.8 })),
    ...articles.map(({ slug }) => ({ url: `${base}/knowledge/${slug}`, changeFrequency: 'monthly' as const, priority: 0.6 })),
  ];
}
