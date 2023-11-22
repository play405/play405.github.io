'use client';

import Restart from '@/assets/restart.svg';
import SquareLogo from '@/assets/square-logo.svg';
import InfiniteSlider from '@/components/infinite-slider';
import { Container } from '@/lib/style';
import useIsMobile from '@/lib/useIsMobile';
import styled from '@emotion/styled';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 64px;
  color: #d0d0d0;
  line-height: 1.75;

  @media (max-width: 768px) {
    gap: 32px;
  }
`;

const Heading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.75rem; // 28px

  @media (max-width: 768px) {
    font-size: 1rem; // 16px
  }
`;

const Paragraph = styled.div`
  font-size: 1.25rem; // 20px
  color: #a5aabc;
  max-width: 600px;
  text-align: center;
  white-space: pre-line;

  @media (max-width: 768px) {
    font-size: 0.875rem; // 14px
  }
`;

const Row = styled.div`
  display: flex;
  gap: 48px;

  @media (max-width: 768px) {
    gap: 16px;
  }
`;

const Filters = styled.div`
  display: flex;
  gap: 16px;

  @media (max-width: 768px) {
    gap: 12px;
  }
`;

const Filter = styled.div`
  display: flex;
  padding: 14px 22px;
  border-radius: 1024px;
  background-color: #333333;
  color: #ffffff;
  border: 1px solid #ffffff;
  font-size: 1.25rem; // 20px
  line-height: 1;

  @media (max-width: 768px) {
    padding: 8px 16px;
    font-size: 1rem // 16px
;
  }
`;

const Row2 = styled(Row)`
  @media (max-width: 768px) {
    flex-direction: column-reverse;
    align-items: center;
    gap: 32px;
  }
`;

const Paragraph2 = styled(Paragraph)`
  /* width: 433px; */
  flex: 1;
  text-align: left;
`;

const RestartButton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  cursor: pointer;

  font-size: 1.75rem; // 28px
  line-height: 1;
  color: #ffffff;
`;

export default function About() {
  const isMobile = useIsMobile();
  const router = useRouter();

  useEffect(() => {
    const audio = new Audio(
      'https://vgmsite.com/soundtracks/pokemon-gold-gb/gbnlbzpr/05_New%20Bark%20Town%27s%20Theme.mp3'
    );
    audio.volume = 0.2;
    audio.loop = true;

    audio.play();

    return () => {
      audio.pause();
    };
  }, []);

  return (
    <Container
      style={{
        gap: isMobile ? 160 : 240,
        padding: isMobile ? '80px 24px' : '160px 40px',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <SquareLogo height={isMobile ? 153 : 266} />
      <Wrapper>
        <Heading>
          <strong>“틀에서 벗어나 각자의 방향성으로 나아가다.”</strong>
        </Heading>
        <Paragraph>
          {isMobile
            ? `<Play 405!>는 창의성과 다양성으로 가득찬
아이디어를 탐색하는 장으로써,
한성대학교 제품서비스디자인 전공
12명의 작품을 선보입니다.`
            : `<Play 405!>는 창의성과 다양성으로 가득찬 아이디어를 탐색하는 장으로써,
한성대학교 제품서비스디자인 전공 12명의 작품을 선보입니다.`}
        </Paragraph>
      </Wrapper>
      <Wrapper>
        <Row>
          <Image
            src="/images/about/1.png"
            width={isMobile ? 123 : 370}
            height={isMobile ? 123 : 370}
            alt="1"
          />
          <Image
            src="/images/about/2.png"
            width={isMobile ? 123 : 370}
            height={isMobile ? 123 : 370}
            alt="2"
          />
        </Row>
        <Paragraph>
          {`더 높은 곳을 향해 발돋움 하기 위한 공간,
우리의 과방 ‘405호’를 기반으로 시작된 본 전시는
4년간 성장하고 만들어온 각자의 디자인을
다양한 분야를 통해 소개합니다.`}
        </Paragraph>
      </Wrapper>
      <Wrapper>
        <Filters>
          <Filter>PRODUCT</Filter>
          <Filter>UX·UI</Filter>
          <Filter>SERVICE</Filter>
          <Filter>MOTION</Filter>
        </Filters>
        <Paragraph>
          {isMobile
            ? `우리는 한가지 전공에 종속되어서
정석적인 과정을 밟아가는 것이 아니라,
틀에서 벗어나 각자의 방향성을
스스로 결정하고 나아가고자 합니다.`
            : `우리는 한가지 전공에 종속되어서 정석적인 과정을 밟아가는 것이 아니라,
틀에서 벗어나 각자의 방향성을 스스로 결정하고 나아가고자 합니다.`}
        </Paragraph>
      </Wrapper>
      <Wrapper>
        <Image
          src="/images/about/3.png"
          width={isMobile ? 224 : 538}
          height={isMobile ? 145 : 348}
          alt="3"
        />
        <Paragraph>
          {isMobile
            ? `그 첫걸음으로 다채로운 12개의 디자인을
각각의 ‘게임칩’에 담아
'Play'라는 이름과 함께 보여드리고자 합니다.`
            : `그 첫걸음으로 다채로운 12개의 디자인을 각각의 ‘게임칩’에 담아
'Play'라는 이름과 함께 보여드리고자 합니다.`}

          {`

다양한 스토리를 자유롭게 꺼내 즐길 수 있는 게임칩처럼
각각의 색이 뚜렷한 모든 작품들이 뜻깊게 전달되기를 바라며,
우리의 시작이 세상에 힘차게 ‘Play’될 수 있기를 기대합니다.`}
        </Paragraph>
      </Wrapper>
      <Wrapper>
        <Heading>
          HANSUNG UNIV.
          <strong>제품·서비스디자인 소개</strong>
        </Heading>
        <Row2>
          <Paragraph2>
            {`인간의 생활에 필요한 다양한 제품을 디자인하고, 보이지 않는 소비자의 경험적 가치와 비즈니스 가치를 디자인하는 서비스디자인 분야가 통합된 제품·서비스디자인은 21세기형 융합 디자인의 시작입니다.

수많은 기능과 가치의 조합체인 제품과, 그 기능과 가치를 혁신하여 소비자에게 새롭고 매력적인 경험을 제공하는 서비스디자인은 함께 사회를 이루고 있습니다.

한성대학교 제품 서비스디자인 전공은 그 가치를 알고 더 나아가 사용자경험을 바탕으로 한 4차 산업혁명 시대의 혁신적인 디자인을 선도하고 있습니다. 오늘날, 디자인 분야 간의 경계는 점차 사라지고 새로운 콘텐츠가 넘쳐나는 세상에서 사용자 경험을 다양한 분야에 녹여내는 것은 디자이너로서의 중요한 역량입니다.

2023 한성대학교 제품서비스디자인 졸업전시회는 이를 바탕으로 사회의 다양성을 알고, 현대사회의 다양성과 융합을 상징하며, 분야를 아우르는 디자인 작품을 12명의 예비 디자이너와 함께합니다.`}
          </Paragraph2>
          <Image
            src="/images/about/4.png"
            width={isMobile ? 320 : 458}
            height={isMobile ? 495 : 708}
            alt="4"
          />
        </Row2>
      </Wrapper>
      <RestartButton onClick={() => router.push('/')}>
        <Restart />
        restart
      </RestartButton>
      <Wrapper>
        <InfiniteSlider color="#ffffff" />
      </Wrapper>
    </Container>
  );
}
