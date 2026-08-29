export default function Loading() {
  return (
    <main className="route-loading" aria-busy="true" aria-label="در حال آماده‌سازی صفحه">
      <div className="container route-loading__shell">
        <span className="route-loading__eyebrow" />
        <span className="route-loading__title" />
        <span className="route-loading__line" />
        <div className="route-loading__cards"><i /><i /><i /></div>
        <span className="sr-only">در حال آماده‌سازی محتوا…</span>
      </div>
    </main>
  );
}
