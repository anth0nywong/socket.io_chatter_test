import React, {Component} from 'react';
import SideBar from './SideBar';
import { Socket } from 'socket.io-client';
import UserModel from '../../model/user';
import events from '../../Events';

export default class ChatContainer extends Component<{socket: Socket | null, user:UserModel| null, logout:Function},{chats: any, activeChat: any | null, name:any}>{
    
    constructor(props : any)
    {
        super(props);
        this.state=
        {
        chats:[],
        activeChat: null,
        name: null
        }
    }

    setActiveChat = (activeChat : any)=>{
        this.setState({activeChat: activeChat})
    }
    sendMessage = (chatId:string, message:string)=>
    {
        const{socket} = this.props;
        socket?.emit(events.MESSAGE_SENT, {chatId, message})
    }

    sendTyping = (chatId : any, isTyping : any) =>{
        const {socket} = this.props;
        socket?.emit(events.TYPING, {chatId, isTyping});
    }
    render(){
        const {user, logout} = this.props;
        const {chats, activeChat, name} = this.state;
        return(
            <div className="container">
                <SideBar
                    name={name}
                    logout={logout}
                    chats={chats}
                    user={user}
                    activeChat={activeChat}
                    setActiveChat={this.setActiveChat}/>
                <div className="chat-room-container">
                    {
                        activeChat !== null?(
                            <div className="chat-room">
                                <ChatHeading name={activeChat.name}/>
                                <Messages
                                    messages={activeChat.messages}
                                    user={user}
                                    typingUser={activeChat.typingUsers}
                                    />
                                <MessageInput
                                    sendMessage={(message)=>{
                                        this.sendMessage(activeChat.id, message);
                                    }}
                                    sendTyping={(isTyping)=>{
                                        this.sendTyping(activeChat.id, isTyping);
                                    }}
                                    />
                            </div>
                        ):()
                    }
                </div>
            </div>
        )
    }
}