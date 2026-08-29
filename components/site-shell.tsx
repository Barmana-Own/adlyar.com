import { ArrowLeft } from 'lucide-react';

import { MotionController } from '@/components/motion-controller';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a className="skip-link" href="#main-content">
        رفتن به محتوای اصلی
      </a>
      <SiteHeader />
      <main id="main-content">{children}</main>
      <SiteFooter />
      <a className="mobile-sticky-cta" href="/request">
        ثبت درخواست
        <ArrowLeft aria-hidden="true" />
      </a>
      <MotionController />
    </>
  );
}
