import React, { useContext, useEffect, useState } from 'react';

import Button from './Button';
import { Context } from './AppContext';
import LeaderBoard from './LeaderBoard';
import ProgressChart from './ProgressChart';
import ResultsDisplay from './ResultsDisplay';
import ThemeDropdown from './ThemeDropdown';
import WorkoutDropdown from './WorkoutDropdown';
import styled from 'styled-components';
import { useRouter } from 'next/router';

const ControlPanel = styled.div`
   display: flex;
   color: ${(props) => props.theme.styles[5].style.color};
   background: ${(props) => props.theme.plain.backgroundColor};
   z-index: 1000;
`;

const TopAligned = styled(ControlPanel)`
   position: absolute;
   height: 165px;
   justify-content: center;
   align-items: center;
   width: 100%;
   z-index: 1000;
   border-bottom: 1px solid ${(props) => props.theme.plain.color + '99'};
   @media (max-width: 1470px) {
      align-items: flex-end;
      height: 200px;
   }
   @media (max-width: 768px) {
      height: 180px;
   }
`;

const LeftAligned = styled(ControlPanel)`
   transform: translateX(15px);
   display: flex;
   padding: 10px;
   padding-top: 50px;
   flex-direction: column;
   border: 1px solid ${(props) => props.theme.plain.color + '99'};
   align-items: center;
   width: 530px;
   height: 100vh;
`;

const ControlsContainer = styled.div`
   display: flex;
   position: absolute;
   margin: 10px;
   top: 0;
   left: 0;
   width: 380px;
   @media (max-width: 768px) {
      position: absolute;
      transform: translateX(32px) translateY(-52px);
   }
`;

const FlipButton = styled.button`
   color: ${(props) => props.theme.styles[5].style.color};
   background-color: ${(props) => props.theme.plain.backgroundColor};
   margin: 10px;
   color: #aaa;
   width: 30px;
   height: 30px;
   border: 1px solid ${(props) => props.theme.plain.color + '99'};
   transform: scale(0.7) translateX(10px) translateY(10px);
   @media (max-width: 768px) {
      display: none;
   }
`;

const JoinBtn = styled(Button)`
   font-size: 14px;
   /* width: 100px; */
   height: 10px;
   margin-left: 13px;
   margin-top: 7px;
`;

const DropdownContainer = styled.div`
   display: flex;
   justify-content: space-around;
   @media (max-width: 768px) {
      transform: scale(0.95) translateY(64px) translateX(-25px);
   }
`;

const DisplaysContainerLeft = styled.div`
   margin-top: 20px;
`;

const DisplaysContainerTop = styled.div`
   display: flex;
   justify-content: space-around;
`;

export default function Panel() {
   const router = useRouter();
   const [store, setStore] = useContext(Context);

   const Surface = store.leftAligned ? LeftAligned : TopAligned;
   let DisplaysContainer = store.leftAligned ? DisplaysContainerLeft : DisplaysContainerTop;

   React.useEffect(() => {}, []);

   return (
      <Surface>
         <ControlsContainer>
            <FlipButton onClick={() => setStore({ ...store, leftAligned: !store.leftAligned })}>
               {!store.leftAligned ? `⤵` : `⤴`}
            </FlipButton>
            <DropdownContainer>
               <WorkoutDropdown />
               <ThemeDropdown />
            </DropdownContainer>
            <JoinBtn
               onClick={() => {
                  router.push('/race');
               }}>
               Wanna Race?
            </JoinBtn>
         </ControlsContainer>
         <DisplaysContainer>
            <ResultsDisplay />
            <ProgressChart />
            <LeaderBoard />
         </DisplaysContainer>
      </Surface>
   );
}
