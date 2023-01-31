import React, {useEffect, useState} from 'react';
import io, { Socket } from 'socket.io-client';
import events from '../Events';
import LoginForm from './LoginForm';
import ChatContainer from './chats/ChatContainer';
import UserModel from '../model/user';
const socketUrl = "https://socket_server.anthonyhhwong.link/";

const Layout : React.FC< {}> = () =>
{
    
    useEffect(()=>{
        initSocket();
    },[])
    
    const [socket, setSocket] = useState<Socket | null>(null);
    const [user, setThisUesr] = useState<UserModel | null>(null);


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

    
    return(
    <div className="container">
        {socket && user && <ChatContainer socket={socket} user={user} logout={logout}/> || <LoginForm socket={socket} setUser={setUser}/>}
    </div>);
}

export default Layout;