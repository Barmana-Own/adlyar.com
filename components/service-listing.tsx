'use client';

import { Filter, Search, SlidersHorizontal, X } from 'lucide-react';
import { useMemo, useState } from 'react';

import { ServiceCard } from '@/components/page-elements';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { expertServiceRecords, legalServiceRecords } from '@/lib/site-data';

function FilterControls({
  query,
  setQuery,
  activeTag,
  setActiveTag,
  tags,
}: {
  query: string;
  setQuery: (value: string) => void;
  activeTag: string;
  setActiveTag: (value: string) => void;
  tags: string[];
}) {
  return (
    <div className="filter-controls">
      <label className="filter-search">
        <Search aria-hidden="true" />
        <span className="sr-only">جستجو در خدمات</span>
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="جستجوی عنوان یا موضوع" />
        {query && <button type="button" onClick={() => setQuery('')} aria-label="پاک‌کردن جستجو"><X /></button>}
      </label>
      <fieldset>
        <legend>فیلتر موضوع</legend>
        <button type="button" aria-pressed={activeTag === 'all'} className={activeTag === 'all' ? 'is-active' : ''} onClick={() => setActiveTag('all')}>همه خدمات</button>
        {tags.map((tag) => (
          <button type="button" aria-pressed={activeTag === tag} className={activeTag === tag ? 'is-active' : ''} onClick={() => setActiveTag(tag)} key={tag}>{tag}</button>
        ))}
      </fieldset>
    </div>
  );
}

export function ServiceListing({ kind }: { kind: 'legal' | 'expert' }) {
  const records = kind === 'legal' ? legalServiceRecords : expertServiceRecords;
  const [query, setQuery] = useState('');
  const [activeTag, setActiveTag] = useState('all');
  const tags = useMemo(() => Array.from(new Set(records.flatMap((item) => item.tags))).slice(0, 8), [records]);
  const filtered = useMemo(() => {
    const normalized = query.trim();
    return records.filter((item) => {
      const tagMatch = activeTag === 'all' || item.tags.includes(activeTag);
      const queryMatch = !normalized || `${item.title} ${item.shortDescription} ${item.tags.join(' ')}`.includes(normalized);
      return tagMatch && queryMatch;
    });
  }, [records, query, activeTag]);

  return (
    <section className="section listing-section">
      <div className="container listing-layout">
        <aside className="listing-sidebar" aria-label="فیلتر خدمات">
          <div className="listing-sidebar__title"><SlidersHorizontal /><strong>فیلتر خدمات</strong></div>
          <FilterControls {...{ query, setQuery, activeTag, setActiveTag, tags }} />
        </aside>

        <div className="listing-main">
          <div className="listing-toolbar">
            <p aria-live="polite"><strong>{filtered.length}</strong> خدمت قابل مشاهده</p>
            <Sheet>
              <SheetTrigger render={<button className="button button--outline mobile-filter-button" type="button" aria-label="باز کردن فیلتر خدمات" />}>
                <Filter aria-hidden="true" /> فیلتر
              </SheetTrigger>
              <SheetContent className="filter-drawer" side="bottom">
                <SheetHeader><SheetTitle>فیلتر خدمات</SheetTitle></SheetHeader>
                <FilterControls {...{ query, setQuery, activeTag, setActiveTag, tags }} />
              </SheetContent>
            </Sheet>
          </div>
          {filtered.length ? (
            <div className="domain-grid">
              {filtered.map((service) => <ServiceCard service={service} kind={kind} key={service.slug} />)}
            </div>
          ) : (
            <div className="empty-state">
              <Search aria-hidden="true" />
              <h2>خدمتی با این عبارت پیدا نشد</h2>
              <p>فیلتر را پاک کنید یا مسئله را برای بررسی اولیه ثبت کنید.</p>
              <button className="button button--outline" type="button" onClick={() => { setQuery(''); setActiveTag('all'); }}>پاک‌کردن فیلتر</button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
