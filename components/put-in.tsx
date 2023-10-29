'use client';

import styled from '@emotion/styled';
import { MotionProps, motion } from 'framer-motion';

const Wrapper = styled(motion.div)`
  position: relative;
  width: 64px;
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  background-color: #24252c;
`;

const Inner = styled(motion.div)`
  width: 100%;
  height: 100%;
  border-radius: 100%;
  background-color: #a5aabc;
`;

const Text = styled.div`
  position: absolute;
  font-size: 1.25rem; // 20px
  line-height: 1;
  font-weight: bold;
  color: #a5aabc;
  top: -44px;
`;

export default function PutIn(props: MotionProps) {
  return (
    <Wrapper {...props}>
      <Inner
        initial={{ opacity: 1, scale: 0 }}
        animate={{ opacity: 0, scale: 1 }}
        transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 0.5 }}
      />
      <Text>Put in!</Text>
    </Wrapper>
  );
}
