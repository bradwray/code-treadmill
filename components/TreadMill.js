import React, { Component, useContext } from 'react';

import Confetti from 'react-confetti';
import { Context } from './AppContext';
import Slide from './Slide';
import { slides } from '../codeUtils/jsCodeContent.js';
import styled from 'styled-components';

const Wrapper = styled.div`
   position: relative;
   display: flex;
   justify-content: center;
   width: 100%;
   height: 100%;
`;

function mod(a, b) {
   return ((a % b) + b) % b;
}

export default function TreadMill({ updateStats }) {
   const [confettiKey, setConfettiKey] = React.useState(null);
   const [currIndex, setCurrIndex] = React.useState(0);
   const defaultProps = {
      offsetRadius: 2,
      animationConfig: { tension: 120, friction: 14 },
   };

   const modBySlidesLength = (index) => {
      return mod(index, slides.length);
   };
   //   console.log(slides);
   const moveSlide = () => {
      setConfettiKey(Date.now());
      setCurrIndex(modBySlidesLength(currIndex + 1));
   };

   const clampOffsetRadius = (offsetRadius) => {
      const upperBound = Math.floor((slides.length - 1) / 2);

      if (offsetRadius < 0) {
         return 0;
      }
      if (offsetRadius > upperBound) {
         return upperBound;
      }
      return offsetRadius;
   };

   const getPresentableSlides = () => {
      let { offsetRadius } = defaultProps;
      offsetRadius = clampOffsetRadius(offsetRadius);
      const presentableSlides = new Array();
      // let sliders = codes ? codes : slides;
      for (let i = -offsetRadius; i < 1 + offsetRadius; i++) {
         presentableSlides.push(slides[modBySlidesLength(currIndex + i)]);
      }

      return presentableSlides.reverse();
   };

   const { animationConfig, offsetRadius } = defaultProps;

   return (
      <React.Fragment>
         {confettiKey ? (
            <div>
               <Confetti
                  key={confettiKey}
                  confettiSource={{
                     x: window.innerWidth / 2,
                     y: window.innerHeight / 2,
                     w: 200,
                     h: 100,
                  }}
                  height={window.innerHeight}
                  tweenDuration={1000}
                  gravity={2}
                  initialVelocityY={70}
                  initialVelocityX={50}
                  numberOfPieces={500}
                  recycle={false}
               />
               <Confetti
                  key={confettiKey + 1}
                  confettiSource={{
                     x: window.innerWidth / 2 - 200,
                     y: window.innerHeight / 2,
                     w: 200,
                     h: 0,
                  }}
                  tweenDuration={1000}
                  initialVelocityY={70}
                  initialVelocityX={-50}
                  gravity={2}
                  height={window.innerHeight}
                  numberOfPieces={500}
                  recycle={false}
               />
            </div>
         ) : (
            <div />
         )}
         <Wrapper>
            {getPresentableSlides().map((slide, presentableIndex) => {
               return (
                  <Slide
                     key={slide.key}
                     solveFor={slide.solveFor}
                     content={slide.content}
                     difficulty={slide.difficulty}
                     tagsUsed={slide.tagsUsed}
                     slide={slide}
                     moveSlide={moveSlide}
                     offsetRadius={clampOffsetRadius(offsetRadius)}
                     index={presentableIndex}
                     animationConfig={animationConfig}
                  />
               );
            })}
         </Wrapper>
      </React.Fragment>
   );
}
