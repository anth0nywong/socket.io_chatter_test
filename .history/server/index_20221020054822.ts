import http from "http";
import express from "express";
const app = express();
const server = http.createServer(app);
import path from 'path';
import SocketManager from './socketManager.js';
//import Server function from socket.io
import { Server } from "socket.io";
//Port management
const port = normalizePort(process.env.PORT || '3231');
function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}
//Type Definition for socket.io server
interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
}

interface ClientToServerEvents {
  hello: () => void;
}

interface InterServerEvents {
  ping: () => void;
}

interface SocketData {
  name: string;
  age: number;
}
//Create Socket Server based on express server
const io = new Server<ClientToServerEvents,ServerToClientEvents,InterServerEvents,SocketData>(server, 
  {
    cors: {
      origin: "http://localhost:8080",
    },
  });
//Listen to port
server.listen(port, ()=>
{
  console.log(`Server is running on port ${port}`);
});
//Establish socket functions
io.on("connection", SocketManager);
  
export default io;