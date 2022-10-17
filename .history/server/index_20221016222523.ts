import http from "http";
const app = express();
const server = http.createServer(app);
import express from "express";
import path from 'path';
import SocketManager from './socketManager';

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

//Create Socket Server
const io = new Server(server, 
  {
    cors: {
      origin: "http://localhost:8080",
    },
  });

server.listen(port, ()=>
{
  console.log(`Server is running on port ${port}`);
})


io.on("connection", SocketManager);
  