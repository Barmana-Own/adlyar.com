import { ArrowUpLeft, AtSign, Globe2, Send } from 'lucide-react';

import { BrandMark } from '@/components/brand-mark';
import { footerColumns } from '@/lib/site-data';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__main">
        <div className="site-footer__brand">
          <BrandMark />
          <p>
            مسیر ساختاریافته برای ثبت مسئله، بررسی اولیه و اتصال به خدمت حقوقی یا
            کارشناسی مرتبط.
          </p>
          <a className="footer-request" href="/request">
            شروع ثبت درخواست
            <ArrowUpLeft aria-hidden="true" />
          </a>
        </div>

        {footerColumns.map((column) => (
          <nav aria-label={column.title} key={column.title}>
            <strong>{column.title}</strong>
            {column.links.map(([label, href]) => (
              <a href={href} key={href}>
                {label}
              </a>
            ))}
          </nav>
        ))}
      </div>

      <div className="container site-footer__contact">
        <div>
          <strong>کانال‌های رسمی</strong>
          <p>اطلاعات تماس پس از ثبت و تأیید رسمی در این بخش منتشر می‌شود.</p>
        </div>
        <div className="site-footer__social" aria-label="شبکه‌های اجتماعی">
          <span aria-label="لینک اینستاگرام پس از تأیید منتشر می‌شود">
            <AtSign aria-hidden="true" />
          </span>
          <span aria-label="لینک لینکدین پس از تأیید منتشر می‌شود">
            <Globe2 aria-hidden="true" />
          </span>
          <span aria-label="لینک پیام‌رسان پس از تأیید منتشر می‌شود">
            <Send aria-hidden="true" />
          </span>
        </div>
      </div>

      <div className="container site-footer__bottom">
        <p>© ۱۴۰۵ عدل‌یار. همه حقوق محفوظ است.</p>
        <nav aria-label="اسناد حقوقی">
          <a href="/terms">شرایط استفاده</a>
          <a href="/privacy">حریم خصوصی</a>
          <a href="/disclaimer">سلب مسئولیت</a>
        </nav>
      </div>
    </footer>
  );
}
