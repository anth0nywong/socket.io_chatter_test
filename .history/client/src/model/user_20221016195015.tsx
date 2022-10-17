export default interface IUserData
{
    userID: string,
    hasNewMessages: boolean,
    self: boolean,
    username: string,
    connected: boolean,
    messages: string[],
}