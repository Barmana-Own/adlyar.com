'use client';

import { RefreshCw, TriangleAlert } from 'lucide-react';

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="route-error">
      <div className="route-error__visual"><TriangleAlert aria-hidden="true" /></div>
      <h1>این بخش بارگذاری نشد</h1>
      <p>خطای فنی نمایش داده نمی‌شود. اتصال را بررسی کنید یا دوباره تلاش کنید.</p>
      <div><button className="button button--primary button--large" type="button" onClick={reset}><RefreshCw /> تلاش دوباره</button><a className="button button--outline button--large" href="/">بازگشت به خانه</a></div>
    </main>
  );
}
