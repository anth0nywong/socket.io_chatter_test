import io from ('./index.js');
import {createChat, createMessage, createUser} from './Factories';
import events from './Events';

const connectedUser = {};

export default function(socket){
    console.log("Socket Id" + socket.id);
    socket.on(events.VERIFY_USER, (nickname, callback : Function)=>
    {
        console.log(isUser(connectedUser, nickname));
        if(isUser(connectedUser, nickname))
        {
            callback({isUser:true, user:null})
        }
        else{
            callback({isUser: false, user:createUser({name : nickname})})
        }
    })
}
function addUser(userList, user){
    let newList = Object.assign({},userList);
    newList[user.name] = user
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

