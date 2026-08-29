import type { Metadata } from 'next';
import '@fontsource-variable/vazirmatn';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://adlyar.com'),
  title: {
    default: 'عدل‌یار | خدمات حقوقی و کارشناسی ساختاریافته',
    template: '%s | عدل‌یار',
  },
  description:
    'مسئله حقوقی یا کارشناسی خود را ساختاریافته ثبت کنید تا برای بررسی اولیه و ارجاع به متخصص مرتبط آماده شود.',
  applicationName: 'عدل‌یار',
  icons: { icon: '/favicon.svg' },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'fa_IR',
    siteName: 'عدل‌یار',
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
    <html lang="fa-IR" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
