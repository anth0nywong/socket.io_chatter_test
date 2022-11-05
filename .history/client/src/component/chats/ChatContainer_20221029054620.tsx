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
    
    const  [chats, setChats] = useState<ChatModel[]>([]);
    const  [activeChat , setActiveChat]  = useState<ChatModel | null>(null);
   
    useEffect(()=>{
        console.log("useEffect");
        initSocket(socket);
    }, []);
    
    useEffect(()=>{
        console.log("chats changes");
        console.log(chats);
    }, [chats]);

    function initSocket(socket: Socket){
        console.log("Init Socket");
        socket.emit(events.COMMUNITY_CHAT, resetChat);
        socket.on(events.PRIVATE_MESSAGE, addChat);
        socket.on(events.USER_DISCONNECTED, removeChat);
        //If someone reconnect, reset chat
        socket.on('connect', ()=>{
            socket.emit(events.COMMUNITY_CHAT, resetChat);
        });
    }

    const sendOpenPrivateMessage = (receiver : string) => {
        socket.emit(events.PRIVATE_MESSAGE, {receiver, sender: user.name, activeChat});
    }

    const setActiveChatFunction = (activeChat : ChatModel)=>{
        setActiveChat(activeChat);
    }
    
    const resetChat = (chat : ChatModel) => {
        return addChat(chat, true);
    }

    const removeChat = (user : any) =>{
        let newChats : ChatModel[] =[...chats];
        newChats = newChats.filter((x)=>{
            let names : string[] = x.name.split('&');
            if(!names.includes(user.userName)){
                return true;
            } 
            else{
                return false;
            }
        });
        console.log("removeChat");
        setChats(newChats);
    }

    const addChat = (chat : ChatModel, reset : boolean = false) => {
        let newChats : ChatModel[] = [];
        if(reset)
        {
            newChats = [chat];
        }
        else{
            if(!chats.includes(chat))
            {

                newChats =[...chats, chat];
                console.log("set newChats");
            }
            else {
                newChats =[...chats];
            }
        }
        console.log("add Chat");
        console.log("New Chats");
        console.log(newChats);
        setChats(newChats);

        const messageEvent = `${events.MESSAGE_RECEIVED}-${chat.id}`;
        const typingEvent = `${events.TYPING}-${chat.id}`;
        socket.on(typingEvent, updateTypingChat(chat.id));
        socket.on(messageEvent, addMessageToChat(chat.id));
    }

    const addMessageToChat = (chatId : string)=>
    {
        return (message : any) => {
            console.log(chatId);
            let newChats = chats.map((chat : any)=>{
                if(chat.id === chatId)
                chat.messages.push(message);
                return chat;
            });
            console.log("messages pushed");
            console.log(chats);
            setChats(newChats);
        }
    }
    
    const updateTypingChat = (chatId : string) =>{
        return ({isTyping, user} : any)=>{
			if(user !== user.name){
                const chatsArray = chats;
                console.log("chats:" + chatsArray);
                //Map current chats
				let newChats = chatsArray.map((chat)=>{
                    console.log(chat);
                    //If chats id equal to this chat's id
					if(chat.id === chatId)
                    {
						if(isTyping && ! chat.typingUsers.includes(user)){
							chat.typingUsers.push(user);
						}else if(!isTyping && chat.typingUsers.includes(user)){
							chat.typingUsers = chat.typingUsers.filter(u => u !== user);
						}
					}
					return chat;
				})
                console.log("update Chats");
				setChats(newChats);
			}
		}
    }
    
    const sendMessage = (chatId:string, message:string)=>
    { 
        console.log("from client: message_sent emitted.");
        socket?.emit(events.MESSAGE_SENT, {chatId, message})
    }

    const sendTyping = (chatId : string, isTyping : any) =>{
        socket?.emit(events.TYPING, {chatId, isTyping});
    }
    return(
        <div className="container">
            <SideBar
                logout={logout}
                chats={chats}
                user={user}
                activeChat={activeChat}
                setActiveChat={setActiveChatFunction}
                onSendPrivateMessage={sendOpenPrivateMessage}/>
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
                                    sendMessage(activeChat.id, message);
                                }}
                                sendTyping={(isTyping : any)=>{
                                    sendTyping(activeChat.id, isTyping);
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
export default ChatContainer;