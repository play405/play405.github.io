'use client';

import { designers } from '@/lib/designer';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const Wrapper = styled(Link)`
  display: flex;
  width: 460px;
  gap: 40px;
  pointer-events: fill;
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
}

export default function CartridgeList({ id }: CartridgeListProps) {
  const designer = designers[id - 1];

  return (
    <Wrapper href={`/works/${id}`}>
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
  );
}
