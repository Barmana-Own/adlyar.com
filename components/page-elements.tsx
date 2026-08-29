import {
  ArrowLeft,
  ArrowUpLeft,
  ChevronLeft,
  CircleCheckBig,
  FileText,
  MapPin,
  UserRound,
  type LucideIcon,
} from 'lucide-react';

import type { ArticleRecord, ExpertProfile, ServiceRecord } from '@/lib/site-data';

export function Breadcrumb({ items }: { items: Array<{ label: string; href?: string }> }) {
  return (
    <nav className="breadcrumb" aria-label="مسیر صفحه">
      <ol>
        <li><a href="/">خانه</a></li>
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`}>
            <ChevronLeft aria-hidden="true" />
            {item.href ? <a href={item.href}>{item.label}</a> : <span aria-current="page">{item.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PageHero({
  kicker,
  title,
  description,
  children,
}: {
  kicker: string;
  title: string;
  description: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="inner-hero">
      <div className="inner-hero__glow" aria-hidden="true" />
      <div className="container inner-hero__grid">
        <div data-reveal>
          <Breadcrumb items={[{ label: title }]} />
          <span className="section-kicker">{kicker}</span>
          <h1>{title}</h1>
          <p>{description}</p>
          {children}
        </div>
        <div className="inner-hero__visual" data-reveal aria-hidden="true">
          <div className="inner-hero__document">
            <FileText />
            <i /><i /><i />
          </div>
          <span className="inner-hero__node inner-hero__node--one">مسئله</span>
          <span className="inner-hero__node inner-hero__node--two">بررسی</span>
          <span className="inner-hero__node inner-hero__node--three">مسیر</span>
          <div className="inner-hero__seal"><CircleCheckBig /></div>
        </div>
      </div>
    </section>
  );
}

export function SectionHeader({
  kicker,
  title,
  description,
  align = 'start',
}: {
  kicker?: string;
  title: string;
  description?: string;
  align?: 'start' | 'center';
}) {
  return (
    <div className={`section-heading${align === 'center' ? ' section-heading--center' : ''}`} data-reveal>
      {kicker && <span className="section-kicker">{kicker}</span>}
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}

export function CTASection({
  title = 'نمی‌دانید دقیقاً چه خدمتی نیاز دارید؟',
  description = 'مسئله را برای عدل‌یار توضیح دهید تا مسیر مناسب برای بررسی اولیه مشخص شود.',
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="section final-cta">
      <div className="container final-cta__shell" data-reveal>
        <div className="final-cta__process" aria-hidden="true">
          {['مسئله', 'بررسی', 'تخصص', 'شروع'].map((item, index) => (
            <span key={item} className={index === 2 ? 'is-active' : ''}>
              <i>{index + 1}</i>{item}
            </span>
          ))}
        </div>
        <div>
          <span className="section-kicker section-kicker--dark">از مسئله تا مسیر روشن</span>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <div className="final-cta__actions">
          <a className="button button--light button--large" href="/request">
            ثبت درخواست
            <ArrowLeft aria-hidden="true" />
          </a>
          <a className="button button--dark-outline button--large" href="/book">
            رزرو مشاوره
          </a>
        </div>
      </div>
    </section>
  );
}

export function ServiceCard({ service, kind = 'legal' }: { service: ServiceRecord; kind?: 'legal' | 'expert' }) {
  const Icon = service.icon;
  return (
    <article className="domain-card service-domain-card">
      <div className="domain-card__icon"><Icon aria-hidden="true" /></div>
      <span className="domain-card__kind">{kind === 'legal' ? 'خدمت حقوقی' : 'خدمت کارشناسی'}</span>
      <h3>{service.title}</h3>
      <p>{service.shortDescription}</p>
      <div className="tag-list">
        {service.tags.map((tag) => <span key={tag}>{tag}</span>)}
      </div>
      <a href={`/${kind === 'legal' ? 'legal-services' : 'expert-services'}/${service.slug}`}>
        مشاهده جزئیات
        <ArrowUpLeft aria-hidden="true" />
      </a>
    </article>
  );
}

export function ExpertCard({ profile }: { profile: ExpertProfile }) {
  return (
    <article className="domain-card expert-card">
      <div className="expert-card__photo" aria-label="تصویر خنثی متخصص؛ عکس رسمی موجود نیست">
        <UserRound aria-hidden="true" />
      </div>
      <div className="expert-card__status">پروفایل در انتظار داده تأییدشده</div>
      <h3>{profile.name ?? 'نام پس از تأیید نمایش داده می‌شود'}</h3>
      <strong>{profile.title}</strong>
      <div className="tag-list">{profile.specialties.map((tag) => <span key={tag}>{tag}</span>)}</div>
      <dl>
        <div><dt>سابقه</dt><dd>{profile.experience ?? 'ثبت نشده'}</dd></div>
        <div><dt><MapPin aria-hidden="true" /> شهر</dt><dd>{profile.city ?? 'ثبت نشده'}</dd></div>
      </dl>
      <a href={`/experts/${profile.slug}`}>ساختار پروفایل <ArrowUpLeft aria-hidden="true" /></a>
    </article>
  );
}

export function ArticleVisual({ category }: { category: string }) {
  return (
    <div className="article-visual" aria-hidden="true">
      <span>{category}</span>
      <div><FileText /><i /><i /><i /></div>
    </div>
  );
}

export function ArticleCard({ article, featured = false }: { article: ArticleRecord; featured?: boolean }) {
  return (
    <article className={`article-card${featured ? ' article-card--featured' : ''}`}>
      <ArticleVisual category={article.category} />
      <div className="article-card__body">
        <div className="article-card__meta">
          <span>{article.category}</span>
          <time dateTime={article.publishedAt}>{article.date}</time>
          <span>{article.readTime}</span>
        </div>
        <h3>{article.title}</h3>
        <p>{article.excerpt}</p>
        <div className="article-card__footer">
          <span>{article.author}</span>
          <a href={`/knowledge/${article.slug}`} aria-label={`مطالعه ${article.title}`}>
            مطالعه مطلب <ArrowUpLeft aria-hidden="true" />
          </a>
        </div>
      </div>
    </article>
  );
}

export function IconList({ items, icon: Icon = CircleCheckBig }: { items: string[]; icon?: LucideIcon }) {
  return (
    <ul className="icon-list">
      {items.map((item) => <li key={item}><Icon aria-hidden="true" /><span>{item}</span></li>)}
    </ul>
  );
}
