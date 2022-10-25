import UserModel from './user';

interface Message
{
    message:string
}

export default interface ChatData
{
    id:string,
    name:string,
    users:UserModel[],
    messages:Message[],
    typingUsers: []
}