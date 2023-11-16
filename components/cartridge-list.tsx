'use client';

import { designers } from '@/lib/designer';
import styled from '@emotion/styled';
import { Variants, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const Wrapper = styled(motion.div)`
  display: flex;
  gap: 40px;
`;

const Cartridge = styled(motion.div)`
  width: 183px;
  height: 210px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
            width={225}
            height={225}
            alt="Cartridge"
            draggable={false}
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
