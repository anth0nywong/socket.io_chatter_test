import express from "express";
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
const app = express();
import http from "http";
const server = http.createServer(app);
import { Server } from "socket.io";

const port =3000;
const io = new Server(server);

  server.listen(port, ()=>
  {
    console.log(`Server is running on port ${port}`);
  })

  app.get('/', (req, res)=>
  {
    res.sendFile(__dirname + '/public/index.html');
  })

  app.use(express.static(path.join(__dirname, './node_modules')));

  io.on('connection', (socket)=>
  {
    console.log('user connected');
    socket.emit('message', {manny: 'hey how are you?'});
    socket.on('another event', (data) =>
    {
        console.log(data);
    })
  })