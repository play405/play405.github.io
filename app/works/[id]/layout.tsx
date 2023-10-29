import type { Metadata } from 'next';

// TODO: Add metadata for this layout.

export const metadata: Metadata = {
  title: 'Work',
};

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
