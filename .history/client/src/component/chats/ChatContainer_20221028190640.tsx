import React, {Component, useEffect, useState} from 'react';
import SideBar from './SideBar';
import { Socket } from 'socket.io-client';
import events from '../../Events';
import Messages from '../messages/Messages';
import ChatHeading from './ChatHeading';
import MessageInput from '../messages/MessageInput';
//Import Data Model
import ChatModel from '../../model/chat';
import UserModel from '../../model/user';

const ChatContainer : React.FC<{socket: Socket, user: UserModel, logout:Function}> = ({socket, user, logout}) => {
    
    const  [chatModel, setChatModel] = useState([]);
    const  [activeChat , setActiveChat]  = useState(null);
   
    useEffect(()=>{
        initSocket(socket);
    }, []);
    
    function initSocket(socket: Socket){
        socket.emit(events.COMMUNITY_CHAT, resetChat);
        socket.on(events.PRIVATE_MESSAGE, addChat);
        socket.on(events.USER_DISCONNECTED, removeChat);
        //If someone reconnect, reset chat
        socket.on('connect', ()=>{
            socket.emit(events.COMMUNITY_CHAT, resetChat);
        });
    }

    sendOpenPrivateMessage = (receiver : UserModel) => {
        const {socket, user} = this.props;
        const {activeChat} = this.state;
        socket.emit(events.PRIVATE_MESSAGE, {receiver, sender: user.name, activeChat});
    }

    const setActiveChatFunction = (activeChat : ChatModel)=>{
        setActiveChat({activeChat});
    }
    
    resetChat = (chat : ChatModel) => {
        return this.addChat(chat, true);
    }

    removeChat = (user : any) =>{
        const {chats} = this.state;
        let newChats : ChatModel[] =[...chats];
        newChats = newChats.filter((x)=>{
            let names : string[] = x.name.split('&');
            console.log(typeof(names[0]));
            console.log(typeof(user.userName));
            if(!names.includes(user.userName)){
                console.log("In");
                return true;
            } 
            else{
                console.log("Not In");
                return false;
            }
        });
        console.log(newChats);
        this.setState({chats:newChats});
    }

    addChat = (chat : ChatModel, reset : boolean = false) => {
        const{socket} = this.props;
        const {chats} = this.state;
        let newChats : ChatModel[] = [];
        if(reset)
        {
            newChats = [chat];
        }
        else{
            if(!chats.includes(chat))
            {
                newChats =[...chats, chat];
                console.log("add chats");
            }
        }
        this.setState({chats:newChats});

        const messageEvent = `${events.MESSAGE_RECEIVED}-${chat.id}`;
        
        const typingEvent = `${events.TYPING}-${chat.id}`;
        socket.on(typingEvent, updateTypingChat(chat.id));
        socket.on(messageEvent, addMessageToChat(chat.id));
    }

    const addMessageToChat = (chatId : string)=>
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

    const updateTypingChat = (chatId : string) =>{
        return ({isTyping, user} : any)=>{
			if(user !== this.props.user.name){

				const { chats } = this.state;

				let newChats = chats.map((chat)=>{
					if(chat.id === chatId){
						if(isTyping && ! chat.typingUsers.includes(user)){
							chat.typingUsers.push(user);
						}else if(!isTyping && chat.typingUsers.includes(user)){
							chat.typingUsers = chat.typingUsers.filter(u => u !== user);
						}
					}
					return chat;
				})
				this.setState({chats:newChats});
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
                    setActiveChat={setActiveChatFunction}
                    onSendPrivateMessage={this.sendOpenPrivateMessage}/>
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