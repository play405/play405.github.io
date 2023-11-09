'use client';

import styled from '@emotion/styled';
import { MotionProps, motion } from 'framer-motion';
import Image from 'next/image';

const Wrapper = styled(motion.div)`
  width: 256px;
  height: 364px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImageWrapper = styled(motion.div)`
  min-width: 512px;
  min-height: 512px;
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
    <Wrapper style={props.style}>
      <ImageWrapper layoutId="gameboy" {...props}>
        <Image src="/images/gameboy.png" fill alt="GameBoy" draggable={false} />
      </ImageWrapper>
    </Wrapper>
  );
}
