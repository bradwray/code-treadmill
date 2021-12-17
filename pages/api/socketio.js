import { Server } from 'socket.io';

const ioHandler = (req, res) => {
   if (!res.socket.server.io) {
      console.log('*First use, starting socket.io');
      let raceStats = [];
      const io = new Server(res.socket.server);

      io.on('connection', (socket) => {
         socket.broadcast.emit('a user connected');
         socket.on('joinRace', (userStats) => {
            raceStats.push(userStats);
            console.log(raceStats);
            socket.broadcast.emit('updateRace', raceStats);
         });
         socket.on('newResult', ({ user, rpm, avgComplexity }) => {
            const newRaceStats = raceStats.map((item) => {
               if (item.user == user) {
                  return { user, rpm, avgComplexity };
               } else {
                  return item;
               }
            });
            console.log(newRaceStats);
            socket.broadcast.emit('updateRace', newRaceStats);
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
