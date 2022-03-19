import { AppContext, Context } from '../../components/AppContext';
import React, { useContext, useEffect, useState } from 'react';

import Attention from '../../components/Attention';
import Button from '../../components/Button';
import CardContainer from '../../components/CardContainer';
import Head from 'next/head';
import LeaderBoard from '../../components/LeaderBoard';
import Link from '../../components/Link';
import Panel from '../../components/Panel';
import QuestionMaker from '../../components/QuestionMaker';
import ThemeDropdown from '../../components/ThemeDropdown';
import Title from '../../components/Title';
import WigglyPath from '../../components/WigglyPath';
import WorkoutDropdown from '../../components/WorkoutDropdown';
import { randomAnimals } from '../../utils/randomStringGenerator';
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
   const [state, setState] = useState({
      began: false,
      raceID: randomAnimals().toLowerCase(0) + Math.floor(Math.random() * 100),
      raceWorkout: '',
      raceLang: 'javaScript',
   });
   useEffect(() => {}, []);

   const handleStart = () => {
      setState({ ...state, began: true });
   };

   const handleRaceWorkout = (val) => {
      const lang = val.includes('pseudo') ? 'pseudocode' : 'javaScript';
      //this is where a new race should be triggered on the socket, after they user has picked a workout
      setState({ ...state, raceWorkout: val, raceLang: lang });
   };

   return (
      <AppContext>
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
                     <WorkoutDropdown isRace setRaceWorkout={handleRaceWorkout} />
                     <Attention
                        double
                        xOffset={160}
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
                        <Btn onClick={() => handleStart()}>Start Race</Btn>
                     </div>
                  ) : (
                     <InstructionsContainer>
                        Choose a workout for the race. A workout is like the race-course. Not sure
                        which one. Try them out at...
                        <Link ownLine target='_blank' href='https://www.waytocode.dev/'>
                           https://www.waytocode.dev/
                        </Link>
                     </InstructionsContainer>
                  )}
               </Section>

               <LeaderBoard />
            </CardContainer>
         </Wrapper>
      </AppContext>
   );
};

export default RaceManager;
