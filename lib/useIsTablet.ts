import { useLayoutEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

export default function useIsTablet() {
  const [isTablet, setIsTablet] = useState(false);
  const tablet = useMediaQuery({ query: '(max-width: 920px)' });

  useLayoutEffect(() => {
    setIsTablet(tablet);
  }, [tablet]);

  return isTablet;
}
