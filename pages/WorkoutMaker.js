import { AppContext, Context } from '../components/AppContext';
import React, { useContext, useEffect, useState } from 'react';

import Head from 'next/head';
import Panel from '../components/Panel';
import QuestionMaker from '../components/QuestionMaker';
import styled from 'styled-components';

const Wrapper = styled.div`
   display: flex;
   width: 100%;
   padding-top: 200px;
   align-items: center;
   flex-direction: column;
   justify-content: center;
   overflow: auto !important;
   height: 100vh;
   background-color: ${(props) => props.theme.plain.backgroundColor + 'bb'};
`;

const AddNew = styled.button`
   width: 125px;
   height: 50px;
   font-size: 25px;
   font-family: 'Dank Mono', 'Fira Code', monospace;
`;

const WorkoutMaker = ({}) => {
   const [state, setState] = useState({ items: ['', ''] });
   useEffect(() => {}, []);

   return (
      <AppContext>
         <Head>
            <title>codeRPM</title>
            <meta name='viewport' content='initial-scale=1.0, width=device-width maximum-scale=1' />
         </Head>
         <Panel />
         <Wrapper>
            {state.items.map((item, index) => (
               <QuestionMaker key={index} />
            ))}
            <AddNew />
         </Wrapper>
      </AppContext>
   );
};

export default WorkoutMaker;
