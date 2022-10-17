import uuidv4 from 'uuidv4';

const createUser = ({name:""} = {})=>(
{
    id:uuidv4(),
    name
})