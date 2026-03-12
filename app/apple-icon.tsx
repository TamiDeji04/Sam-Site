import { ImageResponse } from 'next/og';

export const size = {
  width: 180,
  height: 180,
};

export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: 'center',
          background: '#f4eee7',
          color: '#171311',
          display: 'flex',
          fontFamily: 'Georgia, serif',
          fontSize: 92,
          height: '100%',
          justifyContent: 'center',
          position: 'relative',
          width: '100%',
        }}
      >
        <div
          style={{
            border: '2px solid rgba(127, 79, 42, 0.22)',
            borderRadius: 38,
            inset: 14,
            position: 'absolute',
          }}
        />
        <span>S</span>
      </div>
    ),
    size,
  );
}
