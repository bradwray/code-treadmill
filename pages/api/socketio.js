import { Server } from "socket.io";

let raceStats = {};
let raceKeys = [];

const ioHandler = (req, res) => {
  if (!res.socket.server.io) {
    console.log("*First use, starting socket.io");
    const io = new Server(res.socket.server);

    io.on("connection", (socket) => {
      socket.broadcast.emit("a user connected");

      socket.on("newRace", (raceKey) => {
        //think about what to do here
      });

      socket.on("newResult", (newResult) => {
        raceStats[newResult.name] = newResult;
        console.log(raceStats);
        socket.broadcast.emit("updateRace", raceStats);
      });
    });

    res.socket.server.io = io;
  } else {
    console.log("socket.io already running");
  }
  res.end();
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default ioHandler;
