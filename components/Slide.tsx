import React, { useContext } from 'react';
import styled from 'styled-components';
import { animated, useSpring, SpringConfig } from '@react-spring/web';

import CodeRead from './CodeRead';
import { Context } from './AppContext';
import WorkoutsMenu from './WorkoutsMenu';

import type { WorkoutSlide, WorkoutSlideRead } from '../types';

const SlideContainer = styled.div`
   border: 1px solid ${(props) => props.theme.plain.color + '99'};
   position: absolute;
   min-height: 65%;
   padding-top: 30px;
   width: 90%;
   color: ${(props) => props.theme.styles[5].style.color};
   background: ${(props) => props.theme.plain.backgroundColor};
   max-width: 800px;
   display: flex;
   align-items: center;
   justify-content: center;
`;

const SlideCard = styled.div`
   position: relative;
   max-width: 1400px;
   width: 90%;
   height: 100%;
   font-size: 35px;
   display: flex;
   flex-direction: column;
   align-items: right;
   justify-content: center;
`;

interface SlideProps {
  slide: WorkoutSlide;
  offsetRadius: number;
  index: number;
  animationConfig: SpringConfig;
}

const AnimatedSlideContainer = animated(SlideContainer);

function Slide({
  slide,
  offsetRadius,
  index,
  animationConfig,
}: SlideProps): React.ReactElement {
  const [store] = useContext(Context);

  const safeOffsetRadius = offsetRadius === 0 ? 1 : offsetRadius;
  const offsetFromMiddle = index - safeOffsetRadius;
  const totalPresentables = 2 * safeOffsetRadius + 1;
  const distanceFactor = 1 - Math.abs(offsetFromMiddle / (safeOffsetRadius + 1));

  const translateYoffset = 50 * (Math.abs(offsetFromMiddle) / (safeOffsetRadius + 1));
  let translateY = store.leftAligned ? -65 : -55;

  if (safeOffsetRadius !== 0) {
    if (index === 0) {
      translateY = 0;
    } else if (index === totalPresentables - 1) {
      translateY = -100;
    }
  }

  if (offsetFromMiddle > 0) {
    translateY += translateYoffset;
  } else if (offsetFromMiddle < 0) {
    translateY -= translateYoffset;
  }

  const springStyles = useSpring({
    to: {
      transform: `translateX(0%) translateY(${translateY}%) scale(${distanceFactor})`,
      top: `${offsetFromMiddle === 0 ? 60 : 60 + (offsetFromMiddle * 40) / safeOffsetRadius}%`,
      opacity: distanceFactor * distanceFactor,
    },
    config: animationConfig,
  });

  return (
    <AnimatedSlideContainer
      style={{
        ...springStyles,
        fontSize: 18,
        boxSizing: 'border-box',
        fontFamily: '"Dank Mono", "Fira Code", monospace',
        zIndex: Math.abs(Math.abs(offsetFromMiddle) - 2),
      }}
    >
      <SlideCard>
        {slide.type === 'read' ? (
          <CodeRead
            key={index}
            questionData={slide as WorkoutSlideRead}
            offsetFromMiddle={offsetFromMiddle}
            index={index}
            maker={false}
          />
        ) : null}
        {slide.type === 'end' ? <WorkoutsMenu end /> : null}
      </SlideCard>
    </AnimatedSlideContainer>
  );
}

export default Slide;
