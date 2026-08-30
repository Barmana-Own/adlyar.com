import type { Metadata } from 'next';
import '@fontsource-variable/vazirmatn';
import { StructuredData } from '@/components/structured-data';
import { absoluteUrl, DEFAULT_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/seo';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'عدل‌یار | خدمات حقوقی و کارشناسی ساختاریافته',
    template: '%s | عدل‌یار',
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: 'عدل‌یار',
  icons: { icon: '/favicon.svg' },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'fa_IR',
    siteName: 'عدل‌یار',
    url: '/',
    title: 'عدل‌یار | راه‌حل حقوقی و کارشناسی متناسب با مسئله شما',
    description:
      'از بررسی اولیه تا ارجاع به متخصص مرتبط؛ مسیری روشن برای خدمات حقوقی و کارشناسی.',
    images: [
      {
        url: '/og.png',
        width: 1672,
        height: 941,
        alt: 'عدل‌یار؛ راه‌حل حقوقی و کارشناسی متناسب با مسئله شما',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'عدل‌یار | خدمات حقوقی و کارشناسی ساختاریافته',
    description:
      'از بررسی اولیه تا ارجاع به متخصص مرتبط؛ مسیری روشن برای خدمات حقوقی و کارشناسی.',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa-IR" dir="rtl" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('motion-ready')" }} />
      </head>
      <body>
        <StructuredData data={[
          {
            '@context': 'https://schema.org',
            '@type': 'Organization',
            '@id': `${SITE_URL}/#organization`,
            name: SITE_NAME,
            url: SITE_URL,
            logo: absoluteUrl('/logo.svg'),
          },
          {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            '@id': `${SITE_URL}/#website`,
            name: SITE_NAME,
            url: SITE_URL,
            inLanguage: 'fa-IR',
            publisher: { '@id': `${SITE_URL}/#organization` },
          },
        ]} />
        {children}
      </body>
    </html>
  );
}
