import { CalendarClock, ShieldCheck, TriangleAlert } from 'lucide-react';

import { Breadcrumb } from '@/components/page-elements';
import { SiteShell } from '@/components/site-shell';

export function LegalDocument({
  title,
  summary,
  sections,
}: {
  title: string;
  summary: string;
  sections: Array<{ title: string; paragraphs: string[] }>;
}) {
  return (
    <SiteShell>
      <article className="legal-document-page">
        <header><div className="container"><Breadcrumb items={[{ label: 'اسناد حقوقی', href: '/legal' }, { label: title }]} /><span className="section-kicker">نسخه آماده بازبینی حقوقی</span><h1>{title}</h1><p>{summary}</p><div className="legal-document__meta"><span><CalendarClock /> آخرین بازبینی محتوایی: ۷ شهریور ۱۴۰۵</span><span><ShieldCheck /> زبان ساده و ساختاریافته</span></div></div></header>
        <div className="container legal-document__layout">
          <aside><TriangleAlert /><strong>یادداشت انتشار</strong><p>این متن برای تکمیل طراحی و ساختار محصول آماده شده و پیش از استفاده عملی باید توسط مسئول حقوقی و مالک کسب‌وکار تأیید شود.</p></aside>
          <div className="legal-document__body">{sections.map((section, index) => <section id={`legal-${index}`} key={section.title}><span>{String(index + 1).padStart(2, '0')}</span><h2>{section.title}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section>)}</div>
        </div>
      </article>
    </SiteShell>
  );
}
