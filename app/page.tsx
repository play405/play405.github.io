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
import { useEffect, useState } from 'react';

import CartridgeBox from '@/assets/cartridge-box.svg';
import CursorStart from '@/assets/cursor-start.svg';
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

const PressStartWrapper = styled(Wrapper)`
  justify-content: center;
  font-size: 32px;
  padding: 16px;
  line-height: 1;
  font-weight: bold;
  color: #24252c;
`;

const pressStartVariants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      repeat: Infinity,
      repeatType: 'mirror',
      duration: 1,
    },
  },
};

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

const backgroundVariants: Variants = {
  initial: {
    zIndex: 0,
    backgroundColor: '#ffffff',
  },
  animate: {
    opacity: 0,
  },
};

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false);

  const [audio, setAudio] = useState<HTMLAudioElement>();

  useEffect(() => {
    const audio = new Audio(
      'https://vgmsite.com/soundtracks/pokemon-gold-gb/pjpcaior/48_Bicycle.mp3'
    );
    audio.volume = 0.2;
    audio.loop = true;

    setAudio(audio);
  }, []);

  useEffect(() => {
    if (isPlaying) {
      audio?.play();
    }

    return () => {
      audio?.pause();
    };
  }, [audio, isPlaying]);

  const cartridges = designers.map(designer => designer.cartridge);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const [counts, setCounts] = useState(cartridges.map(() => 0));
  const [color, setColor] = useState('#24252c');
  const [isHovered, setIsHovered] = useState(false);
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
    if (isPlaying) {
      setColor(cartridges[i].color);
      handleAnimationComplete(i);
    }
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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ cursor: 'none' }}
      exit={{ opacity: 0 }}
    >
      <FullScreen
        variants={backgroundVariants}
        initial="initial"
        animate={isPlaying ? 'animate' : 'initial'}
      />

      <Wrapper>
        <InfiniteSlider color={color} />
        <GameBoy
          initial={{ opacity: 0, rotate: 90, x: 256 }}
          animate={{ opacity: 1 }}
          exit={{ x: 768 }}
        />
      </Wrapper>

      {isPlaying ? (
        <Wrapper>
          <StartButton
            href="/works"
            onMouseEnter={() => setIsHovered(false)}
            onMouseLeave={() => setIsHovered(true)}
          >
            START
            <IconStart />
          </StartButton>
        </Wrapper>
      ) : (
        <PressStartWrapper
          variants={pressStartVariants}
          initial="initial"
          animate="animate"
        >
          PRESS START
        </PressStartWrapper>
      )}

      <FullScreen ref={wrapper}>
        <Cursor
          style={{ x, y }}
          variants={cursorVariants}
          animate={
            isHovered
              ? timeoutId || !isPlaying
                ? 'visible'
                : 'static'
              : 'hidden'
          }
          onClick={() => setIsPlaying(true)}
        >
          {isPlaying ? <CartridgeBox /> : <CursorStart />}
        </Cursor>

        {width > 0 &&
          cartridges.map((cartridge, i) => (
            <MiniCartridge
              key={`${i}-${counts[i]}`}
              parentWidth={width}
              parentHeight={height}
              color={isPlaying ? cartridge.color : '#24252c'}
              index={i}
              onAnimationComplete={handleAnimationComplete}
              onHoverStart={handleHoverStart}
            />
          ))}
      </FullScreen>
    </Container>
  );
}
