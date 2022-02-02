import React, { useContext, useEffect, useState } from 'react';

import Button from './Button';
import { Context } from './AppContext';
import io from 'socket.io-client';
import styled from 'styled-components';

const socket = io();

const BoardContainer = styled.div`
   width: 380px;
   /* height: 124px; */
   font-family: 'Orbitron', sans-serif;
   border: 1px solid #666;
   border-radius: 10px;
   color: ${(props) => props.theme.styles[5].style.color};
   background-color: ${(props) => props.theme.plain.backgroundColor};
   padding-top: 8px;
   box-shadow: inset 0px 0px 2px 0px white;
   display: flex;
   flex-direction: column;
   align-items: center;
   margin: 10px;
   display: ${(props) => (!props.leftAligned ? `none` : ``)};
   @media (max-width: 768px) {
      display: none;
   }
`;

const InputBox = styled.input`
   bottom: 25px;
   width: ${(props) => (props.w ? `200px` : `60px`)};
   background-color: ${(props) => props.theme.plain.backgroundColor};
   border-color: ${(props) => props.theme.plain.color + '66'};
   border-radius: 2px;
   filter: brightness(130%);
   color: ${(props) => props.theme.plain.color};
   height: 30px;
   text-align: center;
`;

const LeaderBoard = ({}) => {
   const [store, setStore] = useContext(Context);
   const [results, setResults] = useState({});
   const [userInfo, setUserInfo] = useState({ name: '', joined: false });

   useEffect(() => {
      fetch('/api/socketio').finally(() => {
         socket.on('updateRace', (raceStats) => {
            console.log('client raceStats');
            setResults(raceStats);
         });

         socket.on('a user connected', () => {
            console.log('a user connected?');
         });
      });

      socket.emit('newResult', {
         name: userInfo.name,
         score: (store.rpm * store.avgComplexity).toFixed(2),
         progress: (store.currentIndex / store.slides.length).toFixed(0),
      });
   }, [store.currentIndex]);

   const handleJoin = () => {
      setUserInfo({ ...userInfo, joined: true });
      socket.emit('newResult', {
         name: userInfo.name,
         score: 0,
         progress: 0,
      });
   };
   console.log(results);
   return (
      <BoardContainer leftAligned={store.leftAligned}>
         {!userInfo.joined ? (
            <div>
               <InputBox onChange={(e) => setUserInfo({ name: e.target.value })}></InputBox>
               <Button onClick={() => handleJoin()}>Join</Button>
            </div>
         ) : null}
         {Object.keys(results).map((competitorKey, i) => {
            let competitor = results[competitorKey];
            return (
               <div
                  style={{ width: '200px', display: 'flex', justifyContent: 'space-between' }}
                  key={i}>
                  <div style={{ width: '30px' }}>{i + 1 + ': '}</div>
                  <div>{competitor.name}</div> <div>{competitor.score}</div>
                  <div>{competitor.progress}</div>
               </div>
            );
         })}
      </BoardContainer>
   );
};

export default LeaderBoard;
