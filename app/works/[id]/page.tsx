import { designers } from '@/lib/designer';
import { sync } from 'glob';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import WorkLayout from './work-layout';

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

export async function generateStaticParams() {
  const paths = sync('posts/*.mdx');

  return paths.map(path => ({
    id: path.match(/posts\/(.*)\.mdx/)![1],
  }));
}

export default function Work({ params: { id } }: Props) {
  const Post = dynamic(() => import(`@/posts/${id}.mdx`), {
    ssr: false,
  });

  return (
    <WorkLayout id={Number(id) - 1}>
      <Post />
    </WorkLayout>
  );
}
