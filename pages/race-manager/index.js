import React, { useContext, useEffect, useState } from 'react';

import Attention from '../../components/Attention';
import Button from '../../components/Button';
import CardContainer from '../../components/CardContainer';
import { Context } from '../../components/AppContext';
import Head from 'next/head';
import LeaderBoard from '../../components/LeaderBoard';
import Link from '../../components/Link';
import ThemeDropdown from '../../components/ThemeDropdown';
import Title from '../../components/Title';
import WigglyPath from '../../components/WigglyPath';
import WorkoutDropdown from '../../components/WorkoutDropdown';
import io from 'socket.io-client';
import { randomAnimals } from '../../utils/randomStringGenerator';
import styled from 'styled-components';

const socket = io();

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

const Section = styled.div`
   border: 1px solid ${(props) => props.theme.plain.color + '66'};
   padding: 40px;
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

const RaceCode = styled.div`
   display: block;
   width: 700px;
   text-align: center;
   margin: 0 auto;
   border-radius: 5px;
   border: 2px solid ${(props) => props.theme.plain.color};
   color: ${(props) => props.theme.styles[2].style.color};
   font-size: 80px;
`;

const DropDownContainer = styled.div`
   /* position: absolute; */
   display: flex;
   justify-content: space-between;
   font-size: 22px;
   width: 550px;
   border: 1px solid red;
   background-color: ${(props) => props.theme.plain.backgroundColor};
   border-radius: 5px;
   border: 2px solid ${(props) => props.theme.plain.color};
   transform: translateY(-120px) translateX(170px);
`;

const InstructionsContainer = styled.div`
   /* position: absolute; */
   padding: 30px;
   width: 640px;
   border: 1px solid red;
   background-color: ${(props) => props.theme.plain.backgroundColor};
   border-radius: 5px;
   border: 2px solid ${(props) => props.theme.plain.color};
   transform: translateY(-65px) translateX(20px);
`;

const RaceManager = ({}) => {
   const [store, setStore] = useContext(Context);
   const [state, setState] = useState({
      began: false,
      raceID: (randomAnimals().toLowerCase(0) + Math.floor(Math.random() * 100)).replace(' ', ''),
      raceWorkout: '',
      raceLang: 'javaScript',
   });
   //  const [store, setStore] = useContext(Context);
   useEffect(() => {
      fetch('/api/socketio').finally(() => {
         socket.on('a user connected', () => {
            console.log('a user connected?');
         });
      });
   }, []);

   const handleStart = () => {
      const d = new Date();
      socket.emit('raceStart', state.raceID, d.toLocaleString());
      setState({ ...state, began: true });
   };

   const handleEnd = () => {
      const d = new Date();
      socket.emit('raceEnd', state.raceID, d.toLocaleString());
      setState({ ...state, finished: true });
   };

   const handleRaceWorkout = (val) => {
      const { raceWorkout, raceID, raceLang } = state;
      const lang = val.includes('pseudo') ? 'pseudocode' : 'javaScript';
      console.log(val);
      socket.emit('setRace', val, raceID, raceLang);
      setState({ ...state, raceWorkout: val, raceLang: lang });
      setStore({ ...store, raceID: raceID, raceWorkout: val, raceLang: lang });
   };

   return (
      <div>
         <Head>
            <title>Way To Code!</title>
            {/* <meta name='viewport' content='initial-scale=1.0, width=device-width maximum-scale=1' /> */}
         </Head>
         <Toptions>
            <ThemeDropdown />
         </Toptions>
         <Wrapper>
            <CardContainer>
               <Section>
                  <Title big w='200px' xOffset='-59px'>
                     Manage Race
                  </Title>
                  <DropDownContainer>
                     {state.began ? (
                        <div style={{ padding: '15px' }}>
                           {store.raceWorkout.substring(
                              store.raceWorkout.indexOf('-') + 1,
                              store.raceWorkout.length
                           )}
                        </div>
                     ) : (
                        <WorkoutDropdown isRace setRaceWorkout={handleRaceWorkout} />
                     )}
                     <Attention
                        double
                        xOffset={170}
                        message={
                           state.raceWorkout === '' ? 'pick a workout' : 'racing this workout'
                        }></Attention>
                     <div style={{ padding: '13px' }}>{state.raceLang}</div>
                  </DropDownContainer>
                  {state.raceWorkout != '' ? (
                     <div>
                        <InstructionsContainer>
                           Participants should go to{' '}
                           <Link ownLine target='_blank' href='https://www.waytocode.dev/'>
                              https://www.waytocode.dev/
                           </Link>
                           {`click "Wanna race?" and enter this race code`}
                        </InstructionsContainer>

                        <RaceCode>{state.raceID}</RaceCode>
                        {!state.began ? (
                           <Btn onClick={() => handleStart()}>Start Race</Btn>
                        ) : state.finished ? null : (
                           <Btn onClick={() => handleEnd()}>End Race</Btn>
                        )}
                     </div>
                  ) : (
                     <InstructionsContainer>
                        Choose a workout for the race. A workout is like the race-course. Not sure
                        which one? Try them out at...
                        <Link ownLine target='_blank' href='https://www.waytocode.dev/'>
                           https://www.waytocode.dev/
                        </Link>
                     </InstructionsContainer>
                  )}
               </Section>
               <LeaderBoard />
            </CardContainer>
         </Wrapper>
      </div>
   );
};

export default RaceManager;
