import express from "express";
import path from 'path';
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
  });

  app.get('/javascript', (req, res)=>
  {
    res.sendFile(__dirname + '/public/javascript.html');
  });

  app.get('/swift', (req, res)=>
  {
    res.sendFile(__dirname + '/public/swift.html');
  });

  app.get('/css', (req, res)=>
  {
    res.sendFile(__dirname + '/public/css.html');
  });

  app.use(express.static(path.join(__dirname, './node_modules')));
  app.use(express.static(path.join(__dirname, './public')));

  //tech nameespace
  const tech = io.of('/tech');

  tech.on('connection', (socket)=>
  {
    socket.on('join', (data)=>
    {
      socket.join(data.room);
      tech.in(data.room).emit('message', `New user joined ${data.room} room!`)
    });
    
    socket.on('message', (data)=>
    {
      console.log('message:' + data.msg);
      tech.in(data.room).emit('message', data.msg);
    });
    socket.on('disconnect', ()=>
    {
      console.log('user disconnected');
      tech.emit('message', 'user disconnected');
    })
  });