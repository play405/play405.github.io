'use client';

import styled from '@emotion/styled';
import {
  MotionProps,
  TapInfo,
  Variants,
  motion,
  useMotionValue,
  useSpring,
} from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const width = 220;
const height = 252;

const Wrapper = styled(motion.div)<{ width: number; height: number }>`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  cursor: grab;

  :active {
    cursor: grabbing;
  }

  img {
    filter: drop-shadow(0px 4px 16px rgba(0, 0, 0, 0.5));
    will-change: transform;
    pointer-events: none;
  }
`;

const variants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.5,
  },
  visible: {
    opacity: 1,
    scale: 1,
  },
  insert: {
    opacity: [1, 0],
    originX: 0.5,
    originY: 0.5,
    x: '100dvw',
    y: `calc((100dvh - 120px - ${height}px) / 2)`,
    transition: {
      duration: 1,
    },
  },
};

interface CartridgeProps extends MotionProps {
  parentPosition: { width: number; height: number; top: number; left: number };
  triggerPosition: { width: number; height: number; top: number; left: number };
  id: number;
  triggered: boolean;
  setTriggered: (id: number) => void;
}

export default function Cartridge({
  parentPosition: {
    width: parentWidth,
    height: parentHeight,
    top: parentTop,
    left: parentLeft,
  },
  triggerPosition,
  id,
  triggered,
  setTriggered,
}: CartridgeProps) {
  const [loaded, setLoaded] = useState(false);

  const originX = useMotionValue(0.5);
  const originY = useMotionValue(0.5);
  const zIndex = useMotionValue(0);

  const x = useMotionValue(-1000);
  const y = useMotionValue(-1000);
  const rotate = useSpring(0, { stiffness: 1000, damping: 100 });

  // Randomize position on mount
  useEffect(() => {
    if (parentWidth && parentHeight) {
      x.set(Math.random() * (parentWidth - width));
      y.set(Math.random() * (parentHeight - height));
      zIndex.set(Math.random() * 100);
      rotate.set(Math.random() * 360, false);
    }
  }, [parentHeight, parentWidth, rotate, x, y, zIndex]);

  const handleTapStart = (_: MouseEvent, { point }: TapInfo) => {
    const pointX = point.x - parentLeft;
    const pointY = point.y - parentTop;

    const vectorA = {
      x: pointX - x.get() - originX.get() * width,
      y: pointY - y.get() - originY.get() * height,
    };

    const vectorB = {
      x:
        vectorA.x * Math.cos(-rotate.get() * (Math.PI / 180)) -
        vectorA.y * Math.sin(-rotate.get() * (Math.PI / 180)),
      y:
        vectorA.x * Math.sin(-rotate.get() * (Math.PI / 180)) +
        vectorA.y * Math.cos(-rotate.get() * (Math.PI / 180)),
    };

    const vectorC = {
      x: vectorA.x - vectorB.x,
      y: vectorA.y - vectorB.y,
    };

    x.set(x.get() + vectorC.x);
    y.set(y.get() + vectorC.y);

    originX.set((pointX - x.get()) / width);
    originY.set((pointY - y.get()) / height);
  };

  const handleDrag = ({ movementX, movementY, x, y }: MouseEvent) => {
    // If triggered, rotate by -90 degrees
    if (
      x >= triggerPosition.left &&
      x <= triggerPosition.left + triggerPosition.width &&
      y >= triggerPosition.top &&
      y <= triggerPosition.top + triggerPosition.height
    ) {
      const laps = Math.round((rotate.get() + 90) / 360);
      rotate.set(-90 + 360 * laps);
    } else {
      const vectorA = {
        x: (0.5 - originX.get()) * width,
        y: (0.5 - originY.get()) * height,
      };

      const mass = 0.5;
      const velocity = Math.sqrt(movementX ** 2 + movementY ** 2) * mass;
      const force =
        ((0.5 - originX.get()) ** 2 + (0.5 - originY.get()) ** 2) * velocity;

      const vectorB = {
        x:
          vectorA.x * Math.cos(rotate.get() * (Math.PI / 180)) -
          vectorA.y * Math.sin(rotate.get() * (Math.PI / 180)),
        y:
          vectorA.x * Math.sin(rotate.get() * (Math.PI / 180)) +
          vectorA.y * Math.cos(rotate.get() * (Math.PI / 180)),
      };

      const vectorC = {
        x: vectorB.x - movementX,
        y: vectorB.y - movementY,
      };

      let angle =
        (Math.atan2(vectorC.y, vectorC.x) - Math.atan2(vectorB.y, vectorB.x)) *
        (180 / Math.PI);

      // Fix delta angle to be between -180 and 180
      if (angle > 180) {
        angle -= 360;
      } else if (angle < -180) {
        angle += 360;
      }

      rotate.set(rotate.get() + angle * force);
    }
  };

  const handleDragEnd = ({ x, y }: MouseEvent) => {
    if (
      x >= triggerPosition.left &&
      x <= triggerPosition.left + triggerPosition.width &&
      y >= triggerPosition.top &&
      y <= triggerPosition.top + triggerPosition.height
    ) {
      setTriggered(id);
    }
  };

  return (
    <Wrapper
      variants={variants}
      width={width}
      height={height}
      drag
      dragConstraints={{
        top: 0,
        left: 0,
        right: parentWidth - width,
        bottom: parentHeight - height,
      }}
      dragElastic={1}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      style={{ originX, originY, x, y, zIndex, rotate }}
      onTapStart={handleTapStart}
      initial="hidden"
      animate={loaded ? 'visible' : 'hidden'}
      exit={triggered ? 'insert' : 'hidden'}
    >
      <Image
        src={`/images/cartridges/${id}.png`}
        width={270}
        height={270}
        alt="cartridge"
        draggable={false}
        onLoad={() => setLoaded(true)}
      />
    </Wrapper>
  );
}
