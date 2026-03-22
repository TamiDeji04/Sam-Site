import type { Metadata } from 'next';
import { BookingExperience } from '@/components/booking-experience';
import { PageScrollRestoration } from '@/components/page-scroll-restoration';
import { siteConfig } from '@/lib/site-config';

const bookingTitle = siteConfig.booking.pageTitle;
const bookingDescription =
  'Review Samshotit package pricing for portraits, couples, maternity, and events, then book or inquire to reserve your date.';

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
  return (
    <>
      <PageScrollRestoration clearInitialHash />
      <BookingExperience siteConfig={siteConfig} />
    </>
  );
}
