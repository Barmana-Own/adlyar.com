# Design System عدل‌یار

## اصول

رابط فارسی، RTL-first، آرام، رسمی، ساختاریافته و مبتنی بر اعتماد است. زبان بصری از فرایند، مدرک، بررسی، ارجاع و محرمانگی استفاده می‌کند و از کلیشه‌های دادگاه و جلوه‌های نمایشی پرهیز دارد.

## رنگ‌ها

تمام رنگ‌های برند در `app/globals.css` تعریف شده‌اند:

| Token | مقدار | کاربرد |
| --- | --- | --- |
| `--color-text` | `#18202A` | متن اصلی |
| `--color-background` | `#F7F8FA` | پس‌زمینه عمومی |
| `--color-primary` | `#142B4A` | ساختار، CTA و سطوح تیره |
| `--color-secondary` | `#237A6B` | اقدام حرفه‌ای و فرایند فعال |
| `--color-accent` | `#C89B4A` | نقاط مهم و وضعیت تأیید |

Variationها فقط با `color-mix` و opacity همین رنگ‌ها ساخته می‌شوند. رنگ‌های `success`، `warning` و `error` صرفاً کاربرد عملکردی دارند.

برای متن ثانویه روی surface تیره از `--color-on-dark-muted` استفاده می‌شود؛ opacityهای کم سفید برای متن کوچک مجاز نیستند.

## تایپوگرافی

- خانواده اصلی: `Vazirmatn Variable` به‌صورت self-hosted از package نصب‌شده.
- Body: وزن ۴۰۰ تا ۵۰۰، line-height حدود ۱٫۸ تا ۲.
- UI: وزن ۶۰۰ تا ۷۰۰.
- Heading: وزن ۷۰۰ تا ۸۰۰ با فاصله حروف کنترل‌شده برای تیترهای بزرگ.
- متن لاتین، شناسه درخواست و موبایل با `dir="ltr"` یا فونت monospace مدیریت می‌شود.

## Layout و فاصله‌گذاری

- Container اصلی: `78rem` (حدود ۱۲۴۸px).
- Desktop: ساختارهای ۱۲ ستونه مفهومی؛ Tablet و Mobile با شکست‌های ۲ و ۱ ستونه.
- مقیاس فاصله: ۴، ۸، ۱۲، ۱۶، ۲۴، ۳۲، ۴۰، ۴۸، ۶۴، ۸۰، ۹۶ و ۱۲۰px.
- فاصله عمودی sectionها با `clamp(5.5rem, 8vw, 8rem)`.
- CSS logical properties برای margin، padding، inset و border استفاده شده است.

## Radius و Shadow

- کنترل‌ها: ۱۲ تا ۱۶px.
- کارت‌ها: ۱۸ تا ۲۴px.
- containerهای بزرگ: ۲۴ تا ۳۲px.
- Pill: `999px`.
- `--shadow-soft`: عمق محدود کارت‌ها.
- `--shadow-float`: فقط برای containerهای اصلی و modalها.

## Components

- Layout: `SiteShell`، `SiteHeader`، `SiteFooter`، `BrandMark`، Container و SkipLink.
- Navigation: MegaMenu با state هماهنگ ARIA، Search Dialog code-split، Mobile Drawer، Breadcrumb، Filter Drawer و Footer Accordion موبایل.
- Content: `PageHero`، `SectionHeader`، `CTASection`، `ServiceCard`، `ExpertCard`، `ArticleCard`، Tag و Badge.
- Disclosure: `FAQList` و Accordion مبتنی بر Base UI با پشتیبانی keyboard و `aria-expanded`.
- Forms: Input، Textarea، Select، Checkbox، Radio، ConsentBox، TimeSlot، Inline Error، Alert و live Output.
- Conversion: Quick Inquiry، Wizard هفت‌مرحله‌ای، Stepper، FileUpload، Booking Form، Corporate Lead، Contact، Join و Contract Review.
- Feedback: stateهای default، hover، focus، active، disabled، loading، empty، error و success برای کنترل‌ها، search، listing، upload و فرم‌ها.
- Utility: Modal/Dialog، Sheet/Drawer، Toast، Alert، Pagination، Calendar، Progress و Spinner از primitiveهای موجود shadcn/Base UI.
- Visuals: Hero workflow، Secure Flow، Corporate Desk، Article Visual و Expert Placeholder با CSS/SVG procedural.

کتابخانه جدیدی برای قابلیت‌هایی که در scaffold موجود بود اضافه نشده است. Lucide تنها سیستم آیکون و Base UI/shadcn مبنای کنترل‌های تعاملی باقی مانده‌اند.

## Motion

- Micro interaction: ۱۸۰ تا ۲۶۰ms.
- UI transition: ۲۲۰ تا ۴۲۰ms.
- Section reveal: ۶۸۰ms.
- Hero sequence: حدود ۱٫۲ تا ۱٫۶ ثانیه.
- Easing اصلی: `cubic-bezier(0.22, 1, 0.36, 1)`.
- Scroll reveal با `IntersectionObserver` و بدون dependency اضافی.
- کلاس motion پیش از hydration فعال می‌شود تا reveal باعث flash محتوای visible→hidden نشود.
- Storytelling فرایند با sticky visual در desktop و timeline کامل و ساده در mobile.
- progressهای متحرک با `transform: scaleX()` اجرا می‌شوند و width/height در scroll animate نمی‌شود.
- تمام حرکت‌ها در `prefers-reduced-motion: reduce` حذف یا به حالت فوری تبدیل می‌شوند.

## Responsive

- Desktop: Hero دو ستونه، Bento و editorial grid، filter sidebar، detail summary، process sticky و Wizard با help panel.
- Tablet: Gridهای دو ستونه، toolbarهای فشرده، corporate و knowledge layout شکسته‌شده.
- Mobile: Hero stacked، Filter Drawer، Footer Accordion، فرم‌های یک‌ستونه، timeline عمودی، Wizard تمام‌عرض و action bar سازگار با safe area.
- حداقل عرض پشتیبانی‌شده: ۳۲۰px.
- viewportهای QA: ۳۹۰×۸۴۴، ۷۶۸×۱۰۲۴، ۱۴۴۰×۹۰۰ و ۱۹۲۰×۱۰۸۰؛ بدون overflow افقی.

## Accessibility

- `lang="fa-IR"` و `dir="rtl"` در document root.
- Skip link، landmarkها و heading hierarchy.
- Focus visible با contrast مناسب.
- Dialog/Drawer/Accordion با primitiveهای keyboard-ready.
- label، error association، error summary، live output، server-field mapping و ref-based duplicate-submit protection در فرم.
- Touch targetهای اصلی حداقل ۴۴px.
- نام فایل، ایمیل، موبایل و شناسه با قواعد bidi و `bdi`/`dir="ltr"` مدیریت می‌شوند.
- داده متخصص، صلاحیت و اطلاعات تماس تا زمان وجود منبع رسمی با empty state صادقانه جایگزین می‌شوند.
