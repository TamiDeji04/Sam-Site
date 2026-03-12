import { ImageResponse } from 'next/og';
import { siteConfig } from '@/lib/site-config';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background:
            'linear-gradient(135deg, rgba(244, 238, 231, 1) 0%, rgba(231, 219, 204, 1) 100%)',
          color: '#171311',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'space-between',
          padding: '56px',
          position: 'relative',
          width: '100%',
        }}
      >
        <div
          style={{
            border: '1px solid rgba(23, 19, 17, 0.12)',
            borderRadius: 36,
            inset: 24,
            position: 'absolute',
          }}
        />
        <div
          style={{
            color: '#7f4f2a',
            display: 'flex',
            fontFamily: 'Helvetica Neue, Arial, sans-serif',
            fontSize: 22,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
          }}
        >
          {siteConfig.businessName}
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 18,
            maxWidth: 760,
          }}
        >
          <div
            style={{
              display: 'flex',
              fontFamily: 'Georgia, serif',
              fontSize: 72,
              fontWeight: 500,
              letterSpacing: '-0.05em',
              lineHeight: 1,
            }}
          >
            {siteConfig.businessName}
          </div>
          <div
            style={{
              color: '#5a514b',
              display: 'flex',
              fontFamily: 'Helvetica Neue, Arial, sans-serif',
              fontSize: 28,
              lineHeight: 1.4,
            }}
          >
            Photography by {siteConfig.fullName}
          </div>
          <div
            style={{
              color: '#5a514b',
              display: 'flex',
              fontFamily: 'Helvetica Neue, Arial, sans-serif',
              fontSize: 24,
              lineHeight: 1.5,
            }}
          >
            {siteConfig.heroSupporting}
          </div>
        </div>
        <div
          style={{
            color: '#5a514b',
            display: 'flex',
            fontFamily: 'Helvetica Neue, Arial, sans-serif',
            fontSize: 24,
            gap: 20,
          }}
        >
          <span>{siteConfig.focusAreas[0]}</span>
          <span>/</span>
          <span>{siteConfig.focusAreas[1]}</span>
          <span>/</span>
          <span>{siteConfig.focusAreas[2]}</span>
        </div>
      </div>
    ),
    size,
  );
}
