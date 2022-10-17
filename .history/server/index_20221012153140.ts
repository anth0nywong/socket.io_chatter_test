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

//use middleware to check username
io.use(async (socket, next)=>
{
  const username = socket.handshake.auth.username;
  if(!username)
  {
    return next(new Error("invalid username"));
  }
  (socket as any).username = username;
  next();
});
// Send client message to UserHandler for each user we have
io.on("connection", (socket) => {
  console.log("Server receives connection.");
  const users = [] as any;
  for (let [id, socket] of io.of("/").sockets) {
    users.push({
      userID: id,
      username: socket.username,
    });
  }
  console.log("emitting users.")
  socket.emit("users", users);
  // ...
});

// Send client message to notify new user is connected
io.on("connection", (socket) => {
  // notify existing users
  socket.broadcast.emit("user connected", {
    userID: socket.id,
    username: socket.username,
  });
});