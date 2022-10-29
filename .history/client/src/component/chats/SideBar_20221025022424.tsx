import React, {useState, Component} from 'react';
import {RiMenuFill} from 'react-icons/ri';
import {FaSearch} from 'react-icons/fa';
import {MdEject} from 'react-icons/md';
import ChatData from '../../model/chat';
import { SyntheticEvent } from 'react';


export default function SideBar(props : any){
    
    const [receiver, setReceiver] = useState("");
        
    let handleSubmit = (e : SyntheticEvent)=>{
        e.preventDefault();
        const {onSendPrivateMessage} = props;

        onSendPrivateMessage(receiver);
    }
    //const { chats, activeChat, user, setActiveChat, logout} = this.props;   
    return(
            <div id="side-bar">
                <div className="heading">
                    <div className="app-name">Our Cool Chat</div>
                    <div className="menu">
                        <RiMenuFill/>
                    </div>
                </div>
                <form onSubmit={handleSubmit} className="search">
                    <i className="search-icon"><FaSearch/></i>
                    <input onChange={(e)=>{setReceiver(e.target.value)}} placeholder="Search" type="text"/>
                    <div className="plus"></div>
                </form>
                <div className="users"
                    onClick={(e)=>{(e.target === this.refs.user) && props.setActiveChat(null)}}>
                        
                        {props.chats.map((chat : ChatData)=>{
                            if(chat.name){
                                const lastMessage = chat.messages[chat.messages.length-1];
                                //Fix later
                                const user = chat.users.find(({name} : any)=>{
                                    return name !== props.user?.name;
                                }) || {name:"Community"};
                                const classNames = (props.activeChat && props.activeChat.id === chat.id) ? 'active' : '';

                                return(<div
                                    key={chat.id}
                                    className={`user${classNames}`}
                                    onClick={()=>{
                                        props.setActiveChat(chat);
                                    }}>
                                        <div className="user-photo">{user.name[0].toUpperCase()}</div>
                                        <div className="user-info">
                                            <div className="name">{user.name}</div>
                                            {lastMessage && <div className="last-message">{lastMessage.message}</div>}
                                        </div>
                                </div>
                                );
                            }
                            return null;
                        })}
                    </div>
                    <div className="current-user">
                        <span>{props.user?.name}</span>
                        <div onClick={()=>{props.logout()}} title="Logout" className="logout">
                            <MdEject/>
                        </div>
                    </div>
            </div>
    );
}