import React, { useContext } from 'react';
import styled from 'styled-components';
import Confetti from 'react-confetti';

import { Context } from './AppContext';
import Slide from './Slide';

import type { WorkoutSlide } from '../types';

const Wrapper = styled.div`
   position: relative;
   display: flex;
   justify-content: center;
   width: 100%;
   height: 100%;
   @media (max-width: 768px) {
      width: 100vw;
   }
`;

const mod = (a: number, b: number): number => ((a % b) + b) % b;

const DEFAULT_PROPS = {
  offsetRadius: 2,
  animationConfig: { tension: 120, friction: 14 },
};

const TreadMill = (): React.ReactElement => {
  const [store] = useContext(Context);
  const { slides } = store;

  const modBySlidesLength = (index: number) => {
    if (!slides.length) {
      return 0;
    }
    return mod(index, slides.length);
  };

  const clampOffsetRadius = (offsetRadius: number) => {
    if (!slides.length) {
      return 0;
    }
    const upperBound = Math.floor((slides.length - 1) / 2);

    if (offsetRadius < 0) {
      return 0;
    }
    if (offsetRadius > upperBound) {
      return upperBound;
    }
    return offsetRadius;
  };

  const getPresentableSlides = (): WorkoutSlide[] => {
    if (!slides.length) {
      return [];
    }
    let { offsetRadius } = DEFAULT_PROPS;
    offsetRadius = clampOffsetRadius(offsetRadius);
    const presentableSlides: WorkoutSlide[] = [];
    for (let i = -offsetRadius; i < 1 + offsetRadius; i++) {
      presentableSlides.push(slides[modBySlidesLength(store.currentIndex + i)]);
    }
    return presentableSlides.reverse();
  };

  const { animationConfig, offsetRadius } = DEFAULT_PROPS;
  const presentableSlides = getPresentableSlides();

  const renderConfetti = store.confettiKey && typeof window !== 'undefined';

  return (
    <React.Fragment>
      {renderConfetti ? (
        <div>
          <Confetti
            key={store.confettiKey}
            confettiSource={{
              x: window.innerWidth * 0.4,
              y: window.innerHeight / 2,
              w: 200,
              h: 100,
            }}
            height={window.innerHeight}
            tweenDuration={1000}
            gravity={2}
            initialVelocityY={70}
            initialVelocityX={50}
            numberOfPieces={1000}
            recycle={false}
          />
          <Confetti
            key={`${store.confettiKey}-mirror`}
            confettiSource={{
              x: window.innerWidth * 0.7,
              y: window.innerHeight / 2,
              w: 200,
              h: 0,
            }}
            tweenDuration={1000}
            initialVelocityY={70}
            initialVelocityX={-50}
            gravity={2}
            height={window.innerHeight}
            numberOfPieces={1000}
            recycle={false}
          />
        </div>
      ) : (
        <div />
      )}
      {presentableSlides.length ? (
        <Wrapper key={store.workout}>
          {presentableSlides.map((slide, presentableIndex) => (
            <Slide
              key={
                slide.type === 'read' && typeof slide.key !== 'undefined'
                  ? `${slide.key}`
                  : `${presentableIndex}-${slide.type}`
              }
              slide={slide}
              offsetRadius={clampOffsetRadius(offsetRadius)}
              index={presentableIndex}
              animationConfig={animationConfig}
            />
          ))}
        </Wrapper>
      ) : null}
    </React.Fragment>
  );
}

export default TreadMill;
