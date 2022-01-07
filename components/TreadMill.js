import React, { useContext, useEffect } from 'react';

import Confetti from 'react-confetti';
import { Context } from './AppContext';
import Slide from './Slide';
import io from 'socket.io-client';
import styled from 'styled-components';

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

function mod(a, b) {
   return ((a % b) + b) % b;
}

const socket = io();

export default function TreadMill({ updateStats }) {
   const [store, setStore] = useContext(Context);
   const defaultProps = {
      offsetRadius: 2,
      animationConfig: { tension: 120, friction: 14 },
   };

   useEffect(() => {
      fetch('/api/socketio').finally(() => {
         socket.on('updateRace', (raceStats) => {
            console.log('client raceStats');
            console.log(raceStats);
            setStore({ ...store, raceStats });
         });

         socket.on('a user connected', () => {
            console.log('a user connected?');
         });
      });
   }, []);

   const { slides } = store;
   const modBySlidesLength = (index) => {
      return mod(index, slides.length);
   };
   //   console.log(slides);
   // const moveSlide = () => {
   //   // store.raceStats.push({
   //   //   user: "Brad" + Math.random(),
   //   //   rpm: store.rpm,
   //   //   avgComplexity: store.avgComplexity,
   //   // });
   //   // socket.emit("newResult", store.raceStats);
   // };

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
         presentableSlides.push(slides[modBySlidesLength(store.currentIndex + i)]);
      }
      return presentableSlides.reverse();
   };

   const { animationConfig, offsetRadius } = defaultProps;

   return (
      <React.Fragment>
         {store.confettiKey ? (
            <div>
               <Confetti
                  key={store.confettiKey}
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
                  key={store.confettiKey + 1}
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
         <Wrapper key={store.workout}>
            {getPresentableSlides().map((slide, presentableIndex) => {
               return (
                  <Slide
                     key={slide.key}
                     slide={slide}
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
