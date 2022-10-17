import uuidv4 from 'uuidv4';

const createUser = ({name=""} = {})=>(
{
    id:uuidv4(),
    name
});

const createMessage = ({message="", sender=""} = {sender : "hello"}) =>({
    id:uuidv4(),
    time: new Date(Date.now()),
    message,
    sender
});