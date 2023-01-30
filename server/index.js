"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const app_js_1 = __importDefault(require("./config/app.js"));
const socketManager_js_1 = __importDefault(require("./socketManager.js"));
const socket_io_1 = require("socket.io");
const server = http_1.default.createServer(app_js_1.default);
const port = normalizePort(process.env.PORT || '3231');
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
function onListening() {
    let addr = server.address();
    let bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    console.log('Listening on ' + bind);
}
io.on("connection", socketManager_js_1.default);
server.on('error', onError);
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    let bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;
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
exports.default = io;
//# sourceMappingURL=index.js.map