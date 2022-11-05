import React, {Component, useEffect, useRef, useState} from 'react';
import UserModel from '../../model/user';
import MessageModel from '../../model/message';
import ChatModel from '../../model/chat';

const Messages : React.FC<{messages: MessageModel[], user:UserModel, typingUsers:UserModel[], activeChat:ChatModel}> = ({messages, user, typingUsers}) =>
{
    const messagePanel = useRef<HTMLDivElement>(null);

    useEffect(()=>{
        scrollDownFunction();
    },[])

    useEffect(()=>{
        console.log("newMessage");
    },[messages])
    
    const scrollDownFunction= () => {
        console.log("scroll");
        if(messagePanel.current)
        {
            messagePanel.current.scrollTop = messagePanel.current.scrollHeight;
        }
    }


    
    return(
        <div 
        ref={messagePanel}
        className='thread-container'>
            <div className="thread">
                {
                    messages.map((mes : MessageModel, i : any)=>{
                        return(
                            <div key={mes.id} 
                            className={`message-container ${mes.sender === user.name && 'right'}`}>
                                <div className="time">{mes.time}</div>
                                <div className="data">
                                    <div className="message">{mes.message}</div>
                                    <div className="name">{mes.sender}</div>
                                </div>
                            </div>
                        )
                    })
                }
                {
                    typingUsers.map((name : any)=>{
                        return(<div key={name} className="typing-user">
                            {`${name} is typing...`}
                        </div>)
                    })
                }
            </div>
        </div>
    )
}
export default Messages;