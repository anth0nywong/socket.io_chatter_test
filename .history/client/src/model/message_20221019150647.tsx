import UserModel from './user';
export default interface MessageData
{
    name:string
    users:[UserModel],
    messages:[]
    
}