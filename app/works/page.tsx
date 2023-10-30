'use client';

import Cartridge from '@/components/cartridge';
import CartridgeList from '@/components/cartridge-list';
import GameBoy from '@/components/game-boy';
import PutIn from '@/components/put-in';
import ViewType from '@/components/view-type';
import { Container, FullScreen, Grid } from '@/lib/style';
import useSize from '@/lib/useSize';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const Wrapper = styled(motion.div)`
  width: 1420px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 40px;
  position: relative;
  user-select: none;
  pointer-events: none;

  @media (max-width: 1419px) {
    width: calc(100% - 40px);
  }
`;

const ResponsiveWrapper = styled(Wrapper)`
  @media (min-width: 1920px) {
    width: calc(100% - 500px);
  }
`;

const Trigger = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
  padding-left: 40px;
  pointer-events: fill;
`;

const Cartridges = styled(motion.div)`
  width: 100dvw;
  height: calc(100dvh - 96px);
  position: fixed;
  left: 0;
  top: 96px;
`;

const Fixed = styled(Cartridges)`
  width: 1420px;
  height: calc(100% - 96px);
  position: fixed;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
  margin-top: 96px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  pointer-events: none;

  @media (max-width: 1419px) {
    width: calc(100% - 40px);
  }
`;

const CartridgesList = styled.div`
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

export default function Works() {
  const router = useRouter();
  const [dragged, setDragged] = useState<number>(-1);
  const [isList, setIsList] = useState(false);
  const {
    size: { width, height },
    ref: cartridges,
  } = useSize();

  const handleMouseUp = () => {
    if (dragged !== -1) {
      router.push(`/works/${dragged}`);
    }
  };

  return (
    <Container>
      {isList ? (
        <Grid>
          <ViewType isList={isList} setIsList={setIsList} />
          <CartridgesList>
            {[...Array(12)].map((_, i) => (
              <CartridgeList key={i} id={i + 1} />
            ))}
          </CartridgesList>
          <GameBoyWrapper>
            <GameBoy initial={{ width: '100%', height: '100%' }} />
          </GameBoyWrapper>
        </Grid>
      ) : (
        <FullScreen>
          <ResponsiveWrapper initial={{ x: 250 }}>
            <PutIn />
            <GameBoy initial={{ rotate: -90 }} exit={{ x: 750 }} />
          </ResponsiveWrapper>
          <Cartridges ref={cartridges}>
            {[...Array(12)].map((_, i) => (
              <Cartridge
                key={i}
                dragConstraints={cartridges}
                parentWidth={width}
                parentHeight={height}
                id={i + 1}
                setDragged={setDragged}
              />
            ))}
          </Cartridges>
          <Fixed>
            <ViewType isList={isList} setIsList={setIsList} />
          </Fixed>

          <ResponsiveWrapper initial={{ x: 230, position: 'absolute' }}>
            <Trigger onMouseUp={handleMouseUp}>
              <PutIn initial={{ opacity: 0 }} />
              <GameBoy initial={{ rotate: -90 }} exit={{ x: 750 }} />
            </Trigger>
          </ResponsiveWrapper>
        </FullScreen>
      )}
    </Container>
  );
}
