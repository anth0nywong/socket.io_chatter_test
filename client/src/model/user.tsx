export default interface IUserData
{
    id:number,
    name: string,
    scoketId:string
}

export interface UserListInterface{
    userList:{[key: string]: IUserData}
}