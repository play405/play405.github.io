'use client';

import styled from '@emotion/styled';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Wrapper = styled(Link)<{ selected: boolean }>`
  font-weight: bold;
  line-height: 1;
  color: ${({ selected }) => (selected ? '#ffffff' : '#a5aabc')};
  padding: 16px;
  font-size: 1.25rem; // 20px

  :hover {
    color: #ffffff;
    box-shadow: inset 0px 0px 0px 2px #ffffff;
  }
`;

interface NavItemProps {
  label: string;
  href: string;
}

export default function NavItem({ label, href }: NavItemProps) {
  const pathname = usePathname();

  return (
    <Wrapper href={href} selected={pathname === href}>
      {label}
    </Wrapper>
  );
}
