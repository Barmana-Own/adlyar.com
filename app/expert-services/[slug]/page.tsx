import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { ServiceDetail } from '@/components/service-detail';
import { createPageMetadata } from '@/lib/seo';
import { expertServiceRecords } from '@/lib/site-data';

export function generateStaticParams() {
  return expertServiceRecords.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = expertServiceRecords.find((item) => item.slug === slug);
  if (!service) return { robots: { index: false, follow: true } };
  return createPageMetadata({ title: service.title, description: service.shortDescription, path: `/expert-services/${service.slug}` });
}

export default async function ExpertServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = expertServiceRecords.find((item) => item.slug === slug);
  if (!service) notFound();
  return <ServiceDetail service={service} kind="expert" />;
}
