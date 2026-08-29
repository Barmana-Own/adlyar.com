import {
  ArrowLeft,
  ArrowUpLeft,
  BriefcaseBusiness,
  CircleCheckBig,
  FileCheck2,
  Network,
  ShieldCheck,
  UsersRound,
} from 'lucide-react';

import { FAQList } from '@/components/faq-list';
import {
  ArticleCard,
  CTASection,
  ExpertCard,
} from '@/components/page-elements';
import {
  articles,
  commonFaqs,
  corporateServices,
  engagementModels,
  expertProfiles,
} from '@/lib/site-data';

export function ExpertNetworkSection() {
  return (
    <section className="section network-section" id="experts">
      <div className="container">
        <div className="section-heading section-heading--split" data-reveal>
          <div>
            <span className="section-kicker">شبکه تخصصی با داده قابل اتکا</span>
            <h2>متخصص متناسب با موضوع، نه صرفاً نزدیک‌ترین گزینه</h2>
          </div>
          <p>
            نمایش نام، سابقه، شهر یا صلاحیت هر متخصص فقط پس از دریافت و تأیید داده
            رسمی انجام می‌شود. کارت‌های زیر ساختار آماده اتصال به شبکه واقعی هستند.
          </p>
        </div>
        <div className="expert-grid">
          {expertProfiles.map((profile, index) => (
            <div data-reveal style={{ '--item-index': index } as React.CSSProperties} key={profile.slug}>
              <ExpertCard profile={profile} />
            </div>
          ))}
        </div>
        <div className="network-section__footer" data-reveal>
          <div><Network aria-hidden="true" /><span>تطبیق تخصص بر اساس نوع مسئله و دامنه خدمت</span></div>
          <a className="button button--outline" href="/experts">مشاهده شبکه متخصصان <ArrowLeft aria-hidden="true" /></a>
        </div>
      </div>
    </section>
  );
}

export function CorporatePreviewSection() {
  return (
    <section className="section corporate-preview" id="corporate">
      <div className="corporate-preview__mesh" aria-hidden="true" />
      <div className="container">
        <div className="corporate-preview__intro" data-reveal>
          <div>
            <span className="section-kicker section-kicker--dark">برای مدیرعامل، مدیر حقوقی و مدیر عملیات</span>
            <h2>پشتیبانی حقوقی سازمان، متصل به جریان واقعی کسب‌وکار</h2>
          </div>
          <p>از یک پروژه مشخص تا میز حقوقی اختصاصی؛ دامنه، نقطه تماس، زمان پاسخ و قالب گزارش پیش از شروع روشن می‌شود.</p>
        </div>

        <div className="corporate-preview__layout">
          <div className="corporate-services" data-reveal>
            {corporateServices.slice(0, 8).map(([title, description, Icon], index) => (
              <article key={title}>
                <span><Icon aria-hidden="true" /></span>
                <div><strong>{title}</strong><p>{description}</p></div>
                <i>{String(index + 1).padStart(2, '0')}</i>
              </article>
            ))}
          </div>

          <aside className="corporate-desk" data-reveal>
            <div className="corporate-desk__top">
              <BriefcaseBusiness aria-hidden="true" />
              <span>میز حقوقی سازمان</span>
            </div>
            <div className="corporate-desk__workflow" aria-label="جریان سازمانی">
              {['دریافت', 'اولویت', 'تخصیص', 'گزارش'].map((item, index) => (
                <div className={index === 2 ? 'is-active' : ''} key={item}>
                  <span>{index + 1}</span><strong>{item}</strong>
                </div>
              ))}
            </div>
            <div className="corporate-desk__models">
              <span>مدل‌های همکاری</span>
              {engagementModels.slice(0, 3).map(([title]) => <i key={title}>{title}</i>)}
            </div>
            <a className="button button--light button--large" href="/corporate#lead-form">
              درخواست جلسه سازمانی <ArrowLeft aria-hidden="true" />
            </a>
          </aside>
        </div>
      </div>
    </section>
  );
}

export function KnowledgePreviewSection() {
  const featured = articles.find((article) => article.featured) ?? articles[0];
  const latest = articles.filter((article) => article.slug !== featured.slug).slice(0, 3);
  return (
    <section className="section knowledge-preview" id="knowledge">
      <div className="container">
        <div className="section-heading section-heading--split" data-reveal>
          <div><span className="section-kicker">راهنماهای عملی و غیرتبلیغاتی</span><h2>مرکز دانش</h2></div>
          <p>مطالبی برای آماده‌کردن بهتر اطلاعات، شناخت پرسش درست و تصمیم آگاهانه‌تر پیش از شروع خدمت.</p>
        </div>
        <div className="knowledge-preview__layout">
          <div data-reveal><ArticleCard article={featured} featured /></div>
          <div className="latest-articles">
            {latest.map((article, index) => (
              <div data-reveal style={{ '--item-index': index } as React.CSSProperties} key={article.slug}>
                <ArticleCard article={article} />
              </div>
            ))}
          </div>
        </div>
        <a className="knowledge-preview__all" href="/knowledge">همه مطالب مرکز دانش <ArrowUpLeft aria-hidden="true" /></a>
      </div>
    </section>
  );
}

export function HomeFAQSection() {
  return (
    <section className="section home-faq" id="faq">
      <div className="container home-faq__layout">
        <div data-reveal>
          <span className="section-kicker">پیش از شروع</span>
          <h2>پرسش‌های متداول</h2>
          <p>پاسخ کوتاه به پرسش‌هایی که معمولاً پیش از ثبت درخواست مطرح می‌شوند.</p>
          <div className="home-faq__trust">
            <ShieldCheck aria-hidden="true" />
            <span>ثبت درخواست به معنی پذیرش قطعی یا تضمین نتیجه نیست.</span>
          </div>
          <a href="/faq">مشاهده همه پرسش‌ها <ArrowLeft aria-hidden="true" /></a>
        </div>
        <div data-reveal><FAQList items={commonFaqs.slice(0, 5)} /></div>
      </div>
    </section>
  );
}

export function HomeFinalCTA() {
  return <CTASection />;
}

export function CorporateTrustLine() {
  return (
    <div className="corporate-trust-line">
      <span><FileCheck2 /> دامنه روشن</span>
      <span><UsersRound /> نقطه تماس مشخص</span>
      <span><CircleCheckBig /> گزارش قابل پیگیری</span>
    </div>
  );
}
