
import { v4 as uuidv4 } from 'uuid';

export const createUser = ({name="", socketId = null} = {})=>(
{
    id:uuidv4(),
    name,
    socketId
});

export const createMessage = ({message="", sender=""} = {}) =>({
    id:uuidv4(),
    time: getTime(new Date(Date.now())),
    message,
    sender
});
interface ChatInterface{
    messages:string[] | undefined,
    name: string,
    users: any[]
}

export const createChat = ({messages = [], name="Community", users=[]}  = {} as any)=>({
    id:uuidv4(),
    name,
    messages,
    users,
    typingUsers:[]
});

export const getTime = (date : Date)=>
{
    return `${date.getHours()}:${("0"+date.getMinutes()).slice(-2)}$`;
}


