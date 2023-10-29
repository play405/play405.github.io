'use client';

import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const Wrapper = styled(motion.div)`
  width: 24px;
  height: 32px;
  background-color: ${({ color }) => color};
  border-radius: 4px;
  position: absolute;
  top: 0;
  left: 0;
`;

const Cartridge = styled(motion.div)`
  width: 24px;
  height: 32px;
  background-color: ${({ color }) => color};
  border-radius: 4px;
`;

interface MiniCartridgeProps {
  parentWidth: number;
  parentHeight: number;
  index: number;
  color: string;
  onAnimationComplete: (i: number) => void;
  onHoverStart: (i: number) => void;
}

export default function MiniCartridge({
  parentWidth,
  parentHeight,
  index,
  color,
  onAnimationComplete,
  onHoverStart,
}: MiniCartridgeProps) {
  const speed = Math.random() * 128 + 128;
  const duration = parentHeight / speed;
  const delay = Math.random() * 5;

  return (
    <Wrapper
      initial={{
        x: Math.random() * parentWidth,
        y: -32,
      }}
      animate={{ y: parentHeight }}
      transition={{
        ease: 'linear',
        duration,
        delay,
      }}
      onAnimationComplete={() => onAnimationComplete(index)}
      onHoverStart={() => onHoverStart(index)}
      color={color}
    />
  );
}
