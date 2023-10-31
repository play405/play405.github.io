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

const Trigger = styled(motion.div)<{ grabbed?: boolean }>`
  position: fixed;
  width: 400px;
  height: 512px;
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

export default function Works() {
  const router = useRouter();
  const [dragged, setDragged] = useState(0);
  const [fixed, setFixed] = useState(false);
  const [isList, setIsList] = useState(false);
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
          <ViewType isList={isList} setIsList={setIsList} />
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
            <ViewType isList={isList} setIsList={setIsList} />
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
              initial={{
                rotate: -90,
                zIndex: 10,
                x: 256,
              }}
              exit={{ x: 1024 }}
            />
          </Wrapper>

          <FullScreen>
            <Cartridges ref={cartridges}>
              {designers.map((_, i) => (
                <Cartridge
                  key={i}
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
