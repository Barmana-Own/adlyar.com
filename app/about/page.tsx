import type { Metadata } from 'next';
import { ClipboardCheck, Eye, HeartHandshake, LockKeyhole, Network, Route, Scale, ShieldCheck } from 'lucide-react';

import { CTASection, PageHero, SectionHeader } from '@/components/page-elements';
import { SiteShell } from '@/components/site-shell';

export const metadata: Metadata = { title: 'درباره عدل‌یار', description: 'چرایی شکل‌گیری، مأموریت، ارزش‌ها، فرآیند، شبکه تخصصی و اصول محرمانگی عدل‌یار.', alternates: { canonical: '/about' } };

const values = [
  ['شفافیت پیش از شروع', 'دامنه، خروجی، هزینه و محدودیت‌ها باید قابل فهم باشند.', Eye],
  ['محرمانگی در خود فرآیند', 'دریافت حداقلی و دسترسی کنترل‌شده بخشی از طراحی خدمت است.', LockKeyhole],
  ['تخصص متناسب با مسئله', 'نوع تخصص از روی واقعیت موضوع تعیین می‌شود، نه حدس اولیه.', Network],
  ['استقلال حرفه‌ای', 'نتیجه از پیش وعده داده نمی‌شود و محدودیت‌ها بیان می‌شوند.', Scale],
];

export default function AboutPage() {
  return (
    <SiteShell>
      <PageHero kicker="درباره عدل‌یار" title="میان مسئله پیچیده و تصمیم روشن، باید یک ساختار وجود داشته باشد" description="عدل‌یار برای سامان‌دادن ثبت مسئله، بررسی اولیه، انتخاب نوع خدمت و ارجاع به تخصص مرتبط طراحی شده است." />
      <section className="section about-origin"><div className="container about-origin__grid"><div><SectionHeader kicker="چرا ایجاد شدیم" title="کاربر نباید برای شروع، نام دقیق خدمت را حدس بزند" /><p>بسیاری از مسائل هم‌زمان حقوقی، مالی یا فنی‌اند. وقتی درخواست بدون ساختار ثبت شود، اطلاعات تکرار می‌شود، مدارک پراکنده می‌ماند و انتخاب مسیر دشوارتر می‌شود.</p><p>مأموریت عدل‌یار این است که پیش از شروع خدمت، مسئله را به شرحی روشن، قابل بررسی و قابل ارجاع تبدیل کند.</p></div><div className="about-principle"><Route /><span>مسئله</span><i /><ClipboardCheck /><span>بررسی</span><i /><Network /><span>تخصص</span><i /><HeartHandshake /><span>خدمت</span></div></div></section>
      <section className="section about-values"><div className="container"><SectionHeader kicker="ارزش‌ها" title="اصل‌هایی که باید در رفتار محصول دیده شوند" /><div className="value-grid">{values.map(([title, description, Icon], index) => <article key={title as string}><span>{String(index + 1).padStart(2, '0')}</span><Icon /><h3>{title as string}</h3><p>{description as string}</p></article>)}</div></div></section>
      <section className="section story-timeline"><div className="container"><SectionHeader kicker="روایت فرآیند" title="از توضیح اولیه تا شروع خدمت" /><ol>{[['شنیدن', 'مسئله با زبان کاربر ثبت می‌شود.'], ['ساختار', 'موضوع، فوریت و مدارک دسته‌بندی می‌شوند.'], ['تشخیص', 'نوع خدمت و تخصص لازم مشخص می‌شود.'], ['شفاف‌سازی', 'دامنه، زمان و هزینه پیش از شروع اعلام می‌شود.'], ['همراهی', 'خدمت در حدود توافق‌شده اجرا و گزارش می‌شود.']].map(([title, description], index) => <li key={title}><span>{String(index + 1).padStart(2, '0')}</span><div><h3>{title}</h3><p>{description}</p></div></li>)}</ol></div></section>
      <section className="section about-network"><div className="container reporting-security__grid"><article><Network /><span>تیم و شبکه کارشناسی</span><h2>داده واقعی، پیش از نمایش</h2><p>نام، سابقه، شهر، مدرک و صلاحیت هر عضو فقط پس از اتصال منبع رسمی و راستی‌آزمایی نمایش داده می‌شود. این نسخه هیچ شخص یا سابقه‌ای را جعل نمی‌کند.</p><a href="/experts">ساختار شبکه متخصصان</a></article><article><ShieldCheck /><span>استاندارد اخلاقی و محرمانگی</span><h2>نتیجه تضمین نمی‌شود؛ روش و دامنه روشن می‌شود</h2><p>استقلال نظر تخصصی، بیان محدودیت، تعارض منافع و دریافت حداقلی اطلاعات، اصول پایه طراحی همکاری‌اند.</p><a href="/privacy">سیاست حریم خصوصی</a></article></div></section>
      <CTASection title="یک مسیر روشن از مسئله شما شروع می‌شود" description="موضوع را ثبت کنید تا در بررسی اولیه، نوع خدمت و قدم بعد مشخص شود." />
    </SiteShell>
  );
}
