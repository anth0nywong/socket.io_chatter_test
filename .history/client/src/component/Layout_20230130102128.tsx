import React, {useEffect, useState} from 'react';
import io, { Socket } from 'socket.io-client';
import events from '../Events';
import LoginForm from './LoginForm';
import ChatContainer from './chats/ChatContainer';
import UserModel from '../model/user';
const socketUrl = "https://socket_server.anthonyhhwong.link/";

const Layout : React.FC< {socket: Socket | null, user: {id:number, name:string} | null}> = () =>
{
    
    useEffect(()=>{
        initSocket();
    },[])
    
    const [socket, setSocket] = useState<Socket | null>(null);
    const [user, setThisUesr] = useState<{id:number, name:string} | null>(null);


    const initSocket = ()=>
    {
        const socket : Socket = io(socketUrl);
        socket.on('connect', ()=>{
            console.log("connected");
        })
        setSocket(socket); 
    }
    
    const setUser = (user : any)=>
    {
        if(socket)socket.emit(events.USER_CONNECTED, user);
        setThisUesr(user);
    }

    const logout = ()=>{
        socket?.emit(events.LOGOUT);
        setThisUesr(null);
    }

    
    render()
    {
        const {socket:socket, user:user} : any = this.state;
        return(
        <div className="container">
            {user && <ChatContainer socket={socket} user={user} logout={this.logout}/> || <LoginForm socket={socket} setUser={this.setUser}/>}
        </div>);
    }
    
}

export default Layout;