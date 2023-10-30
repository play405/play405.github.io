'use client';

import styled from '@emotion/styled';
import { MotionProps, motion } from 'framer-motion';
import Image from 'next/image';

const Wrapper = styled(motion.div)`
  width: 512px;
  height: 512px;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  pointer-events: none;
  position: relative;

  img {
    object-fit: contain;
  }
`;

export default function GameBoy(props: MotionProps) {
  return (
    <Wrapper layoutId="gameboy" {...props}>
      <Image src="/images/gameboy.png" fill alt="GameBoy" draggable={false} />
    </Wrapper>
  );
}
