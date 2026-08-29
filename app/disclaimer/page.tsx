import { LegalDocument } from '@/components/legal-document';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({ title: 'سلب مسئولیت', description: 'حدود محتوای عمومی، بررسی اولیه و نتیجه خدمات حقوقی و کارشناسی.', path: '/disclaimer', noIndex: true });
export default function DisclaimerPage() { return <LegalDocument title="سلب مسئولیت" summary="حدود محتوای عمومی، بررسی اولیه و نتیجه خدمات حقوقی و کارشناسی." sections={[
  { title: 'محتوای عمومی', paragraphs: ['مطالب مرکز دانش و واژه‌نامه برای آشنایی عمومی‌اند و جایگزین مشاوره یا بررسی شرایط و مدارک پرونده مشخص نیستند.'] },
  { title: 'بررسی اولیه', paragraphs: ['بررسی اولیه برای شناخت نوع نیاز است و لزوماً به معنی نظر نهایی حقوقی، کارشناسی، قبول وکالت یا پذیرش پروژه نیست.'] },
  { title: 'نتیجه', paragraphs: ['نتیجه دعوا، مذاکره، وصول یا تصمیم مرجع قابل تضمین نیست. تعهد خدمت فقط می‌تواند به روش، دامنه و خروجی توافق‌شده مربوط باشد.'] },
  { title: 'زمان و هزینه', paragraphs: ['زمان و هزینه نهایی پس از روشن‌شدن دامنه، مدارک، فوریت و وابستگی به مراجع یا بازدید اعلام می‌شود.'] },
]} />; }
