'use client';

import Cartridge from '@/components/cartridge';
import CartridgeList from '@/components/cartridge-list';
import GameBoy from '@/components/game-boy';
import Put from '@/components/put';
import ViewType from '@/components/view-type';
import { designers } from '@/lib/designer';
import { Container, FullScreen, Grid, Wrapper } from '@/lib/style';
import usePosition from '@/lib/usePosition';
import styled from '@emotion/styled';
import { Variants, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import Shuffle from '@/assets/shuffle.svg';
import { isListState } from '@/lib/state';
import useIsTablet from '@/lib/useIsTablet';
import { useRouter } from 'next/navigation';
import { useRecoilState } from 'recoil';

const Trigger = styled(motion.div)<{ triggered?: boolean }>`
  position: fixed;
  width: 400px;
  height: 256px;
  cursor: ${({ triggered }) => (triggered ? 'e-resize' : 'default')};
`;

const Cartridges = styled(motion.div)`
  height: 100%;
  flex: 1;
  z-index: 1;
  position: relative;
`;

const CartridgesList = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  grid-column: 3/8;
`;

const GameBoyWrapper = styled.div`
  height: calc(100dvh - 200px);
  grid-column: 8/13;
  position: sticky;
  top: 160px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 920px) {
    display: none;
  }
`;

const Buttons = styled(motion.div)`
  grid-column: 1/3;
  position: fixed;
  bottom: 40px;
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const ShuffleButton = styled(motion.div)`
  cursor: pointer;
`;

const listVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const gameBoyVariants: Variants = {
  initial: {
    rotate: -90,
    zIndex: 10,
    x: 128,
  },
  exit: {
    x: 1024,
  },
  triggered: {
    x: 1024,
    transition: {
      delay: 1,
    },
  },
};

export default function Works() {
  const router = useRouter();
  const [triggered, setTriggered] = useState(0);
  const [isList, setIsList] = useRecoilState(isListState);
  const [shuffle, setShuffle] = useState(false);
  const [hovered, setHovered] = useState(0);
  const { position, ref: cartridges, calculatePosition } = usePosition();
  const {
    position: triggerPosition,
    ref: trigger,
    calculatePosition: calculateTriggerPosition,
  } = usePosition();
  const isTablet = useIsTablet();

  useEffect(() => {
    if (triggered) {
      router.push(`/works/${triggered}`);
    }
  }, [triggered, router]);

  useEffect(() => {
    if (!isTablet && !isList) {
      calculatePosition();
      calculateTriggerPosition();
    }
  }, [calculatePosition, calculateTriggerPosition, isList, isTablet]);

  return isTablet || isList ? (
    <Container>
      <Grid>
        <Buttons>
          <ViewType isList={isList} setIsList={setIsList} />
        </Buttons>
        <CartridgesList
          variants={listVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {designers.map(designer => (
            <CartridgeList
              key={designer.id}
              id={designer.id}
              setHovered={setHovered}
            />
          ))}
        </CartridgesList>
        <GameBoyWrapper>
          <GameBoy
            style={{ width: '100%', height: '100%' }}
            src={hovered ? `/images/thumbnails/${hovered}.png` : undefined}
          />
        </GameBoyWrapper>
      </Grid>
    </Container>
  ) : (
    <FullScreen exceptnavbar>
      <Container initial={{ height: '100%', gap: 0 }}>
        <Grid>
          <Buttons>
            <ShuffleButton
              onClick={() => setShuffle(!shuffle)}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Shuffle />
            </ShuffleButton>
            <ViewType isList={isList} setIsList={setIsList} />
          </Buttons>
        </Grid>

        <Wrapper initial={{ height: '100%' }}>
          <Trigger ref={trigger} />

          <Cartridges ref={cartridges}>
            {designers.map((_, i) => (
              <Cartridge
                key={`cartridge-${i + 1} shuffle-${shuffle}`}
                parentPosition={position}
                triggerPosition={triggerPosition}
                id={i + 1}
                triggered={triggered === i + 1}
                setTriggered={setTriggered}
              />
            ))}
          </Cartridges>

          <Put
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <GameBoy
            variants={gameBoyVariants}
            initial="initial"
            exit={triggered ? 'triggered' : 'exit'}
          />
        </Wrapper>
      </Container>
    </FullScreen>
  );
}
