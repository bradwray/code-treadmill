import React, { useContext } from 'react';

import { Context } from './AppContext';
import ProgressChart from './ProgressChart';
import ResultsDisplay from './ResultsDisplay';
import ThemeDropdown from './ThemeDropdown';
import WorkoutDropdown from './WorkoutDropdown';
import styled from 'styled-components';

const ControlPanel = styled.div`
   display: flex;
   color: ${(props) => props.theme.styles[5].style.color};
   background: ${(props) => props.theme.plain.backgroundColor};
   z-index: 1000;
`;

const TopAligned = styled(ControlPanel)`
   position: absolute;
   /* transform: translateX(-10px) translateY(-10px); */
   height: 165px;
   justify-content: space-around;
   align-items: center;
   width: 100%;
   z-index: 1000;
   border-bottom: 1px solid ${(props) => props.theme.plain.color + '99'};
   @media (max-width: 768px) {
      flex-direction: column;
      height: 200px;
   }
`;

const LeftAligned = styled(ControlPanel)`
   transform: translateX(15px);

   display: flex;
   padding: 10px;
   padding-top: 50px;
   flex-direction: column;
   border: 1px solid ${(props) => props.theme.plain.color + '99'};
   justify-content: flex-start;
   width: 400px;
   height: 100vh;
`;

const Button = styled.button`
   color: ${(props) => props.theme.styles[5].style.color};
   background-color: ${(props) => props.theme.plain.backgroundColor};
   position: absolute;
   top: 0;
   left: 0;
   margin: 10px;
   color: #aaa;
   width: 30px;
   height: 30px;
   border: 1px solid ${(props) => props.theme.plain.color + '99'};
   @media (max-width: 768px) {
      display: none;
   }
`;

const DropdownContainer = styled.div`
   display: flex;
   flex-direction: column;

   @media (max-width: 768px) {
      flex-direction: row;
      transform: scale(0.9) translateY(64px);
   }
`;

export default function Panel() {
   const [store, setStore] = useContext(Context);

   const Surface = store.leftAligned ? LeftAligned : TopAligned;
   return (
      <Surface>
         <Button onClick={() => setStore({ ...store, leftAligned: !store.leftAligned })}>
            {!store.leftAligned ? `⤵` : `⤴`}
         </Button>
         <DropdownContainer>
            <WorkoutDropdown />
            <ThemeDropdown />
         </DropdownContainer>
         <ResultsDisplay />
         <ProgressChart />
      </Surface>
   );
}
