import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Works',
};

export default function WorksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
