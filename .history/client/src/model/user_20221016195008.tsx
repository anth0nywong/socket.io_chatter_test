export default interface IUserData
{
    userID: string,
    hasNewMessage: boolean,
    self: boolean,
    username: string,
    connected: boolean,
    messages: string[],
}