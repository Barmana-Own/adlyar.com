import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Clock3, UserRound } from 'lucide-react';

import { ArticleCard, ArticleVisual, Breadcrumb, CTASection, SectionHeader } from '@/components/page-elements';
import { SiteShell } from '@/components/site-shell';
import { articles } from '@/lib/site-data';

export function generateStaticParams() { return articles.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  if (!article) return {};
  return { title: article.title, description: article.excerpt, alternates: { canonical: `/knowledge/${slug}` }, openGraph: { type: 'article', title: article.title, description: article.excerpt } };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  if (!article) notFound();
  const related = articles.filter((item) => item.slug !== slug).slice(0, 3);
  return (
    <SiteShell>
      <article className="knowledge-detail">
        <header className="article-hero"><div className="container"><Breadcrumb items={[{ label: 'مرکز دانش', href: '/knowledge' }, { label: article.category, href: `/knowledge#${article.category}` }, { label: article.title }]} /><div className="article-hero__grid"><div><span className="section-kicker">{article.category}</span><h1>{article.title}</h1><p>{article.excerpt}</p><div className="article-hero__meta"><span><UserRound /> {article.author}</span><span>{article.date}</span><span><Clock3 /> {article.readTime}</span></div></div><ArticleVisual category={article.category} /></div></div></header>
        <div className="container article-layout"><div className="article-body"><p className="article-lead">این مطلب یک راهنمای عمومی است و برای تصمیم در پرونده مشخص، جایگزین بررسی مدارک و مشاوره تخصصی نیست.</p>{article.sections.map((section, index) => <section id={`section-${index}`} key={section.heading}><h2>{section.heading}</h2><p>{section.body}</p></section>)}<aside className="article-disclaimer"><strong>یادآوری</strong><p>قواعد و رویه‌ها ممکن است تغییر کنند. پیش از اقدام، وضعیت روز و شرایط خاص مسئله خود را بررسی کنید.</p></aside></div><aside className="article-toc"><strong>در این راهنما</strong>{article.sections.map((section, index) => <a href={`#section-${index}`} key={section.heading}>{section.heading}</a>)}<a className="button button--primary" href="/request">ثبت مسئله مرتبط</a></aside></div>
        <section className="section"><div className="container"><SectionHeader kicker="مطالب مرتبط" title="ادامه مطالعه" /><div className="article-grid">{related.map((item) => <ArticleCard article={item} key={item.slug} />)}</div></div></section>
        <CTASection />
      </article>
    </SiteShell>
  );
}
