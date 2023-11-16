'use client';

import styled from '@emotion/styled';
import { motion } from 'framer-motion';

import SliderLogo from '@/assets/slider-logo.svg';

const Wrapper = styled(motion.div)`
  width: 100vw;
  overflow: hidden;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
  color: #161616;

  * {
    flex: none;
  }
`;

interface InfiniteSliderProps {
  color: string;
}

export default function InfiniteSlider({ color }: InfiniteSliderProps) {
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
          animate={{ x: -594 }}
          transition={{
            ease: 'linear',
            duration: 5.94,
            repeat: Infinity,
          }}
        >
          <SliderLogo />
        </motion.div>
      ))}
    </Wrapper>
  );
}
