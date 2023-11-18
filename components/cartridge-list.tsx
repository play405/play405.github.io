'use client';

import { designers } from '@/lib/designer';
import useIsMobile from '@/lib/useIsMobile';
import styled from '@emotion/styled';
import { Variants, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const Wrapper = styled(motion.div)`
  display: flex;
  gap: 40px;

  @media (max-width: 768px) {
    gap: 24px;
  }
`;

const Cartridge = styled(motion.div)`
  width: 183px;
  height: 210px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    width: 131px;
    height: 149px;
  }
`;

const Text = styled.div`
  line-height: 1;
  display: flex;
  flex-direction: column;
  gap: 32px;

  padding-top: 16px;
`;

const Name = styled.div`
  font-size: 1.25rem; // 20px
  display: flex;
  flex-direction: column;
  color: #ffffff;
  gap: 10px;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const Korean = styled.div`
  font-weight: bold;
`;

const English = styled.div`
  font-weight: 500;
`;

const Category = styled.div`
  font-weight: bold;
  color: #a5aabc;
`;

interface CartridgeListProps {
  id: number;
  setHovered: (id: number) => void;
}

const variants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export default function CartridgeList({ id, setHovered }: CartridgeListProps) {
  const isMobile = useIsMobile();
  const designer = designers[id - 1];

  return (
    <Link
      href={`/works/${id}`}
      onMouseEnter={() => setHovered(id)}
      onMouseLeave={() => setHovered(0)}
    >
      <Wrapper variants={variants}>
        <Cartridge>
          <Image
            src={`/images/cartridges/${id}.png`}
            width={isMobile ? 160 : 225}
            height={isMobile ? 160 : 225}
            alt="Cartridge"
            draggable={false}
            priority
          />
        </Cartridge>
        <Text>
          <Name>
            <Korean>{designer.name}</Korean>
            <English>{designer.engName}</English>
          </Name>
          <Category>{designer.cartridge.category}</Category>
        </Text>
      </Wrapper>
    </Link>
  );
}
