import { ArrowLeft } from 'lucide-react';

import { MotionController } from '@/components/motion-controller';
import { HeroSection } from '@/components/home/hero';
import { NeedAndInquiry } from '@/components/home/need-and-inquiry';
import { ProcessSection } from '@/components/home/process-section';
import {
  ExpertServicesSection,
  LegalServicesSection,
  SecuritySection,
  TrustStrip,
  WhyAdlyarSection,
} from '@/components/home/static-sections';
import { SiteHeader } from '@/components/site-header';

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        رفتن به محتوای اصلی
      </a>
      <SiteHeader />
      <main id="main-content">
        <HeroSection />
        <TrustStrip />
        <NeedAndInquiry />
        <LegalServicesSection />
        <ExpertServicesSection />
        <ProcessSection />
        <WhyAdlyarSection />
        <SecuritySection />
      </main>
      <a className="mobile-sticky-cta" href="#quick-request">
        ثبت درخواست
        <ArrowLeft aria-hidden="true" />
      </a>
      <MotionController />
    </>
  );
}
