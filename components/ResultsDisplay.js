import React, { useContext } from 'react';

import { Context } from './AppContext';
import DigitalReadOut from './DigitalReadOut.js';
import styled from 'styled-components';

const DisplayContainer = styled.div`
   width: 380px;
   height: 100px;
   border: 1px solid #666;
   border-radius: 10px;
   color: ${(props) => props.theme.styles[5].style.color};
   background-color: ${(props) => props.theme.plain.backgroundColor};
   padding-top: 32px;
   box-shadow: inset 0px 0px 2px 0px white;
   margin: 10px;
   @media (max-width: 768px) {
      transform: scale(0.54) translateY(38px);
   }
`;

const Readouts = styled.div`
   margin-top: -8px;
   display: flex;
   justify-content: center;
`;

const Label = styled.span`
   position: absolute;
   text-align: center;
   font-family: 'Orbitron', sans-serif;
   background: ${(props) => props.theme.plain.backgroundColor};
   color: ${(props) => props.theme.plain.color};
   z-index: 2000;
   font-size: 25px;
   transform: translateY(${(props) => props.bump}px) translateX(8px);
`;

const Line = styled.hr`
   width: 377px;
   z-index: 0;
   transform: translateY(${(props) => props.bump}px);
   height: 3px;
   border: 0;
   background-color: ${(props) => props.theme.plain.color}; ;
`;

export default function ResultsDisplay() {
   const [store, setStore] = useContext(Context);
   return (
      <DisplayContainer>
         <Label bump={-30}>Stats</Label>
         <Line bump={'-26'} />
         <Readouts>
            <DigitalReadOut value={store.rpm} label={'rpm'} measure={'confetti/min'} />
            <DigitalReadOut value={store.avgComplexity} label={'complexity'} measure={'average'} />
            <DigitalReadOut
               value={Math.round(store.rpm * store.avgComplexity)}
               label={'score'}
               measure={'rpm * complex'}
            />
         </Readouts>
      </DisplayContainer>
   );
}
