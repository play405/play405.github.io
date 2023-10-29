'use client';

import styled from '@emotion/styled';

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

export const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 20px;
`;
