'use client';

import GameBoy from '@/components/game-boy';
import InfiniteSlider from '@/components/infinite-slider';
import MiniCartridge from '@/components/mini-cartridge';
import { designers } from '@/lib/designer';
import { Container, FullScreen, Wrapper } from '@/lib/style';
import usePosition from '@/lib/usePosition';
import styled from '@emotion/styled';
import { Variants, motion, useMotionValue } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

import CartridgeBox from '@/assets/cartridge-box.svg';
import IconStart from '@/assets/icon-start.svg';

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
  static: {
    opacity: 0.5,
  },
};

export default function Home() {
  const cartridges = designers.map(designer => designer.cartridge);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const [counts, setCounts] = useState(cartridges.map(() => 0));
  const [color, setColor] = useState('#24252c');
  const [hovered, setHovered] = useState(true);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const {
    position: { width, height },
    ref: wrapper,
  } = usePosition();

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
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const id = setTimeout(() => {
      setTimeoutId(null);
    }, 250);
    setTimeoutId(id);

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
          exit={{ x: 768 }}
        />
      </Wrapper>

      <Wrapper>
        <StartButton
          href="/works"
          onMouseEnter={() => setHovered(false)}
          onMouseLeave={() => setHovered(true)}
        >
          START
          <IconStart />
        </StartButton>
      </Wrapper>

      <FullScreen ref={wrapper}>
        <Cursor
          style={{ x, y }}
          variants={cursorVariants}
          animate={hovered ? (timeoutId ? 'visible' : 'static') : 'hidden'}
        >
          <CartridgeBox />
        </Cursor>

        {width > 0 &&
          cartridges.map((cartridge, i) => (
            <MiniCartridge
              key={`${i}-${counts[i]}`}
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
