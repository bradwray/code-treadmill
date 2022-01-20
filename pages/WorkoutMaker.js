import { AppContext, Context } from '../components/AppContext';
import React, { useContext, useEffect, useState } from 'react';

import Head from 'next/head';
import Panel from '../components/Panel';
import QuestionMaker from '../components/QuestionMaker';
import ThemeDropdown from '../components/ThemeDropdown';
import styled from 'styled-components';

const Wrapper = styled.div`
   display: flex;
   width: 100%;
   align-items: center;
   flex-direction: column;
   padding-top: 20px;
   min-height: 100vh;
   background-color: ${(props) => props.theme.plain.backgroundColor + 'bb'};
`;

const Toptions = styled.div`
   background-color: ${(props) => props.theme.plain.backgroundColor};
   position: sticky;
   top: 0;
   z-index: 1000;
   border-bottom: 1px solid ${(props) => props.theme.plain.color + '99'};
`;

const AddNew = styled.button`
   margin-bottom: 80px;
   height: 50px;
   padding-right: 10px;
   padding-left: 10px;
   font-size: 25px;
   font-family: 'Dank Mono', 'Fira Code', monospace;
   border: 1px dashed ${(props) => props.theme.plain.backgroundColor + 'bb'};
   background-color: ${(props) => props.theme.plain.color};
   color: ${(props) => props.theme.plain.backgroundColor};
   :hover {
      transform: scale(1.05);
   }
`;

const WorkoutMaker = ({}) => {
   const [state, setState] = useState({ items: [''] });
   useEffect(() => {}, []);

   const handleSave = () => {};

   const handleNew = () => {
      setState({
         items: [...state.items, ''],
      });
   };

   return (
      <AppContext>
         <Head>
            <title>codeRPM</title>
            {/* <meta name='viewport' content='initial-scale=1.0, width=device-width maximum-scale=1' /> */}
         </Head>
         <Toptions>
            <ThemeDropdown />
         </Toptions>
         <Wrapper>
            {state.items.map((item, index) => (
               <QuestionMaker key={index} />
            ))}
            <AddNew onClick={() => handleNew()}> Add New Item</AddNew>
         </Wrapper>
      </AppContext>
   );
};

export default WorkoutMaker;
