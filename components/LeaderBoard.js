import React, { useContext, useEffect, useState } from 'react';

import { Context } from './AppContext';
import JoinRace from './JoinRace';
import io from 'socket.io-client';
import styled from 'styled-components';

const socket = io();

const BoardContainer = styled.div`
   width: 380px;
   /* height: 124px; */
   font-family: 'Orbitron', sans-serif;
   font-size: 14px;
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

const Row = styled.tr`
   width: 90%;
   padding: 3px;
   padding-left: 8px;
   display: flex;
   justify-content: center;
   ${(props) =>
      props.you
         ? `border: 2px solid ${props.theme.plain.color};
         background-color: ${props.theme.plain.color};
         color: ${props.theme.plain.backgroundColor};
         font-size: 15px;
   border-radius: 2px;`
         : ``}
   ${(props) => (props.header ? `border-bottom: 1px solid ${props.theme.plain.color};` : ``)}
`;

const Cell = styled.td`
   width: 40px;
   text-align: left;
   margin-right: 20px;
`;

const NameCell = styled.td`
   width: 200px;
`;

const LeaderBoard = ({}) => {
   const [store, setStore] = useContext(Context);
   const [results, setResults] = useState({});

   useEffect(() => {
      console.log(socket);
      if (!socket.connected) {
         fetch('/api/socketio').finally(() => {
            socket.on('a user connected', () => {
               console.log('a user connected?');
            });
         });
      } else {
         socket.on(store.raceID + '-updateRace', (raceStats) => {
            setResults(raceStats);
         });
      }
   }, [store.currentIndex, store.raceID]);

   const resultsList = Object.keys(results)
      .map((competitorKey, i) => results[competitorKey])
      .sort((a, b) => b.score * b.progress - a.score * a.progress);
   return (
      <BoardContainer leftAligned={store.leftAligned}>
         <Row key={'header'} header>
            <Cell>#</Cell>
            <NameCell>name</NameCell>
            <Cell>score</Cell>
            <Cell>prog.</Cell>
         </Row>
         {resultsList.map((competitor, i) => {
            return (
               <Row key={i} you={competitor.name == store.userName}>
                  <Cell>{i + 1 + ': '}</Cell>
                  <NameCell>
                     {competitor.name.substring(0, 18).substring(0, competitor.name.indexOf('~~'))}
                  </NameCell>
                  <Cell>{competitor.score}</Cell>
                  <Cell>{competitor.progress}%</Cell>
               </Row>
            );
         })}
      </BoardContainer>
   );
};

export default LeaderBoard;
