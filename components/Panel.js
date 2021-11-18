import React, { useContext } from 'react';

import { Context } from './AppContext';
import ResultsDisplay from './ResultsDisplay';
import ThemeDropdown from './ThemeDropdown';
import styled from 'styled-components';

const TopAligned = styled.div`
   position: absolute;
   /* transform: translateX(-10px) translateY(-10px); */
   display: flex;
   padding: 10px;
   padding-top: 20px;
   color: ${(props) => props.theme.styles[5].style.color};
   background-color: ${(props) => props.theme.plain.backgroundColor};
   justify-content: space-around;
   width: 100vw;
   z-index: 1000;
`;

const LeftAligned = styled.div`
   transform: translateX(-10px) translateY(-10px);
   padding-top: 50px;
   display: flex;
   padding: 10px;
   flex-direction: column;
   justify-content: space-around;
   width: 400px;
   height: 100vh;
   color: ${(props) => props.theme.styles[5].style.color};
   background-color: ${(props) => props.theme.plain.backgroundColor};
   z-index: 1000;
`;

const Button = styled.button`
   background-color: #222;
   position: absolute;
   top: 0;
   left: 0;
   margin: 5px;
   color: #aaa;
   width: 30px;
   height: 30px;
   border: 1px solid #666;
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
         <Button onClick={() => setLeftAigned(!leftAligned)}>side</Button>

         <ThemeDropdown />
         <ResultsDisplay />
      </Surface>
   );
}
