'use client';

import styled from '@emotion/styled';
import { motion } from 'framer-motion';

export const Container = styled.div`
  width: 1500px;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 40px;
  gap: 20px;
  z-index: 1;

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
  z-index: 10;
  background-color: #161616;
`;

export const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 20px;
`;
