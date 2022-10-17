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

const getTime = (date : Date)=>
{
    return `${date.getHours()}:${("0"+date.getMinutes()).slice(-2)}$`;
}