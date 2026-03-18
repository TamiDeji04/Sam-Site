import type { Metadata } from 'next';
import { BookingExperience } from '@/components/booking-experience';
import { siteConfig } from '@/lib/site-config';

const bookingTitle = 'Book a Session';
const bookingDescription =
  'Reserve a Samshotit studio or outdoor session, review package details, and pay the booking deposit online.';

export const metadata: Metadata = {
  title: bookingTitle,
  description: bookingDescription,
  alternates: {
    canonical: '/book',
  },
  openGraph: {
    url: '/book',
    title: `${bookingTitle} | ${siteConfig.businessName}`,
    description: bookingDescription,
  },
  twitter: {
    title: `${bookingTitle} | ${siteConfig.businessName}`,
    description: bookingDescription,
  },
};

export default function BookPage() {
  return <BookingExperience siteConfig={siteConfig} />;
}
