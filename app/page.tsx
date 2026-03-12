import { PortfolioExperience } from '@/components/portfolio-experience';
import { portfolioImages } from '@/lib/portfolio-data';
import { siteConfig } from '@/lib/site-config';

export default function Home() {
  const sameAs = siteConfig.instagramUrl ? [siteConfig.instagramUrl] : undefined;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteConfig.fullName,
    alternateName: siteConfig.businessName,
    jobTitle: 'Photographer',
    description: siteConfig.seoDescription,
    url: siteConfig.siteUrl,
    email: siteConfig.email,
    knowsAbout: siteConfig.focusAreas,
    worksFor: {
      '@type': 'Organization',
      name: siteConfig.businessName,
    },
    ...(sameAs ? { sameAs } : {}),
  };

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
        type="application/ld+json"
      />
      <PortfolioExperience images={portfolioImages} siteConfig={siteConfig} />
    </>
  );
}
