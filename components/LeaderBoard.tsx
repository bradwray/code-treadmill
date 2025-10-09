import React, { useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import styled from 'styled-components';

import { Context } from './AppContext';

import type {
  ClientToServerEvents,
  RaceParticipant,
  ServerToClientEvents,
} from '../types';

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io();

const BoardContainer = styled.div<{ leftAligned: boolean }>`
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

const Row = styled.tr<{ you?: boolean; header?: boolean }>`
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

const nameWithoutSuffix = (fullName: string): string => {
  const suffixIndex = fullName.indexOf('~~');
  if (suffixIndex === -1) {
    return fullName.substring(0, 18);
  }
  return fullName.substring(0, suffixIndex).substring(0, 18);
};

const LeaderBoard = (): React.ReactElement => {
  const [store, setStore] = useContext(Context);
  const [results, setResults] = useState<Record<string, RaceParticipant>>({});

  useEffect(() => {
    if (!socket.connected) {
      void fetch('/api/socketio').finally(() => {
        socket.on('a user connected', () => {
          console.log('a user connected?');
        });
      });
    }
  }, []);

  useEffect(() => {
    if (!store.raceID) {
      return;
    }

    const updateEvent = `${store.raceID}-updateRace`;
    const endEvent = `${store.raceID}-raceEnded`;

    const handleUpdate = (raceStats: Record<string, RaceParticipant>) => {
      setResults(raceStats);
    };

    const handleRaceEnd = (endTime: string) => {
      setStore((prev) => ({ ...prev, raceID: null, endTime }));
    };

    socket.on(updateEvent, handleUpdate);
    socket.on(endEvent, handleRaceEnd);

    return () => {
      socket.off(updateEvent, handleUpdate);
      socket.off(endEvent, handleRaceEnd);
    };
  }, [setStore, store.raceID]);

  const resultsList = Object.keys(results)
    .map((key) => results[key])
    .sort((a, b) => {
      const scoreA = Number(a.score) || 0;
      const scoreB = Number(b.score) || 0;
      const progressA = Number(a.progress) || 0;
      const progressB = Number(b.progress) || 0;
      return scoreB * progressB - scoreA * progressA;
    });

  return (
    <BoardContainer leftAligned={store.leftAligned}>
      {store.raceID == null && store.endTime ? `Race ended at ${store.endTime}` : null}
      <Row header>
        <Cell>#</Cell>
        <NameCell>name</NameCell>
        <Cell>score</Cell>
        <Cell>prog.</Cell>
      </Row>
      {resultsList.map((competitor, index) => (
        <Row key={competitor.name} you={competitor.name === store.userName}>
          <Cell>{`${index + 1}: `}</Cell>
          <NameCell>{nameWithoutSuffix(competitor.name)}</NameCell>
          <Cell>{competitor.score}</Cell>
          <Cell>{competitor.progress}%</Cell>
        </Row>
      ))}
    </BoardContainer>
  );
};

export default LeaderBoard;
