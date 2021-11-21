import { AppContext } from '../components/AppContext';
import Panel from '../components/Panel';
import React from 'react';
import ReactDOM from 'react-dom';
import { StrictMode } from 'react';
import TreadMill from '../components/TreadMill';
import styled from 'styled-components';

const Wrapper = styled.div`
   overflow: hidden;
   height: 100vh;
   width: 100vw;
   /* margin: -20px; */
   background: ${(props) => props.theme.plain.backgroundColor + 'bb'};
   display: flex;
   justify-content: center;
`;

export default function App() {
   return (
      <AppContext>
         <Wrapper>
            <Panel />
            <TreadMill />
         </Wrapper>
      </AppContext>
   );
}
