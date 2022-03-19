import React, { useContext, useEffect, useState } from 'react';

import Button from './Button';
import CardContainer from './CardContainer';
import { Context } from './AppContext';
import LeaderBoard from './LeaderBoard';
import Link from './Link';
import Title from './Title';
import io from 'socket.io-client';
import styled from 'styled-components';
import { useRouter } from 'next/router';

const socket = io();
const Section = styled.div`
   border: 1px solid ${(props) => props.theme.plain.color + '66'};
   padding: 30px;
   margin: 25px;
   width: 100%;
   max-width: 750px;
   min-height: 450px;
`;

const Btn = styled(Button)`
   display: block;
   bottom: 0px;
   right: 0px;
   margin-top: 10%;
   margin-left: 80%;
`;

const Input = styled.input`
   display: block;
   width: 700px;
   text-align: center;
   margin: 0 auto;
   margin-top: 80px;
   border-radius: 5px;
   border: 2px solid ${(props) => props.theme.plain.color};
   color: ${(props) => props.theme.styles[2].style.color};
   font-size: 80px;
`;

const RaceJoin = ({}) => {
   const router = useRouter();
   const [store, setStore] = useContext(Context);
   const [state, setState] = useState({
      joined: false,
      joinCode: '',
      name: '',
   });
   useEffect(() => {
      if (!socket.connected && store.raceID) {
         fetch('/api/socketio').finally(() => {
            socket.on(store.raceID + '-raceStart', (raceRoute) => {
               router.push(raceRoute);
               setStore({ ...store, rpm: 0, score: 0, currentIndex: 0 });
            });

            socket.on(store.userName, (userName) => {
               console.log(userName + ' joined the ' + store.raceID);
               setState({ ...state, joined: true, message: null });
            });

            socket.on('woops' + store.raceID + '-' + store.userName, () => {
               console.log(store.userName + ' nope nope ' + store.raceID);
               setState({ ...state, joined: false, message: 'Invalid join code' });
            });

            socket.on('a user connected', () => {
               console.log('a user connected?');
            });
         });
      }
   }, [store.raceID, store.userName, state]);

   const handleJoin = () => {
      //this next line ensures unique results among same named competitors
      const userName = state.name + '~~' + Math.random();
      setStore({ ...store, raceID: state.joinCode, userName: userName });
      socket.emit('joinRace', state.joinCode, userName);
   };

   const handleTextEntry = (val, box) => {
      if (box === 'code') {
         setState({ ...state, joinCode: val });
      } else {
         setState({ ...state, name: val });
      }
   };

   return (
      <CardContainer>
         {state.joined ? (
            <Section>Wait for the race to begin. Stay on this page.</Section>
         ) : (
            <Section>
               <Title w='180px' xOffset='-39px'>
                  Join Race
               </Title>
               Enter your name and a join code.
               <Input
                  onChange={(e) => handleTextEntry(e.target.value, 'name')}
                  autoFocus
                  placeholder='your name'
               />
               <Input
                  onChange={(e) => handleTextEntry(e.target.value, 'code')}
                  placeholder='join code'
               />
               {state.message ? state.message : null}
               <Btn
                  disabled={state.name == '' || state.joinCode == ''}
                  onClick={() => handleJoin()}>
                  Join Race
               </Btn>
               Or...
               <Link ownLine target='_blank' href='/race-manager'>
                  Create your own race and invite others
               </Link>
            </Section>
         )}

         <LeaderBoard />
      </CardContainer>
   );
};

export default RaceJoin;
