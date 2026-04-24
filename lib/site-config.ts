export type PricingTier = {
  title: string;
  price: string;
  items: string[];
};

export type PricingCategory = {
  id: string;
  label: string;
  heading: string;
  intro?: string;
  tiers?: PricingTier[];
  note?: string;
  mode?: 'tiers' | 'reference';
};

export type PaymentMethod = {
  id: string;
  label: string;
  handle: string;
};

export type BookingPackage = {
  title: string;
  duration?: string;
  price: string;
  depositDue?: string;
  features: string[];
  honeyBookUrl?: string;
};

export type BookingSection = {
  id: string;
  label: string;
  heading: string;
  intro: string;
  mode?: 'packages' | 'reference' | 'inquiry';
  packages?: BookingPackage[];
  note?: string;
  actionLabel?: string;
  referenceLabel?: string;
  referenceHref?: string;
};

export type BookingConfig = {
  navLabel: string;
  pageTitle: string;
  intro: string;
  supporting: string;
  packageButtonLabel: string;
  fallbackCopy: string;
  fallbackButtonLabel: string;
  policiesHeading: string;
  policies: string[];
  sections: BookingSection[];
  customInquiry: {
    id: string;
    label: string;
    heading: string;
    body: string;
    buttonLabel: string;
    honeyBookUrl?: string;
    fallbackCopy: string;
  };
};

export type SiteConfig = {
  businessName: string;
  fullName: string;
  heroHeadline: string;
  heroSupporting: string;
  heroIdentity: string;
  galleryIntro: string;
  servicesHeading: string;
  servicesIntro: string;
  services: Array<{
    title: string;
    summary: string;
  }>;
  process: Array<{
    step: string;
    title: string;
    body: string;
  }>;
  pricing: {
    sectionLabel: string;
    heading: string;
    intro: string;
    categories: PricingCategory[];
    policies: string[];
    ctaLabel: string;
    ctaHref: string;
  };
  booking: BookingConfig;
  calendarEmbedUrl: string;
  paymentMethods: PaymentMethod[];
  depositNote: string;
  aboutHeading: string;
  aboutBody: string[];
  contactHeading: string;
  contactCopy: string;
  email: string;
  instagramLabel: string;
  instagramUrl?: string;
  heroImageId: string;
  focusAreas: string[];
  siteUrl: string;
  seoTitle: string;
  seoDescription: string;
};

const sharedPricingPolicies = [
  'Additional edits are $40 each.',
  'Expected turnaround is 7 business days.',
  'A 50% non-refundable deposit is required to hold your spot.',
  'You may reschedule up to 24 hours before your shoot.',
  'A $30 late fee applies if the client arrives late.',
];

const standardBookingPackages: BookingPackage[] = [
  {
    title: 'Tier 1',
    price: '$300',
    depositDue: '$150',
    features: ['1 outfit', '4 high-end retouches', 'all raw images included'],
  },
  {
    title: 'Tier 2',
    price: '$550',
    depositDue: '$275',
    features: ['2 outfits', '8 high-end retouches', 'all raw images included'],
  },
  {
    title: 'Tier 3',
    price: '$850',
    depositDue: '$425',
    features: ['3 outfits', '12 high-end retouches', 'all raw images included'],
  },
];

const coupleBookingPackages: BookingPackage[] = [
  {
    title: 'Tier 1',
    price: '$500',
    depositDue: '$250',
    features: ['1 outfit', '5 high-end retouches', 'all raw images included'],
  },
  {
    title: 'Tier 2',
    price: '$700',
    depositDue: '$350',
    features: ['2 outfits', '8 high-end retouches', 'all raw images included'],
  },
  {
    title: 'Tier 3',
    price: '$900',
    depositDue: '$450',
    features: ['3 outfits', '12 high-end retouches', 'all raw images included'],
  },
];

const eventBookingPackages: BookingPackage[] = [
  {
    title: 'Tier 1',
    duration: '2 hours',
    price: '$300',
    features: ['30 lightly retouched images'],
  },
  {
    title: 'Tier 2',
    duration: '4 hours',
    price: '$600',
    features: ['50+ lightly retouched images'],
  },
  {
    title: 'Tier 3',
    duration: '7 hours',
    price: '$1000',
    features: ['100+ lightly retouched images'],
  },
];

const maternityBookingPackages: BookingPackage[] = [
  {
    title: 'Tier 1',
    price: '$350',
    depositDue: '$175',
    features: ['1 outfit', '4 high-end retouches', 'all raw images included'],
  },
  {
    title: 'Tier 2',
    price: '$650',
    depositDue: '$325',
    features: ['2 outfits', '8 high-end retouches', 'all raw images included'],
  },
  {
    title: 'Tier 3',
    price: '$900',
    depositDue: '$450',
    features: ['3 outfits', '12 high-end retouches', 'all raw images included'],
  },
];

const toPricingTiers = (packages: BookingPackage[]): PricingTier[] =>
  packages.map(({ title, price, features }) => ({
    title,
    price,
    items: features,
  }));

export const siteConfig: SiteConfig = {
  businessName: 'Samshotit',
  fullName: 'Samuel Oluwasanmi',
  heroHeadline: 'Samshotit',
  heroSupporting:
    'Portraits, beauty work, and event coverage with a clean eye and a personal feel.',
  heroIdentity: 'Photography by Samuel Oluwasanmi.',
  galleryIntro: 'Choose a category to view the work.',
  servicesHeading: 'What I shoot',
  servicesIntro:
    'Thoughtful photography for people, brands, and moments that matter.',
  services: [
    {
      title: 'Portrait sessions',
      summary:
        'For artists, brands, and personal projects that need clear direction and polished final images.',
    },
    {
      title: 'Beauty and studio work',
      summary:
        'Simple, detail-led studio images built around light, skin, styling, and shape.',
    },
    {
      title: 'Events and celebrations',
      summary:
        'Natural coverage for birthdays, private events, and the moments you want to keep feeling real.',
    },
  ],
  process: [
    {
      step: '01',
      title: 'Plan it well',
      body:
        'We get clear on the mood, location, timing, and what the images need to say.',
    },
    {
      step: '02',
      title: 'Keep it natural',
      body:
        'On the day, we give calm direction so the session never feels stiff.',
    },
    {
      step: '03',
      title: 'Deliver the edit',
      body:
        'You get a clean final set that is ready to share, publish, or keep.',
    },
  ],
  pricing: {
    sectionLabel: 'Pricing',
    heading: 'Current session and event rates',
    intro:
      'Browse the current package options for standard portraits, graduation sessions, couples, maternity shoots, and event coverage.',
    categories: [
      {
        id: 'standard',
        label: 'Standard',
        heading: 'Standard photoshoot packages',
        intro:
          'Tiered portrait sessions with high-end retouching and all raw images included.',
        tiers: toPricingTiers(standardBookingPackages),
      },
      {
        id: 'graduation',
        label: 'Graduation',
        heading: 'Graduation sessions',
        mode: 'reference',
        note:
          'Graduation sessions use the same Tier 1, Tier 2, and Tier 3 pricing as the standard photoshoot packages.',
      },
      {
        id: 'couples',
        label: 'Couples',
        heading: 'Engagement / couple photoshoot',
        intro:
          'Couple portraits with guided direction, polished edits, and all raw images included.',
        tiers: toPricingTiers(coupleBookingPackages),
      },
      {
        id: 'events',
        label: 'Events',
        heading: 'Event coverage',
        intro: 'Coverage priced by time with lightly retouched final image delivery.',
        tiers: toPricingTiers(eventBookingPackages),
      },
      {
        id: 'maternity',
        label: 'Maternity',
        heading: 'Maternity shoot',
        intro:
          'Maternity sessions with flexible styling, high-end retouching, and all raw images included.',
        tiers: toPricingTiers(maternityBookingPackages),
      },
    ],
    policies: sharedPricingPolicies,
    ctaLabel: 'View booking options',
    ctaHref: '/book',
  },
  booking: {
    navLabel: 'Book',
    pageTitle: 'Book a Session',
    intro: 'Review the packages below, then book or inquire to reserve your date.',
    supporting:
      'Standard, graduation, engagement, maternity, and event options are listed below. Events and custom concepts begin with an inquiry so the coverage and deliverables stay aligned from the start.',
    packageButtonLabel: 'Book now',
    fallbackCopy:
      'Online booking and inquiry links are being finalized. Email us to reserve your date in the meantime.',
    fallbackButtonLabel: 'Email us instead',
    policiesHeading: 'Booking policies',
    policies: sharedPricingPolicies,
    sections: [
      {
        id: 'standard',
        label: 'Standard',
        heading: 'Standard photoshoot packages',
        intro:
          'Tiered portrait packages for standard photoshoots with polished edits and every raw image included.',
        packages: standardBookingPackages,
      },
      {
        id: 'graduation',
        label: 'Graduation',
        heading: 'Graduation sessions',
        intro:
          'Graduation portraits use the same tier structure and pricing as the standard photoshoot packages.',
        mode: 'reference',
        note:
          'Choose Tier 1, Tier 2, or Tier 3 from the standard photoshoot packages for graduation sessions.',
        referenceLabel: 'View standard packages',
        referenceHref: '#standard',
      },
      {
        id: 'couples',
        label: 'Couples',
        heading: 'Engagement / couple photoshoot',
        intro:
          'Couple and engagement sessions with guided direction, polished edits, and all raw images included.',
        packages: coupleBookingPackages,
      },
      {
        id: 'events',
        label: 'Events',
        heading: 'Event coverage',
        intro:
          'Coverage is priced by the number of hours and delivered with lightly retouched final images.',
        mode: 'inquiry',
        actionLabel: 'Request event quote',
        packages: eventBookingPackages,
      },
      {
        id: 'maternity',
        label: 'Maternity',
        heading: 'Maternity shoot',
        intro:
          'Maternity sessions with flexible styling, high-end retouching, and all raw images included.',
        packages: maternityBookingPackages,
      },
    ],
    customInquiry: {
      id: 'custom',
      label: 'Custom',
      heading: 'Need a custom project?',
      body:
        'For brand work, creative concepts, or anything outside the listed packages, start with an inquiry so we can quote the right coverage, timing, and deliverables.',
      buttonLabel: 'Request a custom quote',
      fallbackCopy:
        'Online inquiry links are being finalized. Email us to start the conversation in the meantime.',
    },
  },
  calendarEmbedUrl: 'https://calendly.com/samshotit1/photography-session',
  paymentMethods: [
    { id: 'zelle', label: 'Zelle', handle: '(973) 836-9258' },
    { id: 'cashapp', label: 'CashApp', handle: '$samshot1t' },
  ],
  depositNote:
    'Send the non-refundable deposit shown above using your selected payment method, then tap Confirm.',
  aboutHeading: 'About Us',
  aboutBody: [
    'My name is Samuel Oluwasanmi, I am a photographer. This passion for photography started when I was a teenager.',
    'After discovering this passion of mine, I decided to hone my skills, and use it to help capture the best moments for others and myself.',
    'This process includes building a relationship with my client, where they feel comfortable and confident in these beautiful moments.',
  ],
  contactHeading: "Let's talk about your shoot.",
  contactCopy:
    'For bookings, collaborations, or questions, send an email and we will get back to you.',
  email: 'Samshotit@gmail.com',
  instagramLabel: '@sam.shot.it_',
  instagramUrl: 'https://www.instagram.com/sam.shot.it_?igsh=MTE5em5hdXFrNGlzaw==',
  heroImageId: '33',
  focusAreas: ['Portraits', 'Beauty', 'Events'],
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.com',
  seoTitle: 'Samshotit | Photography by Samuel Oluwasanmi',
  seoDescription:
    'Samshotit is the photography portfolio of Samuel Oluwasanmi, featuring portraits, beauty work, and event coverage.',
};
