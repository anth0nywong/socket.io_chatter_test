import {uuid} from 'uuidv4';

const createUser = ({name=""} = {})=>(
{
    id:uuid(),
    name
});

const createMessage = ({message="", sender=""} = {sender : "hello"}) =>({
    id:uuid(),
    time: new Date(Date.now()),
    message,
    sender
});