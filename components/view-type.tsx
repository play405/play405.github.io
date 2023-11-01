import styled from '@emotion/styled';
import { MotionProps, motion } from 'framer-motion';

import IconViewtype1 from '@/assets/icon-viewtype-1.svg';
import IconViewtype2 from '@/assets/icon-viewtype-2.svg';

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
  user-select: none;
  color: #ffffff;
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
  color: ${({ selected }) => (selected ? '#ffffff' : '#24252c')};
  cursor: pointer;
`;

interface ViewTypeProps extends MotionProps {
  isList: boolean;
  setIsList: (isList: boolean) => void;
}

export default function ViewType({ isList, setIsList }: ViewTypeProps) {
  return (
    <Wrapper exit={{ opacity: 0 }}>
      view type
      <Buttons>
        <Button selected={!isList} onClick={() => setIsList(false)}>
          <IconViewtype1 />
        </Button>
        <Button selected={isList} onClick={() => setIsList(true)}>
          <IconViewtype2 />
        </Button>
      </Buttons>
    </Wrapper>
  );
}
