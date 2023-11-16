import { designers } from '@/lib/designer';
import { Metadata } from 'next';

interface Props {
  params: {
    id: string;
  };
}

export function generateMetadata({ params: { id } }: Props): Metadata {
  const designer = designers[Number(id) - 1];

  return {
    title: `${designer.cartridge.title} - ${designer.name} | Play! 405`,
    openGraph: {
      title: `${designer.cartridge.title} - ${designer.name} | Play! 405`,
      description: designer.cartridge.description,
      images: [{ url: `/images/thumbnails/${id}.png` }],
    },
  };
}

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
