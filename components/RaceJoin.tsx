import React, { useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import Button from './Button';
import CardContainer from './CardContainer';
import { Context } from './AppContext';
import LeaderBoard from './LeaderBoard';
import Link from './Link';
import Title from './Title';

import type { ClientToServerEvents, ServerToClientEvents } from '../types';

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io();
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

interface RaceJoinState {
  joined: boolean;
  joinCode: string;
  name: string;
  message?: string;
  joining: boolean;
}

const RaceJoin = (): React.ReactElement => {
  const router = useRouter();
  const [store, setStore] = useContext(Context);
  const [state, setState] = useState<RaceJoinState>({
    joined: false,
    joinCode: '',
    name: '',
    joining: false,
  });
  useEffect(() => {
    if (!socket.connected) {
      void fetch('/api/socketio');
    }
  }, []);

  useEffect(() => {
    const handleWelcome = (userName: string) => {
      if (userName === store.userName) {
        setState((prev) => ({
          ...prev,
          joined: true,
          message: undefined,
          joining: false,
        }));
      }
    };

    const handleWoops = (userName: string) => {
      if (userName === store.userName) {
        setState((prev) => ({
          ...prev,
          joined: false,
          message: 'Invalid join code',
          joining: false,
        }));
      }
    };

    const handleRaceBegan = (raceID: string, startTime: string, raceRoute: string) => {
      setStore((prev) => {
        if (prev.raceID !== raceID) {
          return prev;
        }
        void router.push(`/${raceRoute}?raceID=${raceID}&uName=${prev.userName ?? ''}`);
        return {
          ...prev,
          startTime,
          raceWorkout: raceRoute,
          workout: raceRoute,
          score: 0,
          currentIndex: 0,
          progress: 0,
        };
      });
    };

    socket.on('welcome', handleWelcome);
    socket.on('woops', handleWoops);
    socket.on('raceBegan', handleRaceBegan);

    return () => {
      socket.off('welcome', handleWelcome);
      socket.off('woops', handleWoops);
      socket.off('raceBegan', handleRaceBegan);
    };
  }, [router, setStore, store.userName]);

  const handleJoin = () => {
    //this next line ensures unique results among same named competitors
    const userName =
      state.name + '~~' + Math.floor(Math.random() * 100).toString();
    setState((prev) => ({ ...prev, joining: true, message: 'Joining...' }));
    setStore((prev) => ({ ...prev, raceID: state.joinCode, userName }));

    socket.emit('joinRace', state.joinCode, userName);
  };
  const handleTextEntry = (val: string, box: 'code' | 'name') => {
    if (box === 'code') {
      setState((prev) => ({ ...prev, joinCode: val }));
    } else {
      setState((prev) => ({ ...prev, name: val }));
    }
  };

  return (
    <CardContainer>
      {state.joined ? (
        <Section>Wait for the race to begin. Stay on this page.</Section>
      ) : (
        <Section>
          <Title w="180px" xOffset="-39px">
            Join Race
          </Title>
          Enter your name and a join code.
          <Input
            onChange={(e) => handleTextEntry(e.target.value, 'name')}
            autoFocus
            placeholder="your name"
          />
          <Input
            onChange={(e) => handleTextEntry(e.target.value, 'code')}
            placeholder="join code"
          />
          {state.message ? state.message : null}
          <Btn
            disabled={
              state.name === '' ||
              state.joinCode === '' ||
              state.joining
            }
            onClick={handleJoin}
          >
            Join Race
          </Btn>
          Or...
          <Link ownLine target="_blank" href="/race-manager">
            Create your own race and invite others
          </Link>
        </Section>
      )}

      <LeaderBoard />
    </CardContainer>
  );
};

export default RaceJoin;
