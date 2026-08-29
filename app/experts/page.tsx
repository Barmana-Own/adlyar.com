import type { Metadata } from 'next';

import { ExpertListing } from '@/components/expert-listing';
import { CTASection, PageHero } from '@/components/page-elements';
import { SiteShell } from '@/components/site-shell';

export const metadata: Metadata = {
  title: 'شبکه متخصصان',
  description: 'ساختار جستجو و ارجاع به متخصص متناسب با موضوع، شهر و نوع خدمت؛ بدون نمایش داده یا صلاحیت تأییدنشده.',
  alternates: { canonical: '/experts' },
};

export default function ExpertsPage() {
  return (
    <SiteShell>
      <PageHero kicker="شبکه متخصصان" title="تخصص مرتبط، با اطلاعات قابل راستی‌آزمایی" description="پروفایل‌ها فقط با داده رسمی و تأییدشده منتشر می‌شوند. تا زمان اتصال پایگاه داده، از نام، تصویر، سابقه یا مجوز ساختگی استفاده نمی‌کنیم.">
        <div className="inner-hero__actions"><a className="button button--primary button--large" href="/request">ثبت مسئله برای ارجاع</a><a className="button button--outline button--large" href="/join">درخواست همکاری متخصصان</a></div>
      </PageHero>
      <ExpertListing />
      <CTASection title="متخصص مناسب را از روی عنوان حدس نزنید" description="مسئله را ثبت کنید تا نوع تخصص و دامنه خدمت در بررسی اولیه مشخص شود." />
    </SiteShell>
  );
}
