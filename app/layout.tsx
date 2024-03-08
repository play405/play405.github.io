import '@/assets/SUIT-Variable.css';
import Layout from '@/components/layout';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://play405.github.io'),
  title: {
    template: '%s | Play! 405',
    default: 'Play! 405',
  },
  description: '2023 한성대학교 제품서비스디자인트랙 졸업전시',
  openGraph: {
    title: 'Play! 405',
    description: '2023 한성대학교 제품서비스디자인트랙 졸업전시',
    url: 'https://play405.github.io',
    siteName: 'Play! 405',
    images: [{ url: '/images/thumbnails/0.png' }],
    locale: 'ko_KR',
    type: 'website',
  },
  verification: {
    google: 'AMNl4NqEa5kN4p15vXRRBpNq3eJ9_0uio9zOX5NvOak',
  },
  themeColor: '#161616',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
