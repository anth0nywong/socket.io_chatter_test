import http from "http";
import app from "./config/app.js";

import path from 'path';
import SocketManager from './socketManager.js';
//import Server function from socket.io
import { Server } from "socket.io";
import { AddressInfo } from 'net';


const server = http.createServer(app);

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
server.on('error', onError);
server.on('listening', onListening);

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  let bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  let addr = server.address() as string | AddressInfo;
  let bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  console.log('Listening on ' + bind);
}
//Establish socket functions
io.on("connection", SocketManager);



export default io;