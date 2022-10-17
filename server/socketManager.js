"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Factories_1 = require("./Factories");
const Events_1 = __importDefault(require("./Events"));
let connectedUsers = {};
function default_1(socket) {
    console.log("Socket Id" + socket.id);
    socket.on(Events_1.default.VERIFY_USER, (nickname, callback) => {
        console.log(isUser(connectedUsers, nickname));
        if (isUser(connectedUsers, nickname)) {
            callback({ isUser: true, user: null });
        }
        else {
            callback({ isUser: false, user: (0, Factories_1.createUser)({ name: nickname }) });
        }
    });
    socket.on(Events_1.default.USER_CONNECTED, (user) => {
        connectedUsers = addUser(connectedUsers, user);
        socket.user = user;
        socket.emit(Events_1.default.USER_CONNECTED, connectedUsers);
        console.log(connectedUsers);
    });
}
exports.default = default_1;
function addUser(userList, user) {
    let newList = Object.assign({}, userList);
    newList[user.name] = user;
    return newList;
}
function removeUser(userList, username) {
    let newList = Object.assign({}, userList);
    delete newList[username];
    return newList;
}
function isUser(userList, username) {
    return username in userList;
}
//# sourceMappingURL=socketManager.js.map