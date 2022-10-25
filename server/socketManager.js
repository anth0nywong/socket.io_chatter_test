"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./index"));
const Factories_1 = require("./Factories");
const Events_1 = __importDefault(require("./Events"));
let connectedUsers = {};
let communtyChat = (0, Factories_1.createChat)();
function default_1(socket) {
    console.log("Socket Id" + socket.id);
    let sendMesssageToChatFromUser;
    let sendTypingFromUser;
    socket.on(Events_1.default.VERIFY_USER, (nickname, callback) => {
        console.log(isUser(connectedUsers, nickname));
        if (isUser(connectedUsers, nickname)) {
            callback({ isUser: true, user: null });
        }
        else {
            callback({ isUser: false, user: (0, Factories_1.createUser)({ name: nickname, socketId: socket.id }) });
        }
    });
    socket.on(Events_1.default.USER_CONNECTED, (user) => {
        user.socketId = socket.id;
        connectedUsers = addUser(connectedUsers, user);
        socket.user = user;
        sendMesssageToChatFromUser = sendMessageToChat(user.name);
        sendTypingFromUser = sendTypingToChat((user.name));
        socket.emit(Events_1.default.USER_CONNECTED, connectedUsers);
        console.log(connectedUsers);
    });
    socket.on('disconnect', () => {
        if ("user" in socket) {
            connectedUsers = removeUser(connectedUsers, socket.user.name);
            socket.emit(Events_1.default.USER_DISCONNECTED, connectedUsers);
            console.log("Disconnected");
            console.log(connectedUsers);
        }
    });
    socket.on(Events_1.default.LOGOUT, () => {
        connectedUsers = removeUser(connectedUsers, socket.user.name);
        socket.emit(Events_1.default.USER_DISCONNECTED, connectedUsers);
        console.log("Disconnected");
        console.log(connectedUsers);
    });
    socket.on(Events_1.default.COMMUNITY_CHAT, (callback) => {
        callback(communtyChat);
    });
    socket.on(Events_1.default.MESSAGE_SENT, ({ chatId, message }) => {
        console.log("server: events.MESSAGE_SENT");
        sendMesssageToChatFromUser(chatId, message);
    });
    socket.on(Events_1.default.TYPING, ({ chatId, isTyping }) => {
        sendTypingFromUser(chatId, isTyping);
    });
    socket.on(Events_1.default.PRIVATE_MESSAGE, ({ receiver, sender }) => {
        console.log(receiver, sender);
        if (receiver in connectedUsers) {
            const newChat = (0, Factories_1.createChat)({ name: `${receiver}&${sender}`, users: [connectedUsers[receiver], connectedUsers[sender]] });
            const receiverSocket = connectedUsers[receiver].socketId;
            console.log("break");
            socket.to(receiverSocket).emit(Events_1.default.PRIVATE_MESSAGE, newChat);
            console.log("sent");
            socket.emit(Events_1.default.PRIVATE_MESSAGE, newChat);
        }
    });
    function sendTypingToChat(user) {
        return (chatId, isTyping) => {
            const x = `${Events_1.default.TYPING}-${chatId}`;
            index_1.default.emit(x, { user, isTyping });
        };
    }
    function sendMessageToChat(sender) {
        return (chatId, message) => {
            const x = `${Events_1.default.MESSAGE_RECEIVED}-${chatId}`;
            index_1.default.emit(x, (0, Factories_1.createMessage)({ message, sender }));
        };
    }
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