import type { Metadata } from 'next';

import { RequestWizard } from '@/components/forms/request-wizard';

export const metadata: Metadata = {
  title: 'ثبت درخواست',
  description: 'درخواست حقوقی، کارشناسی، قراردادی یا سازمانی خود را در یک مسیر هفت‌مرحله‌ای و ساختاریافته ثبت کنید.',
  alternates: { canonical: '/request' },
};

export default function RequestPage() {
  return (
    <>
      <a className="skip-link" href="#request-wizard">رفتن به فرم ثبت درخواست</a>
      <div id="request-wizard"><RequestWizard /></div>
    </>
  );
}
