import UserModel from './user';
export default interface ChatData
{
    name:string
    users:UserModel[],
    messages:string[]
}