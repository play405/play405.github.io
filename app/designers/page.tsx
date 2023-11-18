'use client';

import { designers } from '@/lib/designer';
import { Container } from '@/lib/style';
import useIsMobile from '@/lib/useIsMobile';
import styled from '@emotion/styled';
import Image from 'next/image';
import Link from 'next/link';

const Title = styled.div`
  font-size: 2.25rem; // 36px
  font-weight: bold;
  line-height: 1;
  color: #dadada;

  @media (max-width: 768px) {
    font-size: 1.5rem; // 24px
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 60px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }
`;

const Designer = styled(Link)`
  display: flex;
  flex-direction: column;
  gap: 30px;
  line-height: 1;

  img {
    object-fit: cover;
  }

  @media (max-width: 768px) {
    gap: 20px;
  }
`;

const Name = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  font-size: 1.25rem; // 20px
  color: #d0d0d0;

  @media (max-width: 768px) {
    gap: 10px;
    font-size: 1rem;
  }
`;

const Korean = styled.div`
  font-weight: bold;
`;

const English = styled.div`
  font-weight: 500;
`;

export default function Designers() {
  const isMobile = useIsMobile();

  return (
    <Container
      style={{ gap: isMobile ? 60 : 80 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Title>Designers</Title>
      <Grid>
        {designers.map(designer => (
          <Designer key={designer.id} href={`/works/${designer.id}`}>
            <Image
              src={`/images/profiles/${designer.id}.jpeg`}
              width={isMobile ? 142 : 200}
              height={isMobile ? 174 : 246}
              alt={designer.name}
              priority
            />
            <Name>
              <Korean>{designer.name}</Korean>
              <English>{designer.engName}</English>
            </Name>
          </Designer>
        ))}
      </Grid>
    </Container>
  );
}
