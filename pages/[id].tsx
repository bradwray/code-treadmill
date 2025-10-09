import Head from 'next/head';
import { useRouter } from 'next/router';
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

const WorkoutPage = (): React.ReactElement | null => {
   const router = useRouter();
   const { id, raceID, uName } = router.query;
   if (typeof id === 'string') {
      return (
         <AppContext route={id} raceID={typeof raceID === 'string' ? raceID : undefined} uName={typeof uName === 'string' ? uName : undefined}>
            <Head>
               <title>Way-To-Code {id}</title>
               <meta
                  name='viewport'
                  content='initial-scale=1.0, width=device-width maximum-scale=1'
               />
            </Head>
            <Wrapper>
               <Panel />
               <TreadMill />
            </Wrapper>
         </AppContext>
      );
   }
   return null;
};

export default WorkoutPage;
