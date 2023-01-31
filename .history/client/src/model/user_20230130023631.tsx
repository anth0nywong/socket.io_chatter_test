export default interface IUserData
{
    id:number,
    name: string,
    scoketId:string
}

export interface UserListInterface{
    [key: string]: IUserData
}