import uuidv4 from 'uuidv4';

const createUser = ({name:""} = {})=>(
{
    id:uuidv4(),
    name
})

var x = {message : "", sender : ""};
const createMessage = ( x = {} ) =>({
    id:uuidv4(),
    time: new Date(Date.now()),
    message,
    sender
})