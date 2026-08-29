import type { Metadata } from 'next';

import { CTASection, PageHero } from '@/components/page-elements';
import { ServiceListing } from '@/components/service-listing';
import { SiteShell } from '@/components/site-shell';

export const metadata: Metadata = {
  title: 'خدمات کارشناسی',
  description: 'خدمات کارشناسی ملک، ارزیابی، خسارت، خودرو، مالی، فنی، پیمان و فناوری اطلاعات با دامنه روشن.',
  alternates: { canonical: '/expert-services' },
};

export default function ExpertServicesPage() {
  return (
    <SiteShell>
      <PageHero kicker="خدمات کارشناسی" title="بررسی تخصصی بر پایه سؤال و شواهد" description="ورودی‌ها، نیاز به بازدید، روش بررسی، خروجی و محدودیت‌های هر کارشناسی پیش از شروع مشخص می‌شود.">
        <div className="inner-hero__actions"><a className="button button--primary button--large" href="/request?type=expert">ثبت درخواست کارشناسی</a><a className="button button--outline button--large" href="/faq">پرسش‌های متداول</a></div>
      </PageHero>
      <ServiceListing kind="expert" />
      <CTASection />
    </SiteShell>
  );
}
