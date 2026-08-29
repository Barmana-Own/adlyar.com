import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BadgeCheck, BookOpenText, BriefcaseBusiness, GraduationCap, MapPin, UserRound } from 'lucide-react';

import { ArticleCard, Breadcrumb, CTASection, SectionHeader } from '@/components/page-elements';
import { SiteShell } from '@/components/site-shell';
import { StructuredData } from '@/components/structured-data';
import { breadcrumbSchema, createPageMetadata } from '@/lib/seo';
import { articles, commonFaqs, expertProfiles } from '@/lib/site-data';
import { FAQList } from '@/components/faq-list';

export function generateStaticParams() { return expertProfiles.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const profile = expertProfiles.find((item) => item.slug === slug);
  if (!profile) return { robots: { index: false, follow: true } };
  return createPageMetadata({ title: profile.name ?? profile.title, description: profile.bio, path: `/experts/${slug}`, noIndex: !profile.name || !profile.qualification });
}

export default async function ExpertDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const profile = expertProfiles.find((item) => item.slug === slug);
  if (!profile) notFound();
  return (
    <SiteShell>
      <StructuredData data={breadcrumbSchema([{ label: 'خانه', path: '/' }, { label: 'متخصصان', path: '/experts' }, { label: profile.title, path: `/experts/${slug}` }])} />
      <article className="expert-detail-page">
        <header className="expert-profile-hero"><div className="container"><Breadcrumb items={[{ label: 'متخصصان', href: '/experts' }, { label: profile.title }]} /><div className="expert-profile-hero__grid"><div className="expert-profile-avatar"><UserRound /></div><div><span className="data-state">پروفایل در انتظار داده تأییدشده</span><h1>{profile.name ?? 'نام متخصص پس از تأیید نمایش داده می‌شود'}</h1><strong>{profile.title}</strong><p>{profile.bio}</p><div className="tag-list">{profile.specialties.map((item) => <span key={item}>{item}</span>)}</div></div><aside><div><MapPin /><span>شهر</span><strong>{profile.city ?? 'ثبت نشده'}</strong></div><div><BriefcaseBusiness /><span>سابقه</span><strong>{profile.experience ?? 'ثبت نشده'}</strong></div><div><BadgeCheck /><span>صلاحیت</span><strong>{profile.qualification ?? 'داده رسمی موجود نیست'}</strong></div></aside></div></div></header>
        <section className="section expert-profile-content"><div className="container expert-profile-content__grid"><div><SectionHeader kicker="حوزه‌های تخصص" title="ساختار خدمات این پروفایل" /><div className="profile-specialties">{profile.specialties.map((item) => <article key={item}><BriefcaseBusiness /><h3>{item}</h3><p>شرح خدمت و حدود صلاحیت پس از تأیید پروفایل رسمی تکمیل می‌شود.</p></article>)}</div></div><aside className="profile-verification"><BadgeCheck /><h2>اصل راستی‌آزمایی</h2><p>تحصیلات، تجربه و مجوز فقط زمانی نمایش داده می‌شود که منبع رسمی و تاریخ تأیید در داده پروفایل وجود داشته باشد.</p><dl><div><dt><GraduationCap /> تحصیلات</dt><dd>ثبت نشده</dd></div><div><dt><BadgeCheck /> صلاحیت</dt><dd>ثبت نشده</dd></div><div><dt><BookOpenText /> زبان</dt><dd>{profile.languages.join('، ')}</dd></div></dl></aside></div></section>
        <section className="section"><div className="container"><SectionHeader kicker="مطالب مرتبط" title="از مرکز دانش" /><div className="article-grid">{articles.slice(0, 3).map((article) => <ArticleCard article={article} key={article.slug} />)}</div></div></section>
        <section className="section detail-faq"><div className="container detail-faq__layout"><SectionHeader kicker="پرسش‌ها" title="درباره ارجاع متخصص" /><FAQList items={commonFaqs.slice(0, 4)} /></div></section>
        <CTASection title="ابتدا مسئله را ثبت کنید" description="انتخاب متخصص پس از شناخت موضوع، شهر، دامنه و نیاز به صلاحیت خاص انجام می‌شود." />
      </article>
    </SiteShell>
  );
}
