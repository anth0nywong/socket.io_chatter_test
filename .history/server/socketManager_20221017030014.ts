import io from ('./index.js');
import {createChat, createMessage, createUser} from './Factories';
import events from './Events';

const connectedUser = {};

export default function(socket){
    console.log("Socket Id" + socket.id);
    socket.on(events.VERIFY_USER, (nickname, callback)=>
    {
        if(isUser)
        {
            callback({isUser:true, user:null})
        }
        else{
            callback({isUser: false, user:createUser()})
        }
    })
}

function isUser(userList, username)
{
    return username in userList;
}

