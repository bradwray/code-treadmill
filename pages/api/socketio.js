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

         socket.on('joinRace', (raceID, userName) => {
            console.log(races);
            if (races.hasOwnProperty(raceID)) {
               races[raceID].participants[userName] = { score: 0, progress: 0 };
               console.log(userName + ' has joined ' + raceID);
               socket.emit(userName, userName);
            } else {
               console.log(raceID + ' is not a race id');
               socket.emit('woops' + raceID + '-' + userName);
            }
         });

         socket.on('newResult', (newResult) => {
            raceStats[newResult.name] = newResult;
            console.log(raceStats);
            socket.broadcast.emit('updateRace', raceStats);
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
