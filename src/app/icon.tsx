import { ImageResponse } from 'next/og';

export function generateImageMetadata() {
  return [
    { id: '16', size: { width: 16, height: 16 }, alt: 'Nexvora Icon' },
    { id: '32', size: { width: 32, height: 32 }, alt: 'Nexvora Icon' },
    { id: '48', size: { width: 48, height: 48 }, alt: 'Nexvora Icon' },
    { id: '180', size: { width: 180, height: 180 }, alt: 'Nexvora Icon' },
    { id: '512', size: { width: 512, height: 512 }, alt: 'Nexvora Icon' },
  ];
}

export default function Icon({ id }: { id: string }) {
  return new ImageResponse(
    (
      <div style={{ display: 'flex', width: '100%', height: '100%', background: 'transparent' }}>
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <polygon points="33,29.5 67,46.5 67,70.5 33,53.5" fill="#2563EB" />
          <polygon points="10,2 34,14 34,70 10,58" fill="#3B82F6" />
          <polygon points="66,30 90,42 90,98 66,86" fill="#3B82F6" />
        </svg>
      </div>
    ),
    { background: 'transparent' }
  );
}
