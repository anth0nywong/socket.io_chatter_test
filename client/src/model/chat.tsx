import UserModel from './user';
import MessageModel from './message';


export default interface ChatData
{
    id:string,
    name:string,
    users:UserModel[],
    messages:MessageModel[],
    typingUsers: UserModel[]
}