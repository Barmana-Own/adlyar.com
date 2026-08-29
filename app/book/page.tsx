import type { Metadata } from 'next';
import { CalendarDays, Clock3, MessageSquareText, ShieldCheck } from 'lucide-react';

import { LeadForm } from '@/components/forms/lead-form';
import { PageHero } from '@/components/page-elements';
import { SiteShell } from '@/components/site-shell';

export const metadata: Metadata = { title: 'رزرو مشاوره', description: 'درخواست مشاوره تلفنی، آنلاین، حضوری، مکتوب یا سازمانی با تاریخ و ساعت ترجیحی.', alternates: { canonical: '/book' } };

export default function BookPage() {
  return <SiteShell><PageHero kicker="رزرو مشاوره" title="زمان و شیوه مناسب گفت‌وگو را پیشنهاد دهید" description="نوع مشاوره، موضوع، تاریخ و ساعت ترجیحی را ثبت کنید. زمان نهایی پس از بررسی ظرفیت تأیید می‌شود." /><section className="section booking-section"><div className="container booking-layout"><aside><div><MessageSquareText /><strong>نوع مشاوره</strong><p>تلفنی، آنلاین، حضوری، مکتوب یا سازمانی</p></div><div><CalendarDays /><strong>تاریخ ترجیحی</strong><p>انتخاب شما تا پاسخ سامانه، رزرو قطعی نیست.</p></div><div><Clock3 /><strong>بازه زمانی</strong><p>همه زمان‌ها بر اساس منطقه زمانی تهران نمایش داده می‌شوند.</p></div><div><ShieldCheck /><strong>محرمانگی</strong><p>شرح مسئله فقط برای بررسی همین درخواست استفاده می‌شود.</p></div></aside><LeadForm mode="book" /></div></section></SiteShell>;
}
