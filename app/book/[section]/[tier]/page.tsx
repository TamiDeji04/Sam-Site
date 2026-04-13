import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BookingFlow } from '@/components/booking-flow';
import { siteConfig } from '@/lib/site-config';

function toSlug(title: string) {
  return title.toLowerCase().replace(/\s+/g, '-');
}

function lookupPackage(sectionId: string, tierSlug: string) {
  const section = siteConfig.booking.sections.find((s) => s.id === sectionId);
  if (!section || section.mode === 'reference') return null;
  const pkg = (section.packages ?? []).find((p) => toSlug(p.title) === tierSlug);
  if (!pkg) return null;
  return { section, pkg };
}

type PageProps = {
  params: Promise<{ section: string; tier: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { section, tier } = await params;
  const match = lookupPackage(section, tier);
  if (!match) return {};
  return {
    title: `Book ${match.section.label} ${match.pkg.title} | ${siteConfig.businessName}`,
    description: `Complete your ${match.section.label} ${match.pkg.title} booking with ${siteConfig.businessName}.`,
  };
}

export function generateStaticParams() {
  const results: { section: string; tier: string }[] = [];
  for (const section of siteConfig.booking.sections) {
    if (section.mode === 'reference') continue;
    for (const pkg of section.packages ?? []) {
      results.push({ section: section.id, tier: toSlug(pkg.title) });
    }
  }
  return results;
}

export default async function BookingTierPage({ params }: PageProps) {
  const { section, tier } = await params;
  const match = lookupPackage(section, tier);
  if (!match) notFound();

  return (
    <BookingFlow
      sectionLabel={match.section.label}
      sectionId={match.section.id}
      pkg={match.pkg}
      paymentMethods={siteConfig.paymentMethods}
      calendarEmbedUrl={siteConfig.calendarEmbedUrl}
      depositNote={siteConfig.depositNote}
      email={siteConfig.email}
      businessName={siteConfig.businessName}
      policies={siteConfig.booking.policies}
    />
  );
}
