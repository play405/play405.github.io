'use client';

import styled from '@emotion/styled';
import { motion } from 'framer-motion';

import SliderLogo from '@/assets/slider-logo.svg';

const Wrapper = styled(motion.div)`
  position: absolute;
  display: flex;
  gap: 24px;
  color: #161616;
`;

interface InfiniteSliderProps {
  color: string;
}

export default function InfiniteSlider({ color }: InfiniteSliderProps) {
  return (
    <Wrapper
      initial={{ opacity: 0, x: 2970 }}
      animate={{ opacity: 1, x: 2376, color }}
      transition={{
        ease: 'linear',
        duration: 5.94,
        repeat: Infinity,
        color: { duration: 0.5 },
        opacity: { duration: 0.5 },
      }}
      exit={{ opacity: 0 }}
    >
      {[...Array(10)].map((_, i) => (
        <SliderLogo key={i} />
      ))}
    </Wrapper>
  );
}
