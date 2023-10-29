'use client';

import styled from '@emotion/styled';

const Container = styled.div`
  width: 100%;
  /* min-height: 100dvh; */
  /* position: relative; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 96px;

  color: #ffffff;
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 340px;
  height: 1000px;
  overflow: visible;
  background-color: #333333;
`;

const Sticky = styled.div`
  position: sticky;
  top: 100px;
  display: flex;
  flex-direction: column;
  width: 340px;
  gap: 60px;
  color: #dadada;

  background-color: #999999;
`;

export default function About() {
  return (
    <Container>
      <Wrapper>
        <Sticky>asdf</Sticky>
      </Wrapper>
    </Container>
  );
}
