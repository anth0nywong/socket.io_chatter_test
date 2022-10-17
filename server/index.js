"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const socketManager_js_1 = __importDefault(require("./socketManager.js"));
const socket_io_1 = require("socket.io");
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
io.on("connection", socketManager_js_1.default);
exports.default = io;
//# sourceMappingURL=index.js.map