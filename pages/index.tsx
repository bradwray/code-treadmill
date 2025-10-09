import Head from 'next/head';
import React from 'react';
import styled from 'styled-components';

import { AppContext } from '../components/AppContext';
import Panel from '../components/Panel';
import TreadMill from '../components/TreadMill';

const Wrapper = styled.div`
   overflow: hidden;
   height: 100vh;
   width: 100vw;
   background: ${(props) => props.theme.plain.backgroundColor + 'bb'};
   display: flex;
   justify-content: center;
`;

export default function App(): React.ReactElement {
   return (
      <AppContext>
         <Head>
            <title>Way-To-Code</title>
            <meta name='viewport' content='initial-scale=1.0, width=device-width maximum-scale=1' />
         </Head>
         <Wrapper>
            <Panel />
            <TreadMill />
         </Wrapper>
      </AppContext>
   );
}
