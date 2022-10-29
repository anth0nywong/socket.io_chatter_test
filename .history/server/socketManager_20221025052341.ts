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
let privateChatUsers : string[][] = [];
let communtyChat : ChatModel = createChat();

export default function(socket){
    console.log("Socket Id" + socket.id);

    let sendMesssageToChatFromUser : Function;
    let sendTypingFromUser : Function;

    socket.on(events.VERIFY_USER, (nickname, callback)=>
    {
        console.log(isUser(connectedUsers, nickname));
        if(isUser(connectedUsers, nickname))
        {
            callback({isUser:true, user:null})
        }
        else{
            callback({isUser: false, user:createUser({name : nickname, socketId: socket.id})})
        }
    });

    socket.on(events.USER_CONNECTED, (user : any)=>
    {
        user.socketId = socket.id;
        connectedUsers = addUser(connectedUsers, user);
        socket.user = user;

        sendMesssageToChatFromUser = sendMessageToChat(user.name);
        sendTypingFromUser = sendTypingToChat((user.name));

        socket.emit(events.USER_CONNECTED, connectedUsers);
        console.log(connectedUsers);
    });

    socket.on('disconnect', ()=>{
        if("user" in socket){
            removePair(socket);
            connectedUsers = removeUser(connectedUsers, socket.user.name);
            socket.emit(events.USER_DISCONNECTED, connectedUsers);
            console.log("Disconnected");
            console.log(connectedUsers);
        }
    });

    socket.on(events.LOGOUT, ()=>{
        connectedUsers = removeUser(connectedUsers, socket.user.name);
        removePair(socket);
        socket.emit(events.USER_DISCONNECTED, connectedUsers);
        console.log("Disconnected");
        console.log(connectedUsers);
    });

    socket.on(events.COMMUNITY_CHAT, (callback)=>
    {
        callback(communtyChat);
    });

    socket.on(events.MESSAGE_SENT, ({chatId, message})=>{
        console.log("server: events.MESSAGE_SENT");
        sendMesssageToChatFromUser(chatId, message);
    });

    socket.on(events.TYPING, ({chatId, isTyping})=>{
        sendTypingFromUser(chatId, isTyping);
    });
    //send message
    socket.on(events.PRIVATE_MESSAGE, ({receiver, sender})=>{
        if(receiver == sender)return false;
        console.log(receiver, sender);
        //Search for receiver in list
        if(receiver in connectedUsers)
        {
            //Create a new chat
            const newChat = createChat({name:`${receiver}&${sender}`, users:[connectedUsers[receiver], connectedUsers[sender]]});
            //get receiver object and its socket ids
            const receiverSocket = connectedUsers[receiver].socketId;
            if(privateChatUsers[sender])
            {
                console.log(privateChatUsers[sender]);
                if(privateChatUsers[sender].includes(receiver))
                return false;
            }
            //Create Empty array for users paired with sender
            if(!privateChatUsers[sender]){ privateChatUsers[sender] = []};
            //Create Empty array for users paired with receiver
            if(!privateChatUsers[receiver]){ privateChatUsers[receiver] = []};
            
            privateChatUsers[sender].push(receiver);

            if(!privateChatUsers[receiver].includes(sender))privateChatUsers[receiver].push(sender);
            console.log("User Pairs");
            console.log(privateChatUsers);
            //Send to receiver socket
            socket.to(receiverSocket).emit(events.PRIVATE_MESSAGE, newChat);
            //Send to sender socket
            socket.emit(events.PRIVATE_MESSAGE, newChat);
        }
    });
    function removePair(socket){
        if(privateChatUsers[socket.user.name])
            {
                privateChatUsers[socket.user.name].forEach((pairedUsers)=>{
                    privateChatUsers[pairedUsers] = privateChatUsers[pairedUsers].filter((x)=>{
                        if(x == socket.user.name) return false;
                        return true;
                    });
                });
                privateChatUsers[socket.user.name] = [];
            }
        const x : any = `${events.USER_DISCONNECTED}`;
        io.emit(x, {userName: socket.user.name}); 
    }
    function sendTypingToChat(user){
        return (chatId, isTyping)=>{
            const x : any = `${events.TYPING}-${chatId}`;
            io.emit(x, {user, isTyping});
        }
    }
    function sendMessageToChat(sender){
        return (chatId, message)=>{
            const x : any = `${events.MESSAGE_RECEIVED}-${chatId}`;
            io.emit(x, createMessage({message, sender}));
            
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



