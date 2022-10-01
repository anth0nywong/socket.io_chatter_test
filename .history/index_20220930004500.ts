import app from "express";
import http from "http";
const server = http.createServer(app);
import { Server } from "socket.io";

const port =3000;
const io = new Server(server);

  server.listen(port, ()=>
  {
    console.log(`Server is running on port ${port}`);
  })
