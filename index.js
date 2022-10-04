"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
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
const io = new socket_io_1.Server(server);
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});
app.get('/javascript', (req, res) => {
    res.sendFile(__dirname + '/public/javascript.html');
});
app.get('/swift', (req, res) => {
    res.sendFile(__dirname + '/public/swift.html');
});
app.get('/css', (req, res) => {
    res.sendFile(__dirname + '/public/css.html');
});
app.use(express_1.default.static(path_1.default.join(__dirname, './node_modules')));
app.use(express_1.default.static(path_1.default.join(__dirname, './public')));
const tech = io.of('/tech');
tech.on('connection', (socket) => {
    socket.on('join', (data) => {
        socket.join(data.room);
        tech.in(data.room).emit('message', `New user joined ${data.room} room!`);
    });
    socket.on('message', (data) => {
        console.log('message:' + data.msg);
        tech.in(data.room).emit('message', data.msg);
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
        tech.emit('message', 'user disconnected');
    });
});
//# sourceMappingURL=index.js.map