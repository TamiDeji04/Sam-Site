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
        'On the day, Samuel gives calm direction so the session never feels stiff.',
    },
    {
      step: '03',
      title: 'Deliver the edit',
      body:
        'You get a clean final set that is ready to share, publish, or keep.',
    },
  ],
  aboutHeading: 'About Samuel',
  aboutBody: [
    'My name is Samuel Oluwasanmi, I am a photographer. This passion for photography started when I was a teenager.',
    'After discovering this passion of mine, I decided to hone my skills, and use it to help capture the best moments for others and myself.',
    'This process includes building a relationship with my client, where they feel comfortable and confident in these beautiful moments.',
  ],
  contactHeading: "Let's talk about your shoot.",
  contactCopy:
    'For bookings, collaborations, or questions, send an email and Samuel will get back to you.',
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
