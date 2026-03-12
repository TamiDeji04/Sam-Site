import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site-config';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.businessName,
    short_name: siteConfig.businessName,
    description: siteConfig.seoDescription,
    start_url: '/',
    display: 'standalone',
    background_color: '#f4eee7',
    theme_color: '#f4eee7',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
      {
        src: '/apple-icon',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  };
}
