import React, { useContext, useEffect, useState } from 'react';

import { AppContext } from '../../components/AppContext';
import Head from 'next/head';
import RaceJoin from '../../components/RaceJoin';
import ThemeDropdown from '../../components/ThemeDropdown';
import styled from 'styled-components';
import Button from '../../components/Button';
import { useRouter } from 'next/router';

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
   display: flex;
   justify-content: space-between;
   background-color: ${(props) => props.theme.plain.backgroundColor};
   position: sticky;
   top: 0;
   z-index: 1000;
   border-bottom: 1px solid ${(props) => props.theme.plain.color + '99'};
`;

const Btn = styled(Button)`
   height: 40px;
   margin-top: 8px;
   margin-left: 10px;
   margin-right: 20px;
   font-size: 30px;

   border: 1px dashed ${(props) => (props.disabled ? 'gray' : props.theme.plain.color)};
   color: ${(props) => (props.disabled ? 'gray' : props.theme.plain.color)};
   background-color: ${(props) => props.theme.plain.backgroundColor};
`;

const Race = ({}) => {
   const router = useRouter();
   return (
      <AppContext>
         <Head>
            <title>Way To Code!</title>
            {/* <meta name='viewport' content='initial-scale=1.0, width=device-width maximum-scale=1' /> */}
         </Head>
         <Toptions>
            <Btn onClick={() => router.push('/')}>⇦</Btn>
            <ThemeDropdown />
         </Toptions>
         <Wrapper>
            <RaceJoin />
         </Wrapper>
      </AppContext>
   );
};

export default Race;
