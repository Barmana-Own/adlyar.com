'use client';

import { Search } from 'lucide-react';
import { useMemo, useState } from 'react';

import { glossaryEntries } from '@/lib/site-data';

export function GlossaryList() {
  const [query, setQuery] = useState('');
  const filtered = useMemo(() => glossaryEntries.filter(([term, definition]) => `${term} ${definition}`.includes(query.trim())), [query]);
  return (
    <div className="glossary-shell">
      <label className="glossary-search"><Search /><span className="sr-only">جستجو در واژه‌نامه</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="مثلاً اظهارنامه یا کارشناسی" /></label>
      <div className="glossary-list">{filtered.map(([term, definition], index) => <article key={term}><span>{String(index + 1).padStart(2, '0')}</span><div><h2>{term}</h2><p>{definition}</p></div></article>)}</div>
      {!filtered.length && <div className="empty-state"><Search /><h2>واژه‌ای پیدا نشد</h2><p>عبارت کوتاه‌تری جستجو کنید.</p></div>}
    </div>
  );
}
