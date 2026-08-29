import type { Metadata } from 'next';

export const SITE_NAME = 'عدل‌یار';
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL?.trim() || 'https://adlyar.rahbord-3066.chatgpt.site').replace(/\/$/, '');
export const DEFAULT_DESCRIPTION = 'مسئله حقوقی یا کارشناسی خود را ساختاریافته ثبت کنید تا برای بررسی اولیه و ارجاع به متخصص مرتبط آماده شود.';

export function absoluteUrl(path = '/') {
  return new URL(path, `${SITE_URL}/`).toString();
}

export function createPageMetadata({
  title,
  description,
  path,
  type = 'website',
  noIndex = false,
}: {
  title: string;
  description: string;
  path: string;
  type?: 'website' | 'article';
  noIndex?: boolean;
}): Metadata {
  const url = absoluteUrl(path);
  const socialTitle = `${title} | ${SITE_NAME}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    robots: noIndex ? { index: false, follow: true } : undefined,
    openGraph: {
      type,
      locale: 'fa_IR',
      siteName: SITE_NAME,
      url,
      title: socialTitle,
      description,
      images: [{ url: absoluteUrl('/og.png'), width: 1672, height: 941, alt: `${title}؛ ${SITE_NAME}` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: socialTitle,
      description,
      images: [absoluteUrl('/og.png')],
    },
  };
}

type BreadcrumbItem = { label: string; path: string };

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqSchema(items: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}
