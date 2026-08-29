import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  Coins,
  FileText,
  Info,
} from 'lucide-react';

import { FAQList } from '@/components/faq-list';
import {
  ArticleCard,
  Breadcrumb,
  CTASection,
  IconList,
  SectionHeader,
} from '@/components/page-elements';
import { SiteShell } from '@/components/site-shell';
import type { ServiceRecord } from '@/lib/site-data';
import { articles } from '@/lib/site-data';

export function ServiceDetail({ service, kind }: { service: ServiceRecord; kind: 'legal' | 'expert' }) {
  const Icon = service.icon;
  const basePath = kind === 'legal' ? '/legal-services' : '/expert-services';
  const baseLabel = kind === 'legal' ? 'خدمات حقوقی' : 'خدمات کارشناسی';

  return (
    <SiteShell>
      <article>
        <header className="detail-hero">
          <div className="container">
            <Breadcrumb items={[{ label: baseLabel, href: basePath }, { label: service.title }]} />
            <div className="detail-hero__grid">
              <div>
                <span className="detail-hero__icon"><Icon aria-hidden="true" /></span>
                <span className="section-kicker">{kind === 'legal' ? 'بررسی حقوقی با دامنه روشن' : 'بررسی تخصصی مبتنی بر ورودی مشخص'}</span>
                <h1>{service.title}</h1>
                <p>{service.overview}</p>
                <div className="tag-list">{service.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              </div>
              <aside className="detail-summary">
                <strong>شروع این خدمت</strong>
                <p>برای اعلام دامنه و هزینه، ابتدا موضوع و مدارک اولیه بررسی می‌شود.</p>
                <a className="button button--primary button--large" href={`/request?type=${kind}&topic=${service.slug}`}>ثبت درخواست <ArrowLeft /></a>
                {service.slug === 'contracts' && <a className="button button--outline" href="/contract-review">فرم تخصصی بررسی قرارداد</a>}
                <dl>
                  <div><dt><Clock3 /> زمان</dt><dd>{service.timeline}</dd></div>
                  <div><dt><Coins /> هزینه</dt><dd>{service.priceNote}</dd></div>
                </dl>
              </aside>
            </div>
          </div>
        </header>

        <section className="section detail-overview">
          <div className="container detail-two-column">
            <div>
              <SectionHeader kicker="کاربرد خدمت" title={kind === 'expert' ? 'موضوع کارشناسی و کاربرد آن' : 'این خدمت چه مسئله‌ای را پوشش می‌دهد؟'} />
              <IconList items={service.useCases} />
            </div>
            <div className="detail-note">
              <Info aria-hidden="true" />
              <h2>{kind === 'expert' ? 'محدودیت بررسی' : 'چه زمانی به آن نیاز دارید؟'}</h2>
              <p>{kind === 'expert' ? 'نتیجه فقط در حدود سؤال، ورودی‌ها، روش و امکان بازدید معتبر است و جایگزین تصمیم مرجع رسیدگی نیست.' : 'اگر یکی از موقعیت‌های زیر را دارید، بررسی اولیه می‌تواند قدم بعد را روشن‌تر کند.'}</p>
              <IconList items={service.whenNeeded} icon={CheckCircle2} />
            </div>
          </div>
        </section>

        <section className="section detail-process">
          <div className="container">
            <SectionHeader kicker="فرآیند شفاف" title={kind === 'expert' ? 'روش بررسی و خروجی' : 'فرآیند انجام خدمت'} description="هر مرحله پس از تأیید ورودی مرحله قبل انجام می‌شود و تغییر دامنه بدون اطلاع شما صورت نمی‌گیرد." />
            <ol className="detail-process__grid">
              {service.process.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, '0')}</span><strong>{step}</strong></li>)}
            </ol>
          </div>
        </section>

        <section className="section documents-section">
          <div className="container documents-section__layout">
            <div>
              <SectionHeader kicker="ورودی‌های بررسی" title="مدارک و اطلاعات مفید" description="همه موارد از ابتدا الزامی نیست. فقط اسناد مرتبط و کم‌حجم را برای بررسی اولیه آماده کنید." />
              <IconList items={service.documents} icon={FileText} />
            </div>
            <aside className="scope-panel">
              <strong>{kind === 'expert' ? 'بازدید و خروجی' : 'دامنه، زمان و هزینه'}</strong>
              <p>{kind === 'expert' ? 'نیاز به بازدید، ابزار، روش محاسبه و قالب گزارش پیش از شروع روشن می‌شود.' : 'دامنه کار، خروجی مورد انتظار، زمان و مبنای هزینه قبل از پذیرش نهایی اعلام می‌شود.'}</p>
              <div><Clock3 /><span>{service.timeline}</span></div>
              <div><Coins /><span>{service.priceNote}</span></div>
            </aside>
          </div>
        </section>

        <section className="section detail-faq">
          <div className="container detail-faq__layout">
            <SectionHeader kicker="پرسش‌های این خدمت" title="قبل از ثبت درخواست" description="اگر پاسخ پرسش شما اینجا نیست، آن را در شرح درخواست بنویسید." />
            <FAQList items={service.faqs} />
          </div>
        </section>

        <section className="section related-content">
          <div className="container">
            <SectionHeader kicker="مطالب مرتبط" title="برای آماده‌سازی بهتر" />
            <div className="article-grid">{articles.slice(0, 3).map((article) => <ArticleCard article={article} key={article.slug} />)}</div>
          </div>
        </section>

        <CTASection title={`برای شروع ${service.title} آماده‌اید؟`} description="موضوع و هدف خود را ثبت کنید تا امکان ارائه خدمت، ورودی‌ها و دامنه بررسی شود." />
      </article>
    </SiteShell>
  );
}
