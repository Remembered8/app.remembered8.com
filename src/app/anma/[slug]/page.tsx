import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import RememberedApp from '@/components/RememberedApp';
import { fetchMemorial, fetchMemorials, memorialUrl } from '@/lib/api';

interface PageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Per-dossier metadata.
 *
 * This is why the frontend moved to SSR. A memorial shared in a family WhatsApp
 * group used to preview as the generic site card; the preview now carries the
 * person's name, their years and their portrait, and a crawler can read it.
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const memorial = await fetchMemorial(slug);

  if (!memorial) {
    return { title: 'Kütük bulunamadı | Remembered' };
  }

  const years = [memorial.birthDate, memorial.deathDate].filter(Boolean).join(' — ');
  const title = `${memorial.fullName} | Remembered`;
  const description =
    memorial.lifeQuote?.trim() ||
    [memorial.profession, years].filter(Boolean).join(' • ') ||
    'Yaşayan bir anma kütüğü.';
  const url = memorialUrl(memorial.slug || memorial.id);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'profile',
      title,
      description,
      url,
      images: memorial.heroImage ? [{ url: memorial.heroImage, alt: memorial.fullName }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: memorial.heroImage ? [memorial.heroImage] : undefined,
    },
  };
}

/** Pre-render the curated dossiers; anything else is rendered on demand. */
export async function generateStaticParams() {
  const memorials = await fetchMemorials();
  return memorials.slice(0, 50).map((m) => ({ slug: m.slug }));
}

export default async function MemorialPage({ params }: PageProps) {
  const { slug } = await params;
  const memorial = await fetchMemorial(slug);

  if (!memorial) notFound();

  // The archive itself is one interactive tree, handed the dossier the server
  // already resolved so the first paint is the right person.
  return <RememberedApp initialMemorial={memorial} />;
}
