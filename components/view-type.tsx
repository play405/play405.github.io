import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const Wrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.25rem; // 20px
  font-weight: bold;
  line-height: 1;
  gap: 8px;
  padding: 20px 16px 16px 16px;
  border-radius: 8px;
  background-color: #141414;
  pointer-events: all;
  user-select: none;
  color: #ffffff;
  grid-column: 1/3;
  position: fixed;
  bottom: 40px;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.div<{ selected: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  color: ${({ selected }) => (selected ? '#ffffff' : '#24252c')};
  cursor: pointer;
`;

interface ViewTypeProps {
  isList: boolean;
  setIsList: (isList: boolean) => void;
}

export default function ViewType({ isList, setIsList }: ViewTypeProps) {
  return (
    <Wrapper>
      view type
      <Buttons>
        <Button selected={!isList} onClick={() => setIsList(false)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="24"
            viewBox="0 0 40 24"
            fill="currentColor"
          >
            <path d="M14.7816 0H3.21839C1.44092 0 0 1.36508 0 3.049V20.951C0 22.6349 1.44092 24 3.21839 24H14.7816C16.5591 24 18 22.6349 18 20.951V3.049C18 1.36508 16.5591 0 14.7816 0Z" />
            <path d="M36.7816 0H25.2184C23.4409 0 22 1.36508 22 3.049V20.951C22 22.6349 23.4409 24 25.2184 24H36.7816C38.5591 24 40 22.6349 40 20.951V3.049C40 1.36508 38.5591 0 36.7816 0Z" />
          </svg>
        </Button>
        <Button selected={isList} onClick={() => setIsList(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="24"
            viewBox="0 0 40 24"
            fill="currentColor"
          >
            <path d="M8.01968 14H1.98032C0.886619 14 0 14.8866 0 15.9803V22.0197C0 23.1134 0.886619 24 1.98032 24H8.01968C9.11338 24 10 23.1134 10 22.0197V15.9803C10 14.8866 9.11338 14 8.01968 14Z" />
            <path d="M8.01968 0H1.98032C0.886619 0 0 0.886619 0 1.98032V8.01968C0 9.11338 0.886619 10 1.98032 10H8.01968C9.11338 10 10 9.11338 10 8.01968V1.98032C10 0.886619 9.11338 0 8.01968 0Z" />
            <path d="M36.8224 1H15.1776C13.9749 1 13 1.90909 13 3.03051V6.96949C13 8.09091 13.9749 9 15.1776 9H36.8224C38.0251 9 39 8.09091 39 6.96949V3.03051C39 1.90909 38.0251 1 36.8224 1Z" />
            <path d="M36.8224 15H15.1776C13.9749 15 13 15.9091 13 17.0305V20.9695C13 22.0909 13.9749 23 15.1776 23H36.8224C38.0251 23 39 22.0909 39 20.9695V17.0305C39 15.9091 38.0251 15 36.8224 15Z" />
          </svg>
        </Button>
      </Buttons>
    </Wrapper>
  );
}
