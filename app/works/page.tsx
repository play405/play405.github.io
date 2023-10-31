'use client';

import Cartridge from '@/components/cartridge';
import CartridgeList from '@/components/cartridge-list';
import GameBoy from '@/components/game-boy';
import PutIn from '@/components/put-in';
import ViewType from '@/components/view-type';
import { designers } from '@/lib/designer';
import { Container, FullScreen, Grid, Wrapper } from '@/lib/style';
import useSize from '@/lib/useSize';
import styled from '@emotion/styled';
import { Variants, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import Shuffle from '@/assets/shuffle.svg';

const Trigger = styled(motion.div)<{ grabbed?: boolean }>`
  position: fixed;
  width: 400px;
  height: 256px;
  z-index: 10;
  cursor: ${({ grabbed }) => (grabbed ? 'e-resize' : 'default')};
`;

const Cartridges = styled(motion.div)`
  width: 100dvw;
  height: calc(100dvh - 120px);
  position: fixed;
  left: 0;
  top: 120px;
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

const ShuffleButton = styled(Shuffle)`
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
    x: 256,
  },
  exit: {
    x: 1024,
  },
  grabbed: {
    x: 1024,
    transition: {
      delay: 1,
    },
  },
};

export default function Works() {
  const router = useRouter();
  const [dragged, setDragged] = useState(0);
  const [fixed, setFixed] = useState(false);
  const [isList, setIsList] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const {
    size: { width, height },
    ref: cartridges,
  } = useSize();

  const handleMouseUp = () => {
    if (dragged) {
      router.push(`/works/${dragged}`);
    }
  };

  return (
    <Container initial={{ gap: 0 }}>
      {isList ? (
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
            {designers.map((_, i) => (
              <CartridgeList key={i} id={i + 1} />
            ))}
          </CartridgesList>
          <GameBoyWrapper>
            <GameBoy initial={{ width: '100%', height: '100%' }} />
          </GameBoyWrapper>
        </Grid>
      ) : (
        <>
          <Grid>
            <Buttons>
              <ShuffleButton onClick={() => setShuffle(!shuffle)} />
              <ViewType isList={isList} setIsList={setIsList} />
            </Buttons>
          </Grid>

          <Wrapper>
            <Trigger
              onMouseUp={handleMouseUp}
              onMouseEnter={() => setFixed(true)}
              onMouseLeave={() => setFixed(false)}
              grabbed={dragged !== 0}
            />

            <PutIn initial={{ opacity: 1, x: 256 }} />
            <GameBoy
              variants={gameBoyVariants}
              initial="initial"
              exit={dragged ? 'grabbed' : 'exit'}
            />
          </Wrapper>

          <FullScreen>
            <Cartridges ref={cartridges}>
              {designers.map((_, i) => (
                <Cartridge
                  key={`cartridge-${i + 1} shuffle-${shuffle}`}
                  dragConstraints={cartridges}
                  parentWidth={width}
                  parentHeight={height}
                  id={i + 1}
                  setDragged={setDragged}
                  fixed={dragged === i + 1 && fixed}
                />
              ))}
            </Cartridges>
          </FullScreen>
        </>
      )}
    </Container>
  );
}
