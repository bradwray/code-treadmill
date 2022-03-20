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
      console.log('in useEffect');
      if (!socket.connected) {
         fetch('/api/socketio').finally(() => {
            // socket.on(store.raceID + '-raceStart', (raceRoute) => {
            //    router.push(raceRoute);
            //    setStore({ ...store, rpm: 0, score: 0, currentIndex: 0 });
            // });

            socket.on('a user connected', () => {
               console.log('a user connected?');
            });
         });
      } else {
         socket.on('welcome', (userName) => {
            if (userName === store.userName) {
               setState({ ...state, joined: true, message: null });
            }
         });
         socket.on('woops', (userName) => {
            if (userName === store.userName) {
               setState({ ...state, joined: false, message: 'Invalid join code' });
            }
         });
         socket.on('race-began', (raceID, startTime, raceRoute) => {
            console.log(raceID + ' began at ' + startTime);
            if (store.raceID === raceID) {
               setStore({ ...store, startTime, score: 0, currentIndex: 0, progress: 0 });
               router.push('/' + raceRoute);
            }
         });
      }
   }, [store.raceID, store.userName]);

   const handleJoin = () => {
      //this next line ensures unique results among same named competitors
      const userName = state.name + '~~' + Math.floor(Math.random() * 100).toString();
      setState({ ...state, joining: true, message: 'Joining...' });
      console.log('joining' + state.joinCode + ' ' + userName);
      setStore({ ...store, raceID: state.joinCode, userName: userName });

      socket.emit('joinRace', state.joinCode, userName);
   };
   console.log(store);
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
                  disabled={
                     state.name == '' || state.joinCode == '' || state.joining == 'Joining...'
                  }
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
