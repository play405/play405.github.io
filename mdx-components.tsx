import type { MDXComponents } from 'mdx/types';
import Image from 'next/image';

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including components from
// other libraries.

// This file is required to use MDX in `app` directory.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    img: ({
      className,
      src,
      alt,
    }: React.ImgHTMLAttributes<HTMLImageElement>) => (
      <Image
        className={className}
        src={src!}
        width={0}
        height={0}
        sizes="100vw"
        alt={alt!}
        style={{ width: '100%', height: 'auto' }}
        priority
      />
    ),

    ...components,
  };
}
