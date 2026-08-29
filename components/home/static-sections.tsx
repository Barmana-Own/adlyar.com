import {
  ArrowLeft,
  ArrowUpLeft,
  Check,
  FileCheck2,
  FileKey2,
  Fingerprint,
  LockKeyhole,
  Network,
  ScanLine,
  ShieldCheck,
  Sparkles,
  UserRoundCheck,
} from 'lucide-react';

import {
  benefits,
  expertServices,
  legalServices,
  securityFeatures,
  trustItems,
} from '@/lib/home-data';

const expertServiceSlugs = [
  'property-building',
  'valuation',
  'damage',
  'vehicle',
  'financial',
  'technical',
  'contract-project',
  'information-technology',
];

export function TrustStrip() {
  return (
    <section className="trust-strip" aria-label="اصول اعتماد در عدل‌یار">
      <div className="container trust-strip__grid">
        {trustItems.map(({ title, description, icon: Icon }, index) => (
          <article key={title} data-reveal style={{ '--item-index': index } as React.CSSProperties}>
            <span className="trust-strip__icon">
              <Icon aria-hidden="true" />
            </span>
            <div>
              <strong>{title}</strong>
              <p>{description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function LegalServicesSection() {
  return (
    <section className="section legal-section" id="legal-services">
      <div className="container">
        <div className="section-heading section-heading--split" data-reveal>
          <div>
            <span className="section-kicker">پشتیبانی حقوقی متناسب با موقعیت شما</span>
            <h2>خدمات حقوقی</h2>
          </div>
          <p>
            موضوع ابتدا از نظر وضعیت، فوریت و مدارک بررسی می‌شود تا خدمت متناسب با
            مسئله انتخاب شود.
          </p>
        </div>

        <div className="legal-bento">
          {legalServices.map(({ id, title, description, tags, icon: Icon, featured }, index) => (
            <article
              className={'service-card' + (featured ? ' service-card--' + featured : '')}
              key={id}
              data-reveal
              style={{ '--item-index': index } as React.CSSProperties}
            >
              <div className="service-card__top">
                <span className="service-card__icon">
                  <Icon aria-hidden="true" />
                </span>
                <span className="service-card__number" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
              <div className="service-card__copy">
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
              <div className="service-card__bottom">
                <div className="service-card__tags">
                  {tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <a href={`/legal-services/${id}`} aria-label={'مشاهده جزئیات ' + title}>
                  جزئیات و درخواست
                  <ArrowUpLeft aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ExpertServicesSection() {
  return (
    <section className="section expert-section" id="expert-services">
      <div className="container">
        <div className="expert-section__header" data-reveal>
          <div>
            <span className="section-kicker">بررسی مبتنی بر شواهد و دامنه روشن</span>
            <h2>خدمات کارشناسی</h2>
          </div>
          <p>
            برای هر موضوع، ورودی‌ها، روش بررسی و خروجی مورد انتظار پیش از شروع
            مشخص می‌شود.
          </p>
          <a className="button button--outline" href="/request?type=expert">
            ثبت درخواست کارشناسی
            <ArrowLeft aria-hidden="true" />
          </a>
        </div>

        <div className="expert-editorial">
          {expertServices.map(({ number, title, description, icon: Icon }, index) => (
            <article
              className="expert-service"
              data-reveal
              style={{ '--item-index': index } as React.CSSProperties}
              key={number}
            >
              <span className="expert-service__number">{number}</span>
              <span className="expert-service__icon">
                <Icon aria-hidden="true" />
              </span>
              <div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
              <a href={`/expert-services/${expertServiceSlugs[index]}`} aria-label={'جزئیات کارشناسی ' + title}>
                <ArrowUpLeft aria-hidden="true" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WhyAdlyarSection() {
  return (
    <section className="section why-section" id="why-adlyar">
      <div className="container">
        <div className="section-heading section-heading--center" data-reveal>
          <span className="section-kicker">چرا این مسیر متفاوت است؟</span>
          <h2>ساختار حرفه‌ای، بدون پیچیده‌کردن تجربه شما</h2>
          <p>
            عدل‌یار نقطه اتصال مسئله، اطلاعات و تخصص است؛ تا از نخستین توضیح تا
            شروع خدمت، تصمیم‌ها روشن باقی بمانند.
          </p>
        </div>

        <div className="why-layout" data-reveal>
          <div className="why-core" aria-hidden="true">
            <div className="why-core__orbit why-core__orbit--one" />
            <div className="why-core__orbit why-core__orbit--two" />
            <div className="why-core__center">
              <span className="brand__mark">
                <span />
                <span />
              </span>
              <strong>مسئله شما</strong>
              <small>در یک مسیر منسجم</small>
            </div>
            <span className="why-core__node why-core__node--one">
              <ScanLine />
            </span>
            <span className="why-core__node why-core__node--two">
              <Network />
            </span>
            <span className="why-core__node why-core__node--three">
              <UserRoundCheck />
            </span>
          </div>

          <div className="benefit-list">
            {benefits.map(({ title, description, icon: Icon }, index) => (
              <article className="benefit-item" key={title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div className="benefit-item__icon">
                  <Icon aria-hidden="true" />
                </div>
                <div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
                <Check aria-hidden="true" />
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function SecuritySection() {
  return (
    <section className="section security-section" id="security">
      <div className="security-section__glow" aria-hidden="true" />
      <div className="container">
        <div className="security-intro" data-reveal>
          <div>
            <span className="section-kicker section-kicker--dark">
              محرمانگی، بخشی از خود فرایند
            </span>
            <h2>مدارک و اطلاعات شما، بخشی از اعتماد ماست</h2>
          </div>
          <p>
            در طراحی چرخه اطلاعات، دریافت حداقلی، دسترسی محدود و مدیریت غیرعمومی
            مدارک به‌عنوان اصول پایه در نظر گرفته می‌شوند.
          </p>
        </div>

        <div className="security-layout">
          <div className="secure-flow" data-reveal aria-label="نمایش جریان کنترل‌شده مدارک">
            <div className="secure-flow__badge">
              <ShieldCheck aria-hidden="true" />
              چرخه امن مدارک
            </div>
            <div className="secure-flow__document">
              <FileCheck2 aria-hidden="true" />
              <span />
              <span />
              <span />
              <small>مدرک مرتبط با درخواست</small>
            </div>
            <div className="secure-flow__lock">
              <LockKeyhole aria-hidden="true" />
            </div>
            <div className="secure-flow__line secure-flow__line--one" />
            <div className="secure-flow__line secure-flow__line--two" />
            <div className="secure-flow__access secure-flow__access--one">
              <Fingerprint aria-hidden="true" />
              <span>دسترسی مجاز</span>
            </div>
            <div className="secure-flow__access secure-flow__access--two">
              <FileKey2 aria-hidden="true" />
              <span>فضای غیرعمومی</span>
            </div>
            <div className="secure-flow__signal" aria-hidden="true">
              <i />
              <i />
              <i />
            </div>
          </div>

          <div className="security-features" data-reveal>
            {securityFeatures.map(({ title, description, icon: Icon }, index) => (
              <article key={title}>
                <span className="security-feature__icon">
                  <Icon aria-hidden="true" />
                </span>
                <div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
                <span className="security-feature__number">{String(index + 1).padStart(2, '0')}</span>
              </article>
            ))}
          </div>
        </div>

        <div className="security-note" data-reveal>
          <Sparkles aria-hidden="true" />
          <p>
            جزئیات فنی نگهداری، سطح دسترسی و ثبت رویدادها در اتصال نهایی سامانه به
            زیرساخت امن اعتبارسنجی می‌شود.
          </p>
          <a href="/privacy">
            پرسش درباره محرمانگی
            <ArrowLeft aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
