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

  @media (max-width: 920px) {
    display: none;
  }
`;

const ImageWrapper = styled(motion.div)`
  flex: none;
  width: 200%;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  pointer-events: none;
  position: relative;
  aspect-ratio: 1/1;

  img {
    object-fit: contain;
  }
`;

const ThumbnailWrapper = styled(motion.div)`
  max-width: 100%;
  max-height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  aspect-ratio: 364/512;
`;

const Thumbnail = styled(motion.div)`
  width: 80%;
  position: absolute;
  top: 7.5%;
  aspect-ratio: 464/326;

  img {
    object-fit: cover;
  }
`;

interface GameBoyProps extends MotionProps {
  style?: React.CSSProperties;
  src?: string;
}

export default function GameBoy({ src, ...props }: GameBoyProps) {
  return (
    <Wrapper style={props.style}>
      <ImageWrapper layoutId="gameboy" {...props}>
        <Image
          src="/images/gameboy.png"
          fill
          alt="GameBoy"
          draggable={false}
          priority
        />
        {src && (
          <ThumbnailWrapper layoutId="gameboy-thumbnail">
            <Thumbnail>
              <Image src={src} fill alt="Thumbnail" draggable={false} />
            </Thumbnail>
          </ThumbnailWrapper>
        )}
      </ImageWrapper>
    </Wrapper>
  );
}
