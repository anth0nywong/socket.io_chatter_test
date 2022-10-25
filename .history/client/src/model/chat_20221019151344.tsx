import UserModel from './user';
export default interface ChatData
{
    id:number,
    name:string,
    users:UserModel[],
    messages:string[]
}