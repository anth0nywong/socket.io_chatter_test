import React, {Component} from 'react';
import SideBar from './SideBar';
import { Socket } from 'socket.io-client';
import events from '../../Events';
import Messages from '../messages/Messages';
import ChatHeading from './ChatHeading';
import MessageInput from '../messages/MessageInput';
//Import Data Model
import ChatModel from '../../model/chat';
import UserModel from '../../model/user';

export default class ChatContainer extends Component<{socket: Socket, user: UserModel, logout:Function},{chats: ChatModel[], activeChat: ChatModel | null, listeners: string[]}>{
    
    constructor(props : any)
    {
        super(props);
        this.state=
        {
        chats:[],
        activeChat: null
        }
    }

    componentDidMount(){
        console.log("Mount");
        const{socket} = this.props;
        socket?.emit(events.COMMUNITY_CHAT, this.resetChat);
    }
    componentWillUnmount(){
        console.log("unmount");
        const {socket} = this.props;
        const {listeners} = this.state;
        listeners.map((listener)=>{
            console.log("unmount - 1");
            socket.removeListener(listener)});
    }
    setActiveChat = (activeChat : ChatModel)=>{
        this.setState({activeChat});
    }
    
    resetChat = (chat : ChatModel) => {
        console.log("trying to reset");
        return this.addChat(chat, true);
    }

    addChat = (chat : ChatModel, reset : boolean) => {
        console.log("Add Chat");
        const{socket} = this.props;
        const {chats, listeners} = this.state;
        
        const newChats = reset? [chat]:[...chats, chat];
        this.setState({chats:newChats});

        const messageEvent = `${events.MESSAGE_RECEIVED}-${chat.id}`;
        
        const typingEvent = `${events.TYPING}-${chat.id}`;
        //socket?.on(typingEvent);
        if(!listeners.includes(messageEvent))
        {
            console.log(listeners);
            console.log(`${messageEvent} listener is set up`);
            socket.on(messageEvent, this.addMessageToChat(chat.id));
            let newListeners: string[] = [];
            listeners.map((listener : any)=>{
                newListeners.push(listener);
            });
            newListeners.push(messageEvent);
            this.setState({listeners:newListeners});
        }
    }

    addMessageToChat = (chatId : string)=>
    {
        return (message : any) => {
            console.log(chatId);
            const {chats} = this.state;
            let newChats = chats.map((chat : any)=>{
                if(chat.id === chatId)
                chat.messages.push(message);
                return chat;
            });
            console.log("messages pushed");
            console.log(chats);
            this.setState({chats:newChats});
        }
    }

    updateTypingChat = (chatId : string) =>{
        return ({isTyping, user} : any)=>{
			if(user !== this.props.user.name){

				const { chats } = this.state

				let newChats = chats.map((chat)=>{
					if(chat.id === chatId){
						if(isTyping && ! chat.typingUsers.includes(user)){
							chat.typingUsers.push(user)
						}else if(!isTyping && chat.typingUsers.includes(user)){
							chat.typingUsers = chat.typingUsers.filter(u => u !== user)
						}
					}
					return chat
				})
				this.setState({chats:newChats})
			}
		}
    }

    sendMessage = (chatId:string, message:string)=>
    { 
        console.log("from client: message_sent emitted.");
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
                                <ChatHeading name={activeChat.name} />
                                <Messages
                                    messages={activeChat.messages}
                                    user={user}
                                    typingUsers={activeChat.typingUsers}
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