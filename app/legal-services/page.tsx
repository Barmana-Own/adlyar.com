import type { Metadata } from 'next';

import { CTASection, PageHero } from '@/components/page-elements';
import { ServiceListing } from '@/components/service-listing';
import { SiteShell } from '@/components/site-shell';

export const metadata: Metadata = {
  title: 'خدمات حقوقی',
  description: 'مشاوره، قرارداد، ملک، خانواده، کیفری، تجاری، وصول مطالبات و امور شرکت‌ها با بررسی اولیه ساختاریافته.',
  alternates: { canonical: '/legal-services' },
};

export default function LegalServicesPage() {
  return (
    <SiteShell>
      <PageHero kicker="خدمات حقوقی" title="مسیر حقوقی متناسب با موقعیت شما" description="موضوع، فوریت و مدارک اولیه بررسی می‌شود تا خدمت و دامنه مناسب پیش از شروع روشن باشد.">
        <div className="inner-hero__actions"><a className="button button--primary button--large" href="/request?type=legal">ثبت درخواست حقوقی</a><a className="button button--outline button--large" href="/book">رزرو مشاوره</a></div>
      </PageHero>
      <ServiceListing kind="legal" />
      <CTASection />
    </SiteShell>
  );
}
