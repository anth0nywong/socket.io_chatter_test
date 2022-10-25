import React, {Component} from 'react';
import io, { Socket } from 'socket.io-client';
import events from '../Events';
import LoginForm from './LoginForm';
import ChatContainer from './chats/ChatContainer';
import UserModel from '../model/user';
const socketUrl = "http://192.168.2.37:3231";

export default class Layout extends Component<{}, {socket: Socket | null, user: {id:number, name:string} | null}> 
{
    
    constructor(props : any)
    {
        super(props);

        this.state = {
            socket: null,
            user: null
        };
    }

    componentWillMount()
    {
        this.initSocket();
    }

    initSocket = ()=>
    {
        const socket : Socket = io(socketUrl);
        socket.on('connect', ()=>{
            console.log("connected");
        })
        this.setState({socket}); 
    }
    setUser = (user : any)=>
    {
        const {socket}  = this.state;
        if(socket)socket.emit(events.USER_CONNECTED, user);
        this.setState({user})
    }

    logout = ()=>{
        const {socket} = this.state;
        socket?.emit(events.LOGOUT);
        this.setState({user:null})
    }

    
    render()
    {
        const {socket:socket, user:user} : any= this.state;
        return(
        <div className="container">
            {!user?
            <LoginForm socket={socket} setUser={this.setUser}/>
            :
            <ChatContainer socket={socket} user={user} logout={this.logout}></ChatContainer>}
        </div>);
    }
    
}
