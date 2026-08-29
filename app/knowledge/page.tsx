import type { Metadata } from 'next';
import { ArrowUpLeft } from 'lucide-react';

import { ArticleCard, PageHero, SectionHeader } from '@/components/page-elements';
import { SiteShell } from '@/components/site-shell';
import { articles, knowledgeCategories } from '@/lib/site-data';

export const metadata: Metadata = {
  title: 'مرکز دانش',
  description: 'راهنماهای کاربردی درباره قرارداد، املاک، شرکت‌ها، کارشناسی و آماده‌سازی بهتر پرونده.',
  alternates: { canonical: '/knowledge' },
};

export default function KnowledgePage() {
  const featured = articles.find((article) => article.featured) ?? articles[0];
  return (
    <SiteShell>
      <PageHero kicker="مرکز دانش عدل‌یار" title="دانستن سؤال درست، پیش از انتخاب مسیر" description="راهنماهای کوتاه و ساختاریافته برای شناخت بهتر مسئله، آماده‌سازی مدارک و تصمیم آگاهانه‌تر.">
        <div className="knowledge-categories" aria-label="دسته‌های مرکز دانش">{knowledgeCategories.map((category) => <a href={`#${category}`} key={category}>{category}</a>)}</div>
      </PageHero>
      <section className="section knowledge-page"><div className="container"><SectionHeader kicker="مطلب منتخب" title="شروع از مهم‌ترین نکته‌ها" /><ArticleCard article={featured} featured /><div className="knowledge-page__latest"><div className="section-heading"><span className="section-kicker">تازه‌ترین مطالب</span><h2>راهنماهای جدید</h2></div><div className="article-grid">{articles.filter((item) => item.slug !== featured.slug).map((article) => <ArticleCard article={article} key={article.slug} />)}</div></div></div></section>
      <section className="section knowledge-topics"><div className="container"><SectionHeader kicker="موضوع‌ها" title="مرور بر اساس نیاز" /><div className="topic-grid">{knowledgeCategories.map((category, index) => <a id={category} href={`/knowledge#${category}`} key={category}><span>{String(index + 1).padStart(2, '0')}</span><strong>{category}</strong><small>{articles.filter((article) => article.category === category).length || 'به‌زودی'} مطلب</small><ArrowUpLeft /></a>)}</div></div></section>
    </SiteShell>
  );
}
