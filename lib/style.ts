'use client';

import styled from '@emotion/styled';
import { motion } from 'framer-motion';

export const Container = styled(motion.div)`
  width: 1500px;
  min-height: calc(100dvh - 120px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px;
  gap: 80px;

  @media (max-width: 1500px) {
    width: 100%;
  }

  @media (max-width: 920px) {
    gap: 240px;
  }

  @media (max-width: 768px) {
    padding: 24px;
  }
`;

export const FullScreen = styled(motion.div)<{ exceptnavbar?: boolean }>`
  width: 100dvw;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  overflow: hidden;
  padding-top: ${({ exceptnavbar }) => (exceptnavbar ? '120px' : '0')};
`;

export const Grid = styled(motion.div)`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 20px;

  @media (max-width: 920px) {
    display: flex;
    flex-direction: column;
    gap: 32px;
  }
`;

export const Wrapper = styled(motion.div)`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 40px;

  @media (min-width: 1920px) {
    width: calc(100dvw - 512px);
  }

  @media (max-width: 920px) {
    justify-content: center;
  }
`;
