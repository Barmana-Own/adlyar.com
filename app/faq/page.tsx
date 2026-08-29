import { FAQList } from '@/components/faq-list';
import { CTASection, PageHero, SectionHeader } from '@/components/page-elements';
import { SiteShell } from '@/components/site-shell';
import { StructuredData } from '@/components/structured-data';
import { createPageMetadata, faqSchema } from '@/lib/seo';
import { commonFaqs } from '@/lib/site-data';

export const metadata = createPageMetadata({ title: 'پرسش‌های متداول', description: 'پاسخ به پرسش‌های رایج درباره ثبت درخواست، هزینه، محرمانگی، مدارک و شروع خدمت.', path: '/faq' });

const grouped = [
  { title: 'شروع و انتخاب خدمت', items: commonFaqs.slice(0, 2) },
  { title: 'دامنه، هزینه و نتیجه', items: [commonFaqs[2], commonFaqs[5]] },
  { title: 'مدارک و محرمانگی', items: [commonFaqs[3], commonFaqs[4]] },
];

export default function FAQPage() {
  return <SiteShell><StructuredData data={faqSchema(commonFaqs)} /><PageHero kicker="پرسش‌های متداول" title="پاسخ روشن، پیش از شروع مسیر" description="موضوع‌ها را بر اساس مرحله شروع، دامنه خدمت و محرمانگی دسته‌بندی کرده‌ایم." /><section className="section faq-page"><div className="container">{grouped.map((group) => <section className="faq-group" key={group.title}><SectionHeader title={group.title} /><FAQList items={group.items} /></section>)}</div></section><CTASection /></SiteShell>;
}
