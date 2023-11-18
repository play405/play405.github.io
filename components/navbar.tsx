'use client';

import IconMenu from '@/assets/icon-menu.svg';
import IconX from '@/assets/icon-x.svg';
import MainLogo from '@/assets/main-logo.svg';
import useIsMobile from '@/lib/useIsMobile';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import NavItem from './nav-item';

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

  @media (max-width: 768px) {
    height: 80px;
    padding: 24px;
  }
`;

const Logo = styled(motion.div)`
  font-weight: 500;
  line-height: 1.375;
  color: #a5aabc;

  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
`;

const Nav = styled.div`
  display: flex;
  gap: 40px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Icon = styled(IconMenu)`
  display: none;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

const Menu = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  background-color: #161616;
  color: #ffffff;
  padding: 24px;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
  gap: 40px;
`;

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isMobile = useIsMobile();
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
            <MainLogo height={isMobile ? 32 : 52} />
          </motion.div>
        )}
      </Link>
      <Nav>
        <NavItem label="About" href="/about" />
        <NavItem label="Works" href="/works" />
        <NavItem label="Designers" href="/designers" />
      </Nav>
      <Icon onClick={() => setIsMenuOpen(!isMenuOpen)} />
      <Menu
        initial={{ opacity: 0 }}
        animate={{
          opacity: isMenuOpen ? 1 : 0,
          pointerEvents: isMenuOpen ? 'auto' : 'none',
        }}
      >
        <IconX
          style={{ cursor: 'pointer' }}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        />
        <NavItem label="About" href="/about" />
        <NavItem label="Works" href="/works" />
        <NavItem label="Designers" href="/designers" />
      </Menu>
    </Wrapper>
  );
}
