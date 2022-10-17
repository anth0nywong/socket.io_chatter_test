import {uuid} from 'uuidv4';

const createUser = ({name=""} = {})=>(
{
    id:uuid(),
    name
});

const createMessage = ({message="", sender=""} = {sender : "hello"}) =>({
    id:uuid(),
    time: getTime(new Date(Date.now())),
    message,
    sender
});
const createChat = ({messages=[], name="Community", users=[]} = {})=>({
    id:uuid(),
    name,
    messages,
    users,
    typingUsers:[]
});
const getTime = (date : Date)=>
{
    return `${date.getHours()}:${("0"+date.getMinutes()).slice(-2)}$`;
}

export createUser, createMessage, createChat;

