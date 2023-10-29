import { sync } from 'glob';
import dynamic from 'next/dynamic';
import WorkLayout from './work-layout';

interface WorkProps {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  const paths = sync('posts/*.mdx');

  return paths.map(path => ({
    id: path.match(/posts\/(.*)\.mdx/)![1],
  }));
}

export default function Work({ params: { id } }: WorkProps) {
  const Post = dynamic(() => import(`@/posts/${id}.mdx`));

  return (
    <WorkLayout id={Number(id) - 1}>
      <Post />
    </WorkLayout>
  );
}
