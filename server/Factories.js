"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTime = exports.createChat = exports.createMessage = exports.createUser = void 0;
const uuid_1 = require("uuid");
const createUser = ({ name = "" } = {}) => ({
    id: (0, uuid_1.v4)(),
    name
});
exports.createUser = createUser;
const createMessage = ({ message = "", sender = "" } = { sender: "hello" }) => ({
    id: (0, uuid_1.v4)(),
    time: (0, exports.getTime)(new Date(Date.now())),
    message,
    sender
});
exports.createMessage = createMessage;
const createChat = ({ messages = [], name = "Community", users = [] } = {}) => ({
    id: (0, uuid_1.v4)(),
    name,
    messages,
    users,
    typingUsers: []
});
exports.createChat = createChat;
const getTime = (date) => {
    return `${date.getHours()}:${("0" + date.getMinutes()).slice(-2)}$`;
};
exports.getTime = getTime;
//# sourceMappingURL=Factories.js.map