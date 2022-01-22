import React, { useContext } from 'react';

import CodeRead from './CodeRead.js';
import { Context } from './AppContext';
import { Spring } from 'react-spring/';
import WorkoutsMenu from './WorkoutsMenu.js';
import styled from 'styled-components';

const SlideContainer = styled.div`
   border: 1px solid ${(props) => props.theme.plain.color + '99'};
   position: absolute;
   height: 70%;
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

function Slide({ slide, offsetRadius, index, animationConfig, moveSlide }) {
   const [store, setStore] = useContext(Context);

   const offsetFromMiddle = index - offsetRadius;
   const totalPresentables = 2 * offsetRadius + 1;
   const distanceFactor = 1 - Math.abs(offsetFromMiddle / (offsetRadius + 1));

   const translateYoffset = 50 * (Math.abs(offsetFromMiddle) / (offsetRadius + 1));
   let translateY = store.leftAligned ? -65 : -55;

   if (offsetRadius !== 0) {
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
   // console.log(offsetRadius);
   return (
      <Spring
         to={{
            transform: `translateX(0%) translateY(${translateY}%) scale(${distanceFactor})`,
            top: `${offsetFromMiddle === 0 ? 60 : 60 + (offsetFromMiddle * 40) / offsetRadius}%`,
            opacity: distanceFactor * distanceFactor,
         }}
         config={animationConfig}>
         {(style) => (
            <SlideContainer
               style={{
                  ...style,
                  fontSize: 18,
                  boxSizing: 'border-box',
                  fontFamily: '"Dank Mono", "Fira Code", monospace',
                  zIndex: Math.abs(Math.abs(offsetFromMiddle) - 2),
               }}>
               <SlideCard>
                  {slide.type === 'read' ? (
                     <CodeRead
                        questionData={slide}
                        moveSlide={moveSlide}
                        offsetFromMiddle={offsetFromMiddle}
                        index={index}
                        maker={false}
                     />
                  ) : null}
                  {slide.type === 'end' ? <WorkoutsMenu end={true} /> : null}
               </SlideCard>
            </SlideContainer>
         )}
      </Spring>
   );
}

export default Slide;
