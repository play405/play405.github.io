'use client';

import styled from '@emotion/styled';
import { motion } from 'framer-motion';

export const Container = styled(motion.div)`
  width: 1500px;
  min-height: calc(100vh - 120px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px;
  gap: 20px;
  position: relative;

  @media (max-width: 1500px) {
    width: 100%;
  }
`;

export const FullScreen = styled(motion.div)`
  width: 100dvw;
  height: 100dvh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  overflow: hidden;
`;

export const Grid = styled(motion.div)`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 20px;
`;

export const Wrapper = styled(motion.div)`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: relative;
  gap: 40px;

  @media (min-width: 1920px) {
    width: calc(100dvw - 512px);
  }
`;
