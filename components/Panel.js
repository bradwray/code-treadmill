import React, { useContext } from 'react';

import { Context } from './AppContext';
import ProgressChart from './ProgressChart';
import ResultsDisplay from './ResultsDisplay';
import ThemeDropdown from './ThemeDropdown';
import WorkoutDropdown from './WorkoutDropdown';
import styled from 'styled-components';

const TopAligned = styled.div`
   position: absolute;
   /* transform: translateX(-10px) translateY(-10px); */
   display: flex;
   height: 165px;
   color: ${(props) => props.theme.styles[5].style.color};
   background: ${(props) => props.theme.plain.backgroundColor};
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

const LeftAligned = styled.div`
   transform: translateX(15px);
   padding-top: 50px;
   display: flex;
   padding: 10px;
   flex-direction: column;
   border: 1px solid ${(props) => props.theme.plain.color + '99'};
   justify-content: space-around;
   width: 400px;
   height: 100vh;
   color: ${(props) => props.theme.styles[5].style.color};
   background-color: ${(props) => props.theme.plain.backgroundColor};
   z-index: 1000;
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
   const [leftAligned, setLeftAigned] = React.useState(false);

   const [store, setStore] = useContext(Context);

   const handleTheme = (themeChoice) => {
      setStore({
         ...store,
         theme: themeChoice,
      });
   };

   const Surface = leftAligned ? LeftAligned : TopAligned;
   return (
      <Surface>
         <Button onClick={() => setLeftAigned(!leftAligned)}>{!leftAligned ? `⤵` : `⤴`}</Button>
         <DropdownContainer>
            <WorkoutDropdown />
            <ThemeDropdown />
         </DropdownContainer>
         <ResultsDisplay />
         <ProgressChart />
      </Surface>
   );
}
