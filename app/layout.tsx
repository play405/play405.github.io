import Layout from '@/components/layout';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    template: '%s | Play! 405',
    default: 'Play! 405',
  },
  description: '2023 한성대학교 제품서비스디자인트랙 졸업전시',
  metadataBase: new URL('https://play405.github.io'),
  openGraph: {
    title: 'Play! 405',
    description: '2023 한성대학교 제품서비스디자인트랙 졸업전시',
    images: [{ url: '/images/thumbnails/0.png' }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <link
          href="https://cdn.jsdelivr.net/gh/sun-typeface/SUIT/fonts/variable/woff2/SUIT-Variable.css"
          rel="stylesheet"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta
          name="google-site-verification"
          content="AMNl4NqEa5kN4p15vXRRBpNq3eJ9_0uio9zOX5NvOak"
        />
        <meta
          name="naver-site-verification"
          content="ade462973e0addd5eae3f820ac0ac0428a3223be"
        />
      </head>
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
