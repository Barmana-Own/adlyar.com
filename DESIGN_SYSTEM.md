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

- BrandMark
- SiteHeader، MegaMenu، Search Dialog و Mobile Drawer
- Button و IconButton variants
- SectionHeading و SectionKicker
- Hero workflow visual
- TrustStrip
- NeedCard و انتخاب‌گر تعاملی خدمت
- Quick Inquiry Form و stateهای validation/loading/success/error
- Legal Service Bento Card
- Expert Service Editorial Row
- Scroll Process Step و Sticky Process Visual
- Benefit Item و Why Adlyar Core
- Security Feature و Secure Flow visual

کنترل‌های تعاملی modal، drawer، accordion، input، textarea و checkbox بر پایه primitiveهای shadcn/Base UI موجود ساخته شده‌اند.

## Motion

- Micro interaction: ۱۸۰ تا ۲۶۰ms.
- UI transition: ۲۲۰ تا ۴۲۰ms.
- Section reveal: ۶۸۰ms.
- Hero sequence: حدود ۱٫۲ تا ۱٫۶ ثانیه.
- Easing اصلی: `cubic-bezier(0.22, 1, 0.36, 1)`.
- Scroll reveal با `IntersectionObserver` و بدون dependency اضافی.
- Storytelling فرایند با sticky visual در desktop و timeline کامل و ساده در mobile.
- تمام حرکت‌ها در `prefers-reduced-motion: reduce` حذف یا به حالت فوری تبدیل می‌شوند.

## Responsive

- Desktop: Hero دو ستونه، Bento چهار ستونه، فرایند sticky.
- Tablet: Gridهای دو ستونه و containerهای محدودشده.
- Mobile: Hero stacked، selector افقی snap، فرم دو مرحله‌ای، timeline عمودی، CTA ثابت پایین و drawer تمام‌قد.
- حداقل عرض پشتیبانی‌شده: ۳۲۰px.

## Accessibility

- `lang="fa-IR"` و `dir="rtl"` در document root.
- Skip link، landmarkها و heading hierarchy.
- Focus visible با contrast مناسب.
- Dialog/Drawer/Accordion با primitiveهای keyboard-ready.
- label، error association، live output و duplicate-submit protection در فرم.
- Touch targetهای اصلی حداقل ۴۴px.
