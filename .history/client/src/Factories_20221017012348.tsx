import uuidv4 from 'uuidv4';

const createUser = ({name:""} = {})=>(
{
    id:uuidv4(),
    name
})

const createMessage = ({message : "", sender : ""} = {} as object) =>({
    id:uuidv4(),
    time: new Date(Date.now()),
    message,
    sender
})