"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const http_1 = __importDefault(require("http"));
const server = http_1.default.createServer(app);
const socket_io_1 = require("socket.io");
const port = normalizePort(process.env.PORT || '3000');
function normalizePort(val) {
    var port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
}
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "http://localhost:8080",
    },
});
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
io.use(async (socket, next) => {
    const username = socket.handshake.auth.username;
    if (!username) {
        return next(new Error("invalid username"));
    }
    socket.username = username;
    next();
});
io.on("connection", (socket) => {
    console.log("-------connected------");
    const users = [];
    for (let [id, socket] of io.of("/").sockets) {
        users.push({
            userID: id,
            username: socket.username,
        });
        console.log("users:");
        console.log(users);
    }
    socket.emit("users", users);
    console.log("emit user connected");
    socket.broadcast.emit("user connected", {
        userID: socket.id,
        username: socket.username,
        connected: true
    });
    socket.on("disconnect", () => {
        console.log("-------Disconnected------");
        socket.broadcast.emit("user disconnected", socket.id);
    });
    socket.on("private message", ({ content, to }) => {
        socket.to(to).emit("private message", {
            content,
            from: socket.id,
        });
    });
});
//# sourceMappingURL=index.js.map