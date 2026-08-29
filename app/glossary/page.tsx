import { GlossaryList } from '@/components/glossary-list';
import { PageHero } from '@/components/page-elements';
import { SiteShell } from '@/components/site-shell';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({ title: 'واژه‌نامه حقوقی و کارشناسی', description: 'توضیح ساده اصطلاحات پرتکرار حقوقی، کارشناسی و سازمانی.', path: '/glossary' });

export default function GlossaryPage() {
  return <SiteShell><PageHero kicker="واژه‌نامه" title="اصطلاحات پیچیده، با توضیح قابل فهم" description="این تعریف‌ها عمومی‌اند و معنای دقیق هر اصطلاح ممکن است با موضوع و سند مشخص تغییر کند." /><section className="section"><div className="container"><GlossaryList /><aside className="legal-note"><strong>سلب مسئولیت</strong><p>واژه‌نامه برای آشنایی عمومی است و جایگزین تفسیر حرفه‌ای در پرونده یا قرارداد مشخص نیست.</p></aside></div></section></SiteShell>;
}
