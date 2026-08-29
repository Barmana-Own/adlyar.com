import { ArrowRight, FileQuestion } from 'lucide-react';
import { SiteShell } from '@/components/site-shell';

export default function NotFound() {
  return <SiteShell><section className="not-found-page"><div className="not-found-visual"><span>۴۰۴</span><FileQuestion /></div><h1>این مسیر پیدا نشد</h1><p>ممکن است نشانی تغییر کرده باشد یا خدمت موردنظر هنوز منتشر نشده باشد.</p><div><a className="button button--primary button--large" href="/"><ArrowRight /> بازگشت به خانه</a><a className="button button--outline button--large" href="/request">ثبت مسئله</a></div></section></SiteShell>;
}
