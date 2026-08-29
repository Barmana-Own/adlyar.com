import {
  ArrowLeft,
  BarChart3,
  Building2,
  CheckCircle2,
  FileCheck2,
  LockKeyhole,
  Route,
  ShieldCheck,
  UsersRound,
} from 'lucide-react';

import { FAQList } from '@/components/faq-list';
import { LeadForm } from '@/components/forms/lead-form';
import { CTASection, PageHero, SectionHeader } from '@/components/page-elements';
import { SiteShell } from '@/components/site-shell';
import { createPageMetadata } from '@/lib/seo';
import { commonFaqs, corporateServices, engagementModels } from '@/lib/site-data';

export const metadata = createPageMetadata({
  title: 'خدمات حقوقی سازمانی',
  description: 'پشتیبانی حقوقی B2B برای قرارداد، مطالبات، اختلاف، ریسک، گزارش‌دهی و میز حقوقی اختصاصی.',
  path: '/corporate',
});

const problems = [
  ['درخواست‌های پراکنده', 'نیازهای حقوقی از کانال‌های مختلف می‌آیند و اولویت یکسانی ندارند.'],
  ['قرارداد بدون دید یکپارچه', 'نسخه‌ها، تعهدات و مهلت‌ها میان واحدها پراکنده می‌مانند.'],
  ['گزارش غیرقابل تصمیم', 'مدیر به وضعیت، ریسک و قدم بعد در یک قالب ثابت دسترسی ندارد.'],
  ['ترکیب پرسش حقوقی و فنی', 'اختلاف‌های مالی یا فنی بدون اتصال منسجم به مسیر حقوقی می‌مانند.'],
];

export default function CorporatePage() {
  return (
    <SiteShell>
      <PageHero kicker="خدمات سازمانی B2B" title="یک نقطه تماس روشن برای جریان حقوقی سازمان" description="از پروژه محدود تا پشتیبانی ماهانه و میز حقوقی اختصاصی؛ دامنه، SLA، مسئولیت‌ها و گزارش‌دهی بر اساس نیاز واقعی سازمان طراحی می‌شود.">
        <div className="inner-hero__actions"><a className="button button--primary button--large" href="#lead-form">درخواست جلسه سازمانی <ArrowLeft /></a><a className="button button--outline button--large" href="/contact">تماس با عدل‌یار</a></div>
      </PageHero>

      <section className="section corporate-problems">
        <div className="container">
          <SectionHeader kicker="مسئله‌های پرتکرار" title="وقتی کار حقوقی از عملیات سازمان جدا می‌ماند" description="هدف، ساختن فرآیندی قابل اولویت‌بندی و گزارش است؛ نه صرفاً افزودن یک کانال پاسخ‌گویی دیگر." />
          <div className="asymmetric-grid">{problems.map(([title, description], index) => <article className={index === 0 ? 'is-featured' : ''} key={title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{description}</p></article>)}</div>
        </div>
      </section>

      <section className="section corporate-services-page">
        <div className="container">
          <SectionHeader kicker="دامنه خدمات" title="پشتیبانی از تصمیم تا اجرا و گزارش" />
          <div className="corporate-service-grid">{corporateServices.map(([title, description, Icon], index) => <article key={title}><Icon /><span>{String(index + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{description}</p></article>)}</div>
        </div>
      </section>

      <section className="section engagement-section">
        <div className="container engagement-layout">
          <div><SectionHeader kicker="مدل همکاری" title="متناسب با الگوی نیاز سازمان" description="مدل اولیه پس از شناخت حجم، تکرار، فوریت و سطح گزارش‌دهی پیشنهاد می‌شود." /><div className="engagement-list">{engagementModels.map(([title, description], index) => <article key={title}><span>{index + 1}</span><div><h3>{title}</h3><p>{description}</p></div><CheckCircle2 /></article>)}</div></div>
          <aside className="sla-board"><span className="sla-board__label">نمونه ساختار همکاری</span><h3>میز حقوقی اختصاصی</h3><div><UsersRound /><strong>نقطه تماس مشخص</strong><small>هماهنگی درخواست‌ها و ارجاع داخلی</small></div><div><Route /><strong>اولویت‌بندی و SLA</strong><small>تعریف سطح فوریت و زمان پاسخ</small></div><div><BarChart3 /><strong>گزارش مدیریتی</strong><small>وضعیت، ریسک، اقدام و تصمیم موردنیاز</small></div><div><LockKeyhole /><strong>کنترل دسترسی</strong><small>تفکیک اطلاعات بر اساس مسئولیت</small></div></aside>
        </div>
      </section>

      <section className="section corporate-process-page">
        <div className="container">
          <SectionHeader kicker="فرآیند همکاری" title="از کشف نیاز تا بهبود مستمر" />
          <ol>{['جلسه شناخت سازمان', 'تعریف دامنه و مدل', 'تعیین نقطه تماس و SLA', 'راه‌اندازی جریان دریافت', 'ارجاع و اجرای خدمت', 'گزارش و بازبینی دوره‌ای'].map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, '0')}</span><strong>{item}</strong></li>)}</ol>
        </div>
      </section>

      <section className="section reporting-security">
        <div className="container reporting-security__grid">
          <article><FileCheck2 /><span>گزارش‌دهی</span><h2>اطلاعاتی که برای تصمیم لازم است</h2><p>وضعیت درخواست، اقدام انجام‌شده، ریسک، مهلت و تصمیم موردنیاز در قالب قابل مرور ارائه می‌شود.</p><ul><li>داشبورد یا گزارش دوره‌ای</li><li>تفکیک پرونده و پروژه</li><li>ثبت اقدام و مسئول بعدی</li></ul></article>
          <article><ShieldCheck /><span>محرمانگی</span><h2>دسترسی متناسب با نقش</h2><p>ساختار دسترسی، کانال دریافت سند و نگهداری غیرعمومی باید در اتصال نهایی زیرساخت اعتبارسنجی شود.</p><ul><li>اصل حداقل دسترسی</li><li>کانال سند کنترل‌شده</li><li>ثبت رویدادهای مهم</li></ul></article>
        </div>
      </section>

      <section className="section corporate-faq"><div className="container detail-faq__layout"><SectionHeader kicker="پرسش‌های سازمانی" title="پیش از جلسه شناخت" /><FAQList items={[...commonFaqs.slice(0, 3), { question: 'آیا مدل همکاری در طول قرارداد قابل تغییر است؟', answer: 'بله؛ بازه بازبینی، معیار تغییر حجم و اثر آن بر SLA و هزینه باید در توافق اولیه مشخص شود.' }]} /></div></section>

      <section className="section lead-section" id="lead-form"><div className="container lead-section__layout"><div><span className="section-kicker">جلسه شناخت سازمان</span><h2>دامنه همکاری را با یک گفت‌وگوی ساختاریافته شروع کنیم</h2><p>نیاز اصلی، مدل ترجیحی و محدودیت‌های زمانی را بنویسید. این فرم رزرو قطعی یا پذیرش خودکار ایجاد نمی‌کند.</p><div className="lead-section__trust"><span><Building2 /> برای سازمان‌ها</span><span><ShieldCheck /> محرمانه</span><span><UsersRound /> نقطه تماس مشخص</span></div></div><LeadForm mode="corporate" /></div></section>
      <CTASection title="به یک مسیر سازمانی قابل گزارش نیاز دارید؟" description="در یک جلسه اولیه، الگوی نیاز و مدل مناسب همکاری را بررسی می‌کنیم." />
    </SiteShell>
  );
}
