'use client';

import styled from '@emotion/styled';
import { AnimatePresence } from 'framer-motion';
import { LayoutRouterContext } from 'next/dist/shared/lib/app-router-context';
import { usePathname } from 'next/navigation';
import { PropsWithChildren, useContext, useRef } from 'react';
import Navbar from './navbar';

const Wrapper = styled.div`
  width: 100%;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function FrozenRouter({ children }: PropsWithChildren) {
  const context = useContext(LayoutRouterContext);
  const frozen = useRef(context).current;

  return (
    <LayoutRouterContext.Provider value={frozen}>
      {children}
    </LayoutRouterContext.Provider>
  );
}

export default function Layout({ children }: PropsWithChildren) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <div key={pathname}>
        <FrozenRouter>
          <Wrapper>
            <Navbar />
            {children}
          </Wrapper>
        </FrozenRouter>
      </div>
    </AnimatePresence>
  );
}
