import type { MetadataRoute } from 'next';
import { articles, expertProfiles, expertServiceRecords, legalServiceRecords } from '@/lib/site-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://adlyar.com';
  const fixed = ['', '/legal-services', '/expert-services', '/corporate', '/request', '/experts', '/knowledge', '/faq', '/glossary', '/about', '/join', '/contact', '/book', '/contract-review', '/legal', '/terms', '/privacy', '/disclaimer'];
  return [
    ...fixed.map((path) => ({ url: `${base}${path}`, changeFrequency: path === '' ? 'weekly' as const : 'monthly' as const, priority: path === '' ? 1 : 0.7 })),
    ...legalServiceRecords.map(({ slug }) => ({ url: `${base}/legal-services/${slug}`, changeFrequency: 'monthly' as const, priority: 0.8 })),
    ...expertServiceRecords.map(({ slug }) => ({ url: `${base}/expert-services/${slug}`, changeFrequency: 'monthly' as const, priority: 0.8 })),
    ...expertProfiles.map(({ slug }) => ({ url: `${base}/experts/${slug}`, changeFrequency: 'monthly' as const, priority: 0.5 })),
    ...articles.map(({ slug }) => ({ url: `${base}/knowledge/${slug}`, changeFrequency: 'monthly' as const, priority: 0.6 })),
  ];
}
