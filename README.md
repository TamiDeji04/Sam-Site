# Sam Portfolio

Single-page photography portfolio built with Next.js 14.

## Local development

```bash
npm install
npm run dev
```

Preview the site at `http://localhost:3000`.

## Production

Set the public site URL before deploying:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

Then build and start:

```bash
npm run build
npm run start
```

## Content surfaces

- Update copy, contact details, and SEO defaults in `lib/site-config.ts`.
- Update the curated image set in `fav-pics/optimized/`.
- Gallery metadata and labels live in `lib/portfolio-data.ts`.

## Notes

- `fav-pics/pics/` keeps the original source images.
- `fav-pics/optimized/` contains the web-sized versions used by the app.
- `sharp` is installed so Next.js can optimize images in production.
