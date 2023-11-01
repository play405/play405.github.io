'use client';

import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import NavItem from './nav-item';

import MainLogo from '@/assets/main-logo.svg';

const Wrapper = styled.nav`
  width: 100%;
  height: 120px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 32px 40px;
  position: sticky;
  top: 0;
  z-index: 100;
  user-select: none;
`;

const Logo = styled(motion.div)`
  font-weight: 500;
  line-height: 1.375;
  color: #a5aabc;
`;

const Nav = styled.div`
  display: flex;
  gap: 40px;
`;

export default function Navbar() {
  const pathname = usePathname();

  return (
    <Wrapper>
      <Link href="/">
        {pathname === '/' ? (
          <Logo layoutId="logo">
            2023
            <br />
            Hansung University Graduation Exhibition
            <br />
            Product & Service Design
          </Logo>
        ) : (
          <motion.div layoutId="logo">
            <MainLogo />
          </motion.div>
        )}
      </Link>
      <Nav>
        <NavItem label="About" href="/about" />
        <NavItem label="Works" href="/works" />
        <NavItem label="Designers" href="/designers" />
      </Nav>
    </Wrapper>
  );
}
