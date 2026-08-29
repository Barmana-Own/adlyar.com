import type { Metadata } from 'next';
import { FileCheck2, ScanSearch, ShieldCheck } from 'lucide-react';

import { ContractReviewForm } from '@/components/forms/contract-review-form';
import { PageHero } from '@/components/page-elements';
import { SiteShell } from '@/components/site-shell';

export const metadata: Metadata = { title: 'بررسی قرارداد', description: 'ثبت ساختاریافته نوع قرارداد، طرفین، هدف، مرحله، فایل، مهلت و نگرانی اصلی برای بررسی اولیه.', alternates: { canonical: '/contract-review' } };

export default function ContractReviewPage() {
  return <SiteShell><PageHero kicker="بررسی قرارداد" title="پیش از امضا یا اقدام، نقاط مبهم را روشن کنید" description="نسخه قرارداد، هدف رابطه، مرحله فعلی و نگرانی اصلی را ثبت کنید تا دامنه بررسی و زمان‌بندی مشخص شود." /><section className="section contract-review-section"><div className="container booking-layout"><aside><div><FileCheck2 /><strong>نسخه قابل بررسی</strong><p>فایل اصلی و فقط پیوست‌های مرتبط را انتخاب کنید.</p></div><div><ScanSearch /><strong>دامنه متناسب</strong><p>از گزارش ریسک تا بازنویسی، سطح بررسی پیش از شروع توافق می‌شود.</p></div><div><ShieldCheck /><strong>فایل غیرعمومی</strong><p>هیچ فایل ارسالی Public URL فرض نمی‌شود.</p></div></aside><ContractReviewForm /></div></section></SiteShell>;
}
