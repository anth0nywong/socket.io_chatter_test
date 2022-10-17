import {v4} from 'uuidv4';

export const createUser = ({name=""} = {})=>(
{
    id:uuid(),
    name
});

export const createMessage = ({message="", sender=""} = {sender : "hello"}) =>({
    id:v4(),
    time: getTime(new Date(Date.now())),
    message,
    sender
});
export const createChat = ({messages=[], name="Community", users=[]} = {})=>({
    id:v4(),
    name,
    messages,
    users,
    typingUsers:[]
});
export const getTime = (date : Date)=>
{
    return `${date.getHours()}:${("0"+date.getMinutes()).slice(-2)}$`;
}


