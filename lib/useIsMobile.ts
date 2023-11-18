import { useLayoutEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

export default function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  const mobile = useMediaQuery({ query: '(max-width: 768px)' });

  useLayoutEffect(() => {
    setIsMobile(mobile);
  }, [mobile]);

  return isMobile;
}
