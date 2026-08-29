import { RequestWizard } from '@/components/forms/request-wizard';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'ثبت درخواست',
  description: 'درخواست حقوقی، کارشناسی، قراردادی یا سازمانی خود را در یک مسیر هفت‌مرحله‌ای و ساختاریافته ثبت کنید.',
  path: '/request',
});

export default function RequestPage() {
  return (
    <>
      <a className="skip-link" href="#request-wizard">رفتن به فرم ثبت درخواست</a>
      <h1 className="sr-only">ثبت درخواست حقوقی و کارشناسی</h1>
      <div id="request-wizard"><RequestWizard /></div>
    </>
  );
}
