import UserModel from './user';

interface Message
{
    message:string
}

export default interface ChatData
{
    id:number,
    name:string,
    users:UserModel[],
    messages:Message[],
    typingUsers: UserModel
}