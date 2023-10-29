'use client';

import styled from '@emotion/styled';
import { MotionProps, motion } from 'framer-motion';
import Image from 'next/image';

const Wrapper = styled(motion.div)`
  width: 514px;
  height: 514px;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  pointer-events: none;
  position: relative;
`;

export default function GameBoy(props: MotionProps) {
  return (
    <Wrapper layoutId="gameboy" {...props}>
      <Image
        src="/images/gameboy.png"
        fill
        alt="GameBoy"
        draggable={false}
        style={{ objectFit: 'contain' }}
      />
    </Wrapper>
  );
}
