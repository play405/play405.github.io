'use client';

import { designers } from '@/lib/designer';
import { Container } from '@/lib/style';
import styled from '@emotion/styled';
import Image from 'next/image';
import Link from 'next/link';

const Title = styled.div`
  font-size: 2.25rem; // 36px
  font-weight: bold;
  line-height: 1;
  color: #dadada;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 60px;
`;

const Designer = styled(Link)`
  display: flex;
  flex-direction: column;
  gap: 30px;
  line-height: 1;

  img {
    object-fit: cover;
  }
`;

const Name = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  font-size: 1.25rem; // 20px
  color: #d0d0d0;
`;

const Korean = styled.div`
  font-weight: bold;
`;

const English = styled.div`
  font-weight: 500;
`;

export default function Designers() {
  return (
    <Container initial={{ gap: 80 }}>
      <Title>Designers</Title>
      <Grid>
        {designers.map(designer => (
          <Designer key={designer.id} href={`/works/${designer.id}`}>
            <Image
              src={`/images/profiles/${designer.id}.jpeg`}
              width={200}
              height={246}
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
