import UserModel from './user';
import MessageModel from './message';
interface MessageData
{
    message:string
}

export default interface ChatData
{
    id:string,
    name:string,
    users:UserModel[],
    messages:MessageModel[],
    typingUsers: UserModel[]
}