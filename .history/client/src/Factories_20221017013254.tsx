import uuidv4 from 'uuidv4';

const createUser = ({name:""} = {})=>(
{
    id:uuidv4(),
    name
})

var x = 
const createMessage = ({} = {message:"", sender : ""}) =>({
    id:uuidv4(),
    time: new Date(Date.now()),
    message,
    sender
})