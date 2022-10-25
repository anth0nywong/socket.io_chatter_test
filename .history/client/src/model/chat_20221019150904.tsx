import UserModel from './user';
export default interface ChatData
{
    id:string,
    name:string
    users:UserModel[],
    messages:string[]
}