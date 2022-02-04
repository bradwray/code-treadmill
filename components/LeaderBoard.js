import React, { useContext, useEffect, useRef, useState } from 'react';

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

const Row = styled.tr`
   width: 200px;
   display: flex;
   justify-content: center;
`;

const YouRow = styled(Row)`
   border: 2px solid ${(props) => props.theme.plain.color};
   border-radius: 2px;
`;

const Cell = styled.td`
   min-width: 60px;
   text-align: left;
   margin-right: 20px;
`;

const LeaderBoard = ({}) => {
   const [store, setStore] = useContext(Context);
   const [results, setResults] = useState({});
   const nameInput = useRef();

   useEffect(() => {
      console.log(socket);
      if (!socket.connected) {
         fetch('/api/socketio').finally(() => {
            socket.on('updateRace', (raceStats) => {
               console.log('updateRace');
               setResults(raceStats);
            });

            socket.on('a user connected', () => {
               console.log('a user connected?');
            });
         });
      }
   }, [store.currentIndex]);

   const handleJoin = () => {
      setStore({ ...store, userName: nameInput.current.value });
      const youUser = {
         name: nameInput.current.value,
         score: 0,
         progress: 0,
      };
      socket.emit('newResult', youUser);
      let temp = results;
      temp[nameInput.current.value] = youUser;
      setResults(temp);
   };

   const resultsList = Object.keys(results)
      .map((competitorKey, i) => results[competitorKey])
      .sort((a, b) => b.score * b.progress - a.score * a.progress);
   return (
      <BoardContainer leftAligned={store.leftAligned}>
         {!results.hasOwnProperty(store.userName) ? (
            <div>
               <InputBox type='text' ref={nameInput}></InputBox>
               <Button onClick={() => handleJoin()}>Join</Button>
            </div>
         ) : null}
         {resultsList.map((competitor, i) => {
            if (competitor.name == store.userName) {
               return (
                  <YouRow key={i}>
                     <Cell>{i + 1 + ': '}</Cell>
                     <Cell>{competitor.name}</Cell>
                     <Cell>{competitor.score}</Cell>
                     <Cell>{competitor.progress}</Cell>
                  </YouRow>
               );
            } else {
               return (
                  <Row key={i}>
                     <Cell>{i + 1 + ': '}</Cell>
                     <Cell>{competitor.name}</Cell>
                     <Cell>{competitor.score}</Cell>
                     <Cell>{competitor.progress}</Cell>
                  </Row>
               );
            }
         })}
      </BoardContainer>
   );
};

export default LeaderBoard;
