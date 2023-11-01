import { useEffect, useRef, useState } from 'react';

export default function usePosition() {
  const [position, setPosition] = useState({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
  });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (ref.current) {
        setPosition({
          width: ref.current.offsetWidth,
          height: ref.current.offsetHeight,
          top: ref.current.offsetTop,
          left: ref.current.offsetLeft,
        });
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return { position, ref };
}
