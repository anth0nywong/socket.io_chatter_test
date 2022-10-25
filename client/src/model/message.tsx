import UserModel from './user';

export default interface MessageData
{
    id:string,
    message:string,
    sender: string,
    time: string,
}