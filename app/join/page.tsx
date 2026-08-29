import { BadgeCheck, FileCheck2, Network, ShieldCheck } from 'lucide-react';

import { LeadForm } from '@/components/forms/lead-form';
import { PageHero, SectionHeader } from '@/components/page-elements';
import { SiteShell } from '@/components/site-shell';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({ title: 'همکاری با عدل‌یار', description: 'درخواست همکاری و بررسی اطلاعات حرفه‌ای متخصصان حقوقی و کارشناسی.', path: '/join' });

export default function JoinPage() {
  return <SiteShell><PageHero kicker="همکاری حرفه‌ای" title="عضویت در شبکه‌ای که داده و دامنه را جدی می‌گیرد" description="درخواست همکاری به معنی پذیرش خودکار یا نمایش عمومی پروفایل نیست. اطلاعات حرفه‌ای و تعارض منافع باید جداگانه بررسی شوند." /><section className="section join-principles"><div className="container"><SectionHeader kicker="اصول همکاری" title="پیش از اتصال به یک درخواست" /><div className="trust-card-grid">{[[BadgeCheck, 'راستی‌آزمایی', 'اطلاعات هویتی و حرفه‌ای پیش از انتشار کنترل می‌شود.'], [Network, 'تطبیق تخصص', 'ارجاع بر اساس موضوع و دامنه انجام می‌شود.'], [FileCheck2, 'دامنه روشن', 'ورودی، خروجی و محدودیت خدمت مشخص می‌شود.'], [ShieldCheck, 'محرمانگی', 'دسترسی فقط در حد نیاز هر درخواست تعریف می‌شود.']].map(([Icon, title, description]) => <article key={title as string}><span>{typeof Icon !== 'string' && <Icon />}</span><h3>{title as string}</h3><p>{description as string}</p></article>)}</div></div></section><section className="section lead-section"><div className="container lead-section__layout"><div><span className="section-kicker">درخواست عضویت</span><h2>اطلاعات اولیه همکاری</h2><p>حوزه تخصص، شهر و سابقه خود را ثبت کنید. مدارک حرفه‌ای در مرحله امن و جداگانه درخواست می‌شوند.</p></div><LeadForm mode="join" /></div></section></SiteShell>;
}
