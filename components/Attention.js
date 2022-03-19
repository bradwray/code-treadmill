import React, { useContext } from 'react';
import styled, { keyframes } from 'styled-components';

const Point = styled.div`
   display: inline-block;
   width: 0;
   height: 0;
   transform: translateY(5px);
   border-top: 10px solid transparent;
   border-bottom: 10px solid transparent;
   border-right: 10px solid ${(props) => props.theme.plain.color};
   @media (max-width: 768px) {
      transform: scale(0.5) translateY(-85px) translateX(320px);
   }
`;

const Tail = styled.div`
   display: inline-block;
   background-color: ${(props) => props.theme.plain.color};
   width: 30px;
   height: 10px;
   @media (max-width: 768px) {
      transform: scale(0.5) translateY(-95px) translateX(298px);
   }
`;

const MessageBox = styled.div`
   display: inline-block;
   color: ${(props) => props.theme.plain.backgroundColor};
   background-color: ${(props) => props.theme.plain.color};
   text-align: center;
   transform: translateY(10px);
   padding: 2px;
   font-size: 16px;
   font-family: 'Dank Mono', 'Fira Code', monospace;
   width: 110px;
   @media (max-width: 768px) {
      transform: scale(0.7) translateY(-54px) translateX(180px);
   }
`;

const bounce = keyframes`
   0% {
      transform: translateX(0px);
   }
   50% {
      transform: translateX(15px);
   }
   100% {
      transform: translateX(0px);
   }
`;

const Wrapper = styled.div`
   display: inline-block;
   ${(props) => {
      console.log(props.xOffset);
      return props.xOffset
         ? `position: absolute; 
         left: ${props.xOffset}px;`
         : null;
   }}
   margin-left: 0px;
   animation-name: ${bounce};
   animation-duration: 1s;
   animation-iteration-count: infinite;
   animation-timing-function: ease-in-out;
`;

const TailFlip = styled.div`
   transform: rotate(180deg) translateY(23px) translateX(-39px);
`;

const Attention = ({ message, double, xOffset }) => {
   return (
      <Wrapper xOffset={xOffset}>
         <Point />
         <Tail />
         <MessageBox>{message}</MessageBox>
         {double ? (
            <TailFlip>
               <Point />
               <Tail />
            </TailFlip>
         ) : null}
      </Wrapper>
   );
};

export default Attention;
