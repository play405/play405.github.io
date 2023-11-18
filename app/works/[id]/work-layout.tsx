'use client';

import GameBoy from '@/components/game-boy';
import InfiniteSlider from '@/components/infinite-slider';
import { designers } from '@/lib/designer';
import { Container, FullScreen, Grid, Wrapper } from '@/lib/style';
import useIsMobile from '@/lib/useIsMobile';
import styled from '@emotion/styled';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

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

  @media (max-width: 920px) {
    font-size: 2rem;
  }
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

  @media (max-width: 920px) {
    gap: 48px;
  }
`;

const PostWrapper = styled.div`
  width: 100%;
  color: #dadada;

  img {
    width: 100%;
  }

  @media (max-width: 920px) {
    width: 100vw;
    margin: -40px;
    padding: 40px 0;
  }

  @media (max-width: 768px) {
    margin: -24px;
    padding: 24px 0;
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

  img {
    object-fit: cover;
  }

  @media (max-width: 768px) {
    gap: 20px;
  }
`;

const DesignerText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px 0;
  color: #d0d0d0;

  @media (max-width: 768px) {
    padding: 12px 0;
  }
`;

const DesignerName = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;

  @media (max-width: 768px) {
    gap: 12px;
  }
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
  const isMobile = useIsMobile();
  const postWrapperRef = useRef<HTMLDivElement>(null);
  const images = postWrapperRef.current?.querySelectorAll('img').length;
  const designer = designers[id];
  const [loading, setLoading] = useState(true);
  const [counter, setCounter] = useState(0);

  // Loading
  useEffect(() => {
    if (images && counter === images) {
      setLoading(false);
    }
  }, [counter, images]);

  return (
    <Container>
      <FullScreen
        exceptnavbar
        initial={{ backgroundColor: '#161616' }}
        animate={{ opacity: loading ? 1 : 0 }}
        transition={{ delay: 1 }}
      >
        <Wrapper>
          <InfiniteSlider color={designer.cartridge.color} />
          <GameBoy
            initial={{ opacity: 0, rotate: 90, x: 128 }}
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
          <PostWrapper
            ref={postWrapperRef}
            onLoad={() => {
              setCounter(prev => prev + 1);
            }}
          >
            {children}
          </PostWrapper>

          <Designer>
            <Title>Designer</Title>
            <DesignerInfo>
              <Image
                src={`/images/profiles/${designer.id}.jpeg`}
                width={isMobile ? 126 : 220}
                height={isMobile ? 160 : 280}
                alt={designer.name}
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
