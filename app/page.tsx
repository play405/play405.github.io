'use client';

import GameBoy from '@/components/game-boy';
import InfiniteSlider from '@/components/infinite-slider';
import MiniCartridge from '@/components/mini-cartridge';
import { designers } from '@/lib/designer';
import { Container, FullScreen, Wrapper } from '@/lib/style';
import useSize from '@/lib/useSize';
import styled from '@emotion/styled';
import { Variants, motion, useMotionValue } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

const Cursor = styled(motion.div)`
  position: absolute;
  top: -40px;
  left: -40px;
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StartButton = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: 16px 20px;
  color: #ffffff;
  font-size: 2rem; // 32px
  line-height: 1;
  font-weight: bold;
  z-index: 10;

  :hover {
    color: #ffffff;
    box-shadow: inset 0px 0px 0px 2px #ffffff;
  }
`;

const cursorVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,
  },
};

export default function Home() {
  const cartridges = designers.map(designer => designer.cartridge);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const [counts, setCounts] = useState(cartridges.map(() => 0));
  const [color, setColor] = useState('#24252c');
  const [hovered, setHovered] = useState(false);

  const {
    size: { width, height },
    ref: wrapper,
  } = useSize();

  const handleAnimationComplete = (i: number) => {
    setCounts(prev => {
      const next = [...prev];
      next[i] += 1;
      return next;
    });
  };

  const handleHoverStart = (i: number) => {
    setColor(cartridges[i].color);
    handleAnimationComplete(i);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    x.set(e.clientX);
    y.set(e.clientY);
  };

  return (
    <Container
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ cursor: 'none' }}
      exit={{ opacity: 0 }}
    >
      <Wrapper>
        <InfiniteSlider color={color} />
        <GameBoy
          initial={{ opacity: 0, rotate: 90, x: 256 }}
          animate={{ opacity: 1 }}
          exit={{ x: 750 }}
        />
      </Wrapper>

      <Wrapper>
        <StartButton
          href="/works"
          onMouseEnter={() => setHovered(false)}
          onMouseLeave={() => setHovered(true)}
        >
          START
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M28.8 16.0001L7.20005 28.4709L7.20005 3.52933L28.8 16.0001Z"
              fill="white"
            />
          </svg>
        </StartButton>
      </Wrapper>

      <FullScreen ref={wrapper}>
        <Cursor
          style={{ x, y }}
          variants={cursorVariants}
          animate={hovered ? 'visible' : 'hidden'}
        >
          <svg
            width="80"
            height="80"
            viewBox="0 0 80 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.87793 25.0668L40.0946 4.87793L75.1218 25.0668L40.0037 45.6953L4.87793 25.0668Z"
              fill="#161616"
              stroke="white"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4.87793 24.9926L40.0946 4.87793L75.1218 24.9926L40.0037 45.5455L4.87793 24.9926Z"
              fill="#161616"
              stroke="white"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4.87793 25.2114V54.5893L39.9999 75.1216V46.0142L4.87793 25.2114Z"
              fill="white"
              stroke="white"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M75.122 25.2114V54.5893L40 75.1216V46.0142L75.122 25.2114Z"
              fill="white"
              stroke="white"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Cursor>

        {width > 0 &&
          cartridges.map((cartridge, i) => (
            <MiniCartridge
              key={`${i}${counts[i]}`}
              parentWidth={width}
              parentHeight={height}
              color={cartridge.color}
              index={i}
              onAnimationComplete={handleAnimationComplete}
              onHoverStart={handleHoverStart}
            />
          ))}
      </FullScreen>
    </Container>
  );
}
