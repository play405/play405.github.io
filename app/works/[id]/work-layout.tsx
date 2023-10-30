'use client';

import GameBoy from '@/components/game-boy';
import InfiniteSlider from '@/components/infinite-slider';
import { designers } from '@/lib/designer';
import { Container, FullScreen, Grid } from '@/lib/style';
import styled from '@emotion/styled';
import Image from 'next/image';
import { useState } from 'react';

const Wrapper = styled.div`
  width: 1420px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: relative;

  @media (max-width: 1420px) {
    width: 100%;
  }

  @media (min-width: 1920px) {
    width: calc(100% - 500px);
  }
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  grid-column: 1/4;
`;

const Sidebar = styled.div`
  position: sticky;
  top: 160px;
  display: flex;
  flex-direction: column;
  gap: 60px;
  color: #dadada;
`;

const Titles = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  line-height: 1;
`;

const Title = styled.div`
  font-size: 2.25rem; // 36px
  font-weight: bold;
`;

const Name = styled.div`
  display: flex;
  flex-wrap: wrap;
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

const Description = styled.div`
  line-height: 1.75;
  font-weight: 500;
  white-space: pre-wrap;
  word-break: keep-all;
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  grid-column: 4/13;
  gap: 85px;
`;

const PostWrapper = styled.div`
  width: 100%;
  color: #dadada;

  img {
    width: 100%;
  }
`;

const Designer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  line-height: 1;
  color: #dadada;
`;

const DesignerInfo = styled.div`
  display: flex;
  gap: 30px;
`;

const DesignerText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px 0;
  color: #d0d0d0;
`;

const DesignerName = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const DesignerDescription = styled.div`
  line-height: 1.6;
  white-space: pre-wrap;
`;

interface WorkProps {
  id: number;
  children: React.ReactNode;
}

export default function WorkLayout({ id, children }: WorkProps) {
  const [loading, setLoading] = useState(false);
  const designer = designers[id];

  console.log(loading);

  return (
    <Container>
      <FullScreen
        animate={{ opacity: loading ? 1 : 0 }}
        transition={{ delay: 1 }}
      >
        <Wrapper>
          <InfiniteSlider color={designer.cartridge.color} />
          <GameBoy
            initial={{ opacity: 0, rotate: 90, x: 250 }}
            animate={{ opacity: 1 }}
            exit={{ x: 750 }}
          />
        </Wrapper>
      </FullScreen>
      <Grid>
        <Left>
          <Sidebar>
            <Titles>
              <Title>{designer.cartridge.title}</Title>
              <Name>
                <Korean>{designer.name}</Korean>
                <English>{designer.engName}</English>
              </Name>
            </Titles>
            <Description>{designer.cartridge.description}</Description>
          </Sidebar>
        </Left>
        <Right>
          <PostWrapper>{children}</PostWrapper>

          <Designer>
            <Title>Designer</Title>
            <DesignerInfo>
              <Image
                src="/images/profile.jpg"
                width={220}
                height={280}
                alt="profile"
              />
              <DesignerText>
                <DesignerName>
                  <Korean>{designer.name}</Korean>
                  <English>{designer.engName}</English>
                </DesignerName>
                <DesignerDescription>
                  {designer.description}
                </DesignerDescription>
              </DesignerText>
            </DesignerInfo>
          </Designer>
        </Right>
      </Grid>
    </Container>
  );
}
