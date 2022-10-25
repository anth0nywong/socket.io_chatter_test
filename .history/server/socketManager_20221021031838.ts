import io from './index';
import {createChat, createMessage, createUser} from './Factories';
import events from './Events';

interface MessageModel
{
    id:string,
    message:string,
    sender: string,
    time: string,
}
interface UserModel
{
    id:number,
    name: string
}
interface ChatModel
{
    id:string,
    name:string,
    users:UserModel[],
    messages:MessageModel[],
    typingUsers: UserModel[]
}

let connectedUsers = {};
let communtyChat : ChatModel = createChat();

export default function(socket){
    console.log("Socket Id" + socket.id);

    let sendMesssageToChatFromUser;

    socket.on(events.VERIFY_USER, (nickname, callback)=>
    {
        console.log(isUser(connectedUsers, nickname));
        if(isUser(connectedUsers, nickname))
        {
            callback({isUser:true, user:null})
        }
        else{
            callback({isUser: false, user:createUser({name : nickname})})
        }
    });

    socket.on(events.USER_CONNECTED, (user : any)=>
    {
        connectedUsers = addUser(connectedUsers, user);
        socket.user = user;
        sendMesssageToChatFromUser = sendMessageToChat(user.name);
        socket.emit(events.USER_CONNECTED, connectedUsers);
        console.log(connectedUsers);
    });

    socket.on('disconnect', ()=>{
        if("user" in socket){
            connectedUsers = removeUser(connectedUsers, socket.user.name);
            socket.emit(events.USER_DISCONNECTED, connectedUsers);
            console.log("Disconnected");
            console.log(connectedUsers);
        }
    });

    socket.on(events.LOGOUT, ()=>{
        connectedUsers = removeUser(connectedUsers, socket.user.name);
        socket.emit(events.USER_DISCONNECTED, connectedUsers);
        console.log("Disconnected");
        console.log(connectedUsers);
    });
    socket.on(events.COMMUNITY_CHAT, (callback)=>
    {
        callback(communtyChat);
    })
    socket.on(events.MESSAGE_RECEIVED, {message, sender})
    function sendMessageToChat(sender){
        return (chatId, message)=>{
            socket.emit(`${events.MESSAGE_RECEIVED}-${chatId}`, createMessage({message, sender}));
        }
    }
}

function addUser(userList, user){
    let newList = Object.assign({},userList);
    
    newList[user.name] = user;
    return newList;
}
function removeUser(userList, username){
    let newList = Object.assign({},userList)
    
    delete newList[username];
    return newList;
}

function isUser(userList, username)
{
    return username in userList;
}



