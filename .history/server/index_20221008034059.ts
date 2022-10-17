import express from "express";
import path from 'path';
const app = express();
import http from "http";
const server = http.createServer(app);
import { Server } from "socket.io";
//Port management
const port = normalizePort(process.env.PORT || '3000');
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

  app.get('/', (req, res)=>
  {
    res.sendFile(path.join(__dirname, '../public/index.html'));
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
    res.sendFile('/public/css.html');
  });

  app.use(express.static(path.join(__dirname, '../node_modules')));
  app.use(express.static(path.join(__dirname, '../public')));

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