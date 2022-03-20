import { Server } from 'socket.io';

let raceStats = {};
let raceKeys = [];
let races = {};

const ioHandler = (req, res) => {
   if (!res.socket.server.io) {
      console.log('*First use, starting socket.io');
      const io = new Server(res.socket.server);
      io.on('connection', (socket) => {
         socket.broadcast.emit('a user connected');

         socket.on('setRace', (raceWorkout, raceID, raceLang) => {
            races[raceID] = { raceWorkout, raceLang, participants: {} };
            console.log(raceID + ' is now a race');
         });

         socket.on('raceStart', (raceID, startTime) => {
            races[raceID].began = startTime;
            console.log(races[raceID].raceWorkout);
            socket.broadcast.emit('race-began', raceID, startTime, races[raceID].raceWorkout);
         });

         socket.on('joinRace', (raceID, userName) => {
            console.log(races);
            if (races.hasOwnProperty(raceID)) {
               socket.emit('welcome', userName);
               races[raceID].participants[userName] = { name: userName, score: 0, progress: 0 };
               socket.broadcast.emit(raceID + '-updateRace', races[raceID].participants);
            } else {
               socket.emit('woops', userName);
            }
         });

         socket.on('newResult', (raceID, userName, newResult) => {
            races[raceID].participants[userName] = newResult;
            socket.broadcast.emit(raceID + '-updateRace', races[raceID].participants);
         });
      });

      res.socket.server.io = io;
   } else {
      console.log('socket.io already running');
   }
   res.end();
};

export const config = {
   api: {
      bodyParser: false,
   },
};

export default ioHandler;
