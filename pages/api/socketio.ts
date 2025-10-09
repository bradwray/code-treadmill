import type { NextApiRequest, NextApiResponse } from 'next';
import { Server } from 'socket.io';

import type { ClientToServerEvents, RaceParticipant, RaceRegistry, ServerToClientEvents } from '../../types';
import type { Server as NetServer } from 'http';
import type { Socket } from 'net';

type SocketServer = NetServer & {
  io?: Server<ClientToServerEvents, ServerToClientEvents>;
};

type NextApiResponseWithSocket = NextApiResponse & {
  socket: Socket & {
    server: SocketServer;
  };
};

const races: RaceRegistry = {};

const ioHandler = (req: NextApiRequest, res: NextApiResponseWithSocket) => {
  if (!res.socket.server.io) {
    const io = new Server<ClientToServerEvents, ServerToClientEvents>(res.socket.server);

    io.on('connection', (socket) => {
      socket.broadcast.emit('a user connected');

      socket.on('setRace', (raceWorkout, raceID, raceLang) => {
        races[raceID] = {
          raceWorkout,
          raceLang,
          participants: {},
          ended: false,
        };
      });

      socket.on('raceStart', (raceID, startTime) => {
        if (!races[raceID]) return;
        races[raceID].began = startTime;
        socket.broadcast.emit('raceBegan', raceID, startTime, races[raceID].raceWorkout);
      });

      socket.on('raceEnd', (raceID, endTime) => {
        if (!races[raceID]) return;
        races[raceID].ended = endTime;
        socket.broadcast.emit(`${raceID}-raceEnded`, endTime);
      });

      socket.on('joinRace', (raceID, userName) => {
        const race = races[raceID];
        if (race && !race.ended) {
          socket.emit('welcome', userName);
          race.participants[userName] = {
            name: userName,
            score: 0,
            progress: 0,
          };
          socket.broadcast.emit(`${raceID}-updateRace`, race.participants);
        } else {
          socket.emit('woops', userName);
        }
      });

      socket.on('newResult', (raceID, userName, newResult: RaceParticipant) => {
        const race = races[raceID];
        if (!race) {
          return;
        }
        race.participants[userName] = newResult;
        socket.broadcast.emit(`${raceID}-updateRace`, race.participants);
      });
    });

    res.socket.server.io = io;
  }

  res.end();
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default ioHandler;
