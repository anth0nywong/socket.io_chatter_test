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

    componentDidMount(): void {
        const{socket} = this.props;
        socket?.emit(events.COMMUNITY_CHAT, this.resetChat)
    }
    resetChat(chat : string){
        return this.addChat(chat, true);
    }

    addChat = (chat : string, reset : boolean)=>{
        const{socket} = this.props;
        const {chats} = this.state;
        const newChats = reset? [chat]:[...chats, chat];
        this.setState({chats:newChats});

        const messageEvent = `${events.MESSAGE_RECEIVED}-${chat-id}`;
        const typingEvent = `${events.TYPING}-${chat-id}`;
        socket?.on(typingEvent);
        socket?.on(messageEvent);
    }

    sendMessage = (chatId:string, message:string)=>
    {
        const{socket} = this.props;
        socket?.emit(events.MESSAGE_SENT, {chatId, message})
    }

    sendTyping = (chatId : string, isTyping : any) =>{
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
                                    sendMessage={(message : string)=>{
                                        this.sendMessage(activeChat.id, message);
                                    }}
                                    sendTyping={(isTyping : any)=>{
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