
import { v4 as uuidv4 } from 'uuid';

interface UserModel
{
    id:number,
    name: string
}
interface ChatData
{
    id:string,
    name:string,
    users:UserModel[],
    messages:MessageModel[],
    typingUsers: UserModel[]
}

export const createUser = ({name=""} = {})=>(
{
    id:uuidv4(),
    name
});

export const createMessage = ({message="", sender=""} = {sender : "hello"}) =>({
    id:uuidv4(),
    time: getTime(new Date(Date.now())),
    message,
    sender
});

export const createChat : any= ({messages=[], name="Community", users=[]} = {})=>({
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


