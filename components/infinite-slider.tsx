'use client';

import SliderLogo from '@/assets/slider-logo.svg';
import useIsMobile from '@/lib/useIsMobile';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const Wrapper = styled(motion.div)`
  width: 100vw;
  overflow: hidden;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
  color: #161616;

  @media (max-width: 768px) {
    gap: 12px;
  }
`;

interface InfiniteSliderProps {
  color: string;
}

export default function InfiniteSlider({ color }: InfiniteSliderProps) {
  const isMobile = useIsMobile();

  return (
    <Wrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, color }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0 }}
    >
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ x: isMobile ? -297 : -594 }}
          transition={{
            ease: 'linear',
            duration: 5.94,
            repeat: Infinity,
          }}
        >
          <SliderLogo height={isMobile ? 77 : 154} />
        </motion.div>
      ))}
    </Wrapper>
  );
}
