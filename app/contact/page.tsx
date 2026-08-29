import { Clock3, Mail, MapPin, MessageSquareText, Phone } from 'lucide-react';

import { LeadForm } from '@/components/forms/lead-form';
import { PageHero } from '@/components/page-elements';
import { SiteShell } from '@/components/site-shell';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({ title: 'تماس با عدل‌یار', description: 'فرم تماس، بازخورد و ساختار کانال‌های رسمی عدل‌یار.', path: '/contact' });

export default function ContactPage() {
  return <SiteShell><PageHero kicker="تماس" title="برای پرسش، بازخورد یا هماهنگی اینجا هستیم" description="اطلاعات رسمی تماس فقط پس از ثبت و تأیید مالک پروژه منتشر می‌شود؛ تا آن زمان از فرم امن همین صفحه استفاده کنید." /><section className="section contact-section"><div className="container contact-layout"><div><div className="contact-cards"><article><Phone /><span>شماره پاسخ‌گویی</span><strong>هنوز در پروژه ثبت نشده</strong></article><article><Mail /><span>ایمیل رسمی</span><strong>هنوز در پروژه ثبت نشده</strong></article><article><MapPin /><span>آدرس</span><strong>هنوز در پروژه ثبت نشده</strong></article><article><Clock3 /><span>ساعات پاسخ‌گویی</span><strong>هنوز در پروژه ثبت نشده</strong></article></div><div className="map-placeholder" aria-label="جای نقشه؛ موقعیت رسمی هنوز ثبت نشده"><MapPin /><div><strong>موقعیت رسمی</strong><span>پس از تأیید آدرس در این بخش نمایش داده می‌شود.</span></div><i /><i /><i /></div><div className="official-channels"><MessageSquareText /><p>کانال اجتماعی یا پیام‌رسان رسمی بدون لینک تأییدشده نمایش داده نمی‌شود.</p></div></div><LeadForm mode="contact" /></div></section></SiteShell>;
}
