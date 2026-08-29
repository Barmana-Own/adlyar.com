import {
  ArrowLeft,
  Check,
  FileCheck2,
  LockKeyhole,
  ShieldCheck,
  UserRoundCheck,
} from 'lucide-react';

const heroSteps = ['مسئله', 'بررسی', 'تخصص', 'ارجاع', 'شروع خدمت'];

export function HeroSection() {
  return (
    <section className="hero" id="top">
      <div className="hero__glow" aria-hidden="true" />
      <div className="container hero__grid">
        <div className="hero__copy">
          <div className="eyebrow hero-animate hero-animate--1">
            <span />
            مسیر روشن برای یک مسئله پیچیده
          </div>
          <h1 className="hero-animate hero-animate--2">
            راه‌حل حقوقی و کارشناسی،
            <span> متناسب با مسئله شما</span>
          </h1>
          <p className="hero__lead hero-animate hero-animate--3">
            از مشاوره و بررسی پرونده تا کارشناسی تخصصی، قرارداد، دعاوی و خدمات
            سازمانی؛ درخواست خود را ثبت کنید تا به متخصص مناسب ارجاع شود.
          </p>
          <div className="hero__actions hero-animate hero-animate--4">
            <a className="button button--primary button--large" href="/request">
              ثبت درخواست
              <ArrowLeft aria-hidden="true" />
            </a>
            <a className="button button--outline button--large" href="/book">
              رزرو مشاوره
            </a>
          </div>
          <ul className="hero__trust hero-animate hero-animate--5" aria-label="تعهدهای عدل‌یار">
            <li>
              <Check aria-hidden="true" /> بررسی اولیه ساختاریافته
            </li>
            <li>
              <Check aria-hidden="true" /> حفظ محرمانگی
            </li>
            <li>
              <Check aria-hidden="true" /> ارجاع به متخصص مرتبط
            </li>
          </ul>
        </div>

        <div
          className="hero-visual hero-animate hero-animate--visual"
          aria-label="نمایش فرایند بررسی و ارجاع درخواست"
        >
          <div className="hero-visual__topline">
            <span className="status-pill">
              <span /> سامانه پذیرش و ارجاع
            </span>
            <span className="secure-pill">
              <LockKeyhole aria-hidden="true" /> محرمانه
            </span>
          </div>

          <div className="case-card">
            <div className="case-card__header">
              <div className="case-card__icon">
                <FileCheck2 aria-hidden="true" />
              </div>
              <div>
                <small>درخواست جدید</small>
                <strong>بررسی اختلاف ملکی</strong>
              </div>
              <span className="case-id" dir="ltr">
                ADL-0248
              </span>
            </div>
            <div className="case-card__body">
              <div>
                <span>موضوع</span>
                <strong>اختلاف در حدود و اسناد ملک</strong>
              </div>
              <div>
                <span>وضعیت</span>
                <strong className="status-text">در حال بررسی اولیه</strong>
              </div>
            </div>
            <div className="review-progress" aria-hidden="true">
              <span />
            </div>
          </div>

          <div className="document-stack" aria-hidden="true">
            <span className="document document--back" />
            <span className="document document--front">
              <i />
              <i />
              <i />
            </span>
          </div>

          <div className="expert-match">
            <div className="expert-match__icon">
              <UserRoundCheck aria-hidden="true" />
            </div>
            <div>
              <small>تخصص مرتبط شناسایی شد</small>
              <strong>حقوق املاک + کارشناسی ثبتی</strong>
            </div>
            <ShieldCheck aria-label="تأیید شده" />
          </div>

          <ol className="process-nodes" aria-label="مراحل رسیدگی">
            {heroSteps.map((step, index) => (
              <li
                className={index < 2 ? 'is-complete' : index === 2 ? 'is-active' : ''}
                key={step}
              >
                <span>{index + 1}</span>
                <small>{step}</small>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
