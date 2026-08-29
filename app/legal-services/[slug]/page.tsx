import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { ServiceDetail } from '@/components/service-detail';
import { legalServiceRecords } from '@/lib/site-data';

export function generateStaticParams() {
  return legalServiceRecords.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = legalServiceRecords.find((item) => item.slug === slug);
  if (!service) return {};
  return { title: service.title, description: service.shortDescription, alternates: { canonical: `/legal-services/${service.slug}` } };
}

export default async function LegalServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = legalServiceRecords.find((item) => item.slug === slug);
  if (!service) notFound();
  return <ServiceDetail service={service} kind="legal" />;
}
