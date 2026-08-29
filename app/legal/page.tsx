import { FileText, ShieldCheck, TriangleAlert } from 'lucide-react';

import { PageHero } from '@/components/page-elements';
import { SiteShell } from '@/components/site-shell';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({ title: 'اسناد حقوقی', description: 'شرایط استفاده، حریم خصوصی و سلب مسئولیت عدل‌یار.', path: '/legal', noIndex: true });

export default function LegalIndexPage() {
  return <SiteShell><PageHero kicker="اسناد حقوقی" title="قواعد روشن برای استفاده و اعتماد" description="متن‌های این بخش ساختار آماده بازبینی‌اند و تا تأیید رسمی، نسخه نهایی حقوقی محسوب نمی‌شوند." /><section className="section"><div className="container legal-index-grid"><a href="/terms"><FileText /><h2>شرایط استفاده</h2><p>قواعد ثبت درخواست، دامنه پلتفرم و مسئولیت کاربر.</p></a><a href="/privacy"><ShieldCheck /><h2>حریم خصوصی</h2><p>اصول دریافت، استفاده، نگهداری و دسترسی به اطلاعات.</p></a><a href="/disclaimer"><TriangleAlert /><h2>سلب مسئولیت</h2><p>حدود محتوای عمومی، بررسی اولیه و عدم تضمین نتیجه.</p></a></div></section></SiteShell>;
}
