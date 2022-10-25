import React, {Component} from 'react';
import SideBar from './SideBar';
import { Socket } from 'socket.io-client';
import events from '../../Events';
import Messages from '../messages/Messages';
import ChatHeading from './ChatHeading';
import MessageInput from '../messages/MessageInput';
import ChatData from '../../model/chat';

export default class ChatContainer extends Component<{socket: Socket | null, user:{id:number, name:string} | null, logout:Function},{chats: ChatData[], activeChat: any | null}>{
    
    constructor(props : any)
    {
        super(props);
        this.state=
        {
        chats:[],
        activeChat: null
        }
    }

    setActiveChat = (activeChat : any)=>{
        this.setState({activeChat: activeChat})
    }

    componentDidMount(): void {
        const{socket} = this.props;
        socket?.emit(events.COMMUNITY_CHAT, this.resetChat)
    }
    resetChat(chat : ChatData){
        return this.addChat(chat, true);
    }

    addChat = (chat : ChatData, reset : boolean)=>{
        const{socket} = this.props;
        const {chats} = this.state;
        const newChats = reset? [chat]:[...chats, chat];
        this.setState({chats:newChats});

        const messageEvent = `${events.MESSAGE_RECEIVED}-${chat.id}`;
        const typingEvent = `${events.TYPING}-${chat.id}`;
        //socket?.on(typingEvent);
        socket?.on(messageEvent, this.addMessageToChat(chat.id));
    }

    addMessageToChat = (chatId : number)=>
    {
        return (message : any) =>{
            const {chats} = this.state;
            let newChats = chats.map((chat : any)=>{
                if(chat.id === chatId)
                chat.messages.push(message);
                return chat;
            })
            this.setState({chats:newChats});
        }
    }

    updateTypingChat = (chatId : number) =>{}

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
        const {chats, activeChat} = this.state;
        return(
            <div className="container">
                <SideBar
                    logout={logout}
                    chats={chats}
                    user={user}
                    activeChat={activeChat}
                    setActiveChat={this.setActiveChat}/>
                <div className="chat-room-container">
                    {
                        activeChat !== null ?(
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
                        ):
                        <div className="chat-room">
                            <h3>Choose a chat!</h3>
                        </div>
                    }
                </div>
            </div>
        )
    }
}