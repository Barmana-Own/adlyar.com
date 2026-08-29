'use client';

import { Search, SlidersHorizontal, UserRoundSearch } from 'lucide-react';
import { useMemo, useState } from 'react';

import { ExpertCard } from '@/components/page-elements';
import { expertProfiles } from '@/lib/site-data';

export function ExpertListing() {
  const [query, setQuery] = useState('');
  const [specialty, setSpecialty] = useState('all');
  const specialties = Array.from(new Set(expertProfiles.flatMap((profile) => profile.specialties)));
  const filtered = useMemo(() => expertProfiles.filter((profile) => {
    const search = `${profile.name ?? ''} ${profile.title} ${profile.specialties.join(' ')}`;
    return (!query.trim() || search.includes(query.trim())) && (specialty === 'all' || profile.specialties.includes(specialty));
  }), [query, specialty]);

  return (
    <section className="section expert-directory">
      <div className="container">
        <div className="expert-directory__filters" aria-label="فیلتر متخصصان">
          <label><Search /><span className="sr-only">جستجوی متخصص</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="جستجو در تخصص‌ها" /></label>
          <label><SlidersHorizontal /><span>تخصص</span><select value={specialty} onChange={(event) => setSpecialty(event.target.value)}><option value="all">همه تخصص‌ها</option>{specialties.map((item) => <option value={item} key={item}>{item}</option>)}</select></label>
          <label><span>شهر</span><select disabled aria-label="فیلتر شهر پس از اتصال داده فعال می‌شود"><option>پس از اتصال داده رسمی</option></select></label>
          <label><span>زبان</span><select disabled aria-label="فیلتر زبان پس از اتصال داده فعال می‌شود"><option>فارسی</option></select></label>
        </div>
        <div className="data-notice"><strong>شفافیت داده</strong><p>این محیط هنوز به پایگاه اطلاعات تأییدشده متخصصان متصل نیست؛ بنابراین نام، عکس، سابقه، شهر و صلاحیت ساختگی نمایش داده نمی‌شود.</p></div>
        <p className="sr-only" aria-live="polite">{filtered.length} نتیجه قابل مشاهده است.</p>
        {filtered.length ? <div className="expert-grid">{filtered.map((profile) => <ExpertCard profile={profile} key={profile.slug} />)}</div> : <div className="empty-state"><UserRoundSearch aria-hidden="true" /><h2>متخصصی با این فیلتر پیدا نشد</h2><p>عبارت یا تخصص را تغییر دهید. مشخصات تأییدنشده نمایش داده نمی‌شود.</p><button className="button button--outline" type="button" onClick={() => { setQuery(''); setSpecialty('all'); }}>پاک‌کردن فیلتر</button></div>}
      </div>
    </section>
  );
}
