import { designers } from '@/lib/designer';

interface Props {
  params: {
    id: string;
  };
}

export function generateMetadata({ params: { id } }: Props) {
  const designer = designers[Number(id) - 1];

  return {
    title: `${designer.cartridge.title} - ${designer.name} | Play! 405`,
  };
}

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
