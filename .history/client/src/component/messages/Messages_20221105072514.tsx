import React, {Component, useEffect, useState} from 'react';
import UserModel from '../../model/user';
import MessageModel from '../../model/message';

const Messages : React.FC<{messages: MessageModel[], user:UserModel, typingUsers:UserModel[]}> = ({messages, user, typingUsers}) =>
{
    const messagePanel = useRef(null);
    useEffect(()=>{
        scrollDownFunction();
    },[])
    
    const scrollDownFunction= () => {
        messagePanel.current.scrollTop = messagePanel.current.scrollHeight;
    }


    
    return(
        <div ref='container'
        className='thread-container'>
            <div className="thread">
                {
                    messages.map((mes : MessageModel, i : any)=>{
                        return(
                            <div key={mes.id} ref={messagePanel}
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