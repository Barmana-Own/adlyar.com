'use client';

import { ArrowLeft, FileQuestion, LoaderCircle, Search, TriangleAlert } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';

import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { isAbortError, isPublicApiConfigured, searchPublic } from '@/lib/api-client';
import type { PublicSearchItem } from '@/lib/api/types';
import { articles, expertProfiles, expertServiceRecords, legalServiceRecords } from '@/lib/site-data';

type SearchState = 'idle' | 'loading' | 'success' | 'empty' | 'error';

const localIndex: PublicSearchItem[] = [
  ...legalServiceRecords.map((item) => ({ type: 'legal-service', title: item.title, description: item.shortDescription, href: `/legal-services/${item.slug}` })),
  ...expertServiceRecords.map((item) => ({ type: 'expert-service', title: item.title, description: item.shortDescription, href: `/expert-services/${item.slug}` })),
  ...articles.map((item) => ({ type: 'article', title: item.title, description: item.excerpt, href: `/knowledge/${item.slug}` })),
  ...expertProfiles.map((item) => ({ type: 'expert', title: item.name ?? item.title, description: item.specialties.join('، '), href: `/experts/${item.slug}` })),
  { type: 'page', title: 'ثبت درخواست', description: 'ثبت ساختاریافته مسئله و مدارک', href: '/request' },
  { type: 'page', title: 'رزرو مشاوره', description: 'درخواست مشاوره تلفنی، آنلاین، حضوری یا مکتوب', href: '/book' },
  { type: 'page', title: 'پرسش‌های متداول', description: 'پاسخ درباره فرآیند، هزینه و محرمانگی', href: '/faq' },
];

function normalize(value: string) {
  return value.trim().toLocaleLowerCase('fa-IR').replace(/[يى]/g, 'ی').replace(/ك/g, 'ک').replace(/[\u200c\u200f]/g, ' ');
}

function localSearch(query: string) {
  const needle = normalize(query);
  return localIndex.filter((item) => normalize(`${item.title} ${item.description ?? ''}`).includes(needle)).slice(0, 8);
}

function safeResults(items: PublicSearchItem[]) {
  return items.filter((item) => item && typeof item.title === 'string' && typeof item.href === 'string' && item.href.startsWith('/') && !item.href.startsWith('//')).slice(0, 8);
}

export function SearchDialogContent() {
  const [query, setQuery] = useState('');
  const [state, setState] = useState<SearchState>('idle');
  const [results, setResults] = useState<PublicSearchItem[]>([]);
  const [retryKey, setRetryKey] = useState(0);
  const requestSequence = useRef(0);
  const trimmedQuery = useMemo(() => query.trim(), [query]);

  useEffect(() => {
    if (trimmedQuery.length < 2) {
      return;
    }

    const sequence = ++requestSequence.current;
    const controller = new AbortController();
    const debounce = window.setTimeout(async () => {
      setState('loading');
      try {
        const items = isPublicApiConfigured
          ? (await searchPublic(trimmedQuery, controller.signal)).items
          : localSearch(trimmedQuery);
        if (sequence !== requestSequence.current) return;
        const next = safeResults(items);
        setResults(next);
        setState(next.length ? 'success' : 'empty');
      } catch (error) {
        if (sequence !== requestSequence.current || isAbortError(error)) return;
        setResults([]);
        setState('error');
      }
    }, 250);

    return () => {
      window.clearTimeout(debounce);
      controller.abort();
    };
  }, [trimmedQuery, retryKey]);

  return (
    <DialogContent className="search-dialog">
      <DialogHeader>
        <DialogTitle>در عدل‌یار دنبال چه چیزی هستید؟</DialogTitle>
        <DialogDescription>نام خدمت یا موضوع مسئله را بنویسید.</DialogDescription>
      </DialogHeader>
      <label className="search-field">
        <span className="sr-only">عبارت جستجو</span>
        <Search aria-hidden="true" />
        <input value={query} onChange={(event) => { const value = event.target.value; setQuery(value); if (value.trim().length < 2) { setState('idle'); setResults([]); } }} name="query" placeholder="مثلاً بررسی قرارداد یا اختلاف ملکی" autoComplete="off" />
      </label>

      <div className="search-results" aria-live="polite" aria-busy={state === 'loading'}>
        {state === 'idle' && <div className="search-suggestions"><span>پیشنهادهای سریع</span><a href="/legal-services">خدمات حقوقی</a><a href="/expert-services">خدمات کارشناسی</a><a href="/request">راهنمای انتخاب خدمت</a></div>}
        {state === 'loading' && <div className="search-loading"><LoaderCircle className="is-spinning" aria-hidden="true" /><span>در حال جستجو…</span></div>}
        {state === 'empty' && <div className="search-empty"><FileQuestion aria-hidden="true" /><div><strong>نتیجه‌ای پیدا نشد</strong><p>عبارت کوتاه‌تر بنویسید یا مسئله را مستقیم ثبت کنید.</p></div><a href="/request">ثبت درخواست <ArrowLeft /></a></div>}
        {state === 'error' && <div className="search-empty is-error" role="alert"><TriangleAlert aria-hidden="true" /><div><strong>جستجو در دسترس نیست</strong><p>اتصال برقرار نشد؛ کمی بعد دوباره تلاش کنید.</p></div><button type="button" onClick={() => setRetryKey((value) => value + 1)}>تلاش دوباره</button></div>}
        {state === 'success' && <ul className="search-result-list">{results.map((item) => <li key={`${item.type}-${item.href}`}><a href={item.href}><span><strong>{item.title}</strong>{item.description && <small>{item.description}</small>}</span><ArrowLeft aria-hidden="true" /></a></li>)}</ul>}
      </div>
      {!isPublicApiConfigured && state !== 'error' && <p className="search-source-note">در این نسخه، جستجو روی محتوای تأییدشده همین سایت انجام می‌شود.</p>}
    </DialogContent>
  );
}
