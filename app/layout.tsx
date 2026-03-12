import type { Metadata, Viewport } from 'next';
import { siteConfig } from '@/lib/site-config';
import './globals.css';

const siteTitle = siteConfig.seoTitle;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: siteTitle,
    template: `%s | ${siteConfig.businessName}`,
  },
  description: siteConfig.seoDescription,
  applicationName: siteConfig.businessName,
  authors: [{ name: siteConfig.fullName }],
  alternates: {
    canonical: '/',
  },
  keywords: [
    'samshotit',
    'samuel oluwasanmi',
    'portrait photography',
    'beauty photography',
    'event photography',
    'photographer',
  ],
  creator: siteConfig.fullName,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: siteTitle,
    description: siteConfig.seoDescription,
    siteName: siteConfig.businessName,
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: `${siteConfig.businessName} photography preview`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteConfig.seoDescription,
    images: ['/opengraph-image'],
  },
  manifest: '/manifest.webmanifest',
  category: 'photography',
};

export const viewport: Viewport = {
  themeColor: '#f4eee7',
  colorScheme: 'light',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html data-scroll-behavior="smooth" lang="en">
      <body>{children}</body>
    </html>
  );
}
