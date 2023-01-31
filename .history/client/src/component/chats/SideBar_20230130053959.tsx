import React, {useState, Component, useEffect} from 'react';
import {RiMenuFill} from 'react-icons/ri';
import {FaSearch} from 'react-icons/fa';
import {MdEject} from 'react-icons/md';
import ChatData from '../../model/chat';
import {UserListInterface} from '../../model/user';
import { SyntheticEvent } from 'react';



const SideBar : React.FC<{chats: ChatData[], activeChat: any, logout:Function, user: {id:number, name:string}, setActiveChat:Function, onSendPrivateMessage: Function, userList: UserListInterface}>
 = ({chats, activeChat,  logout, user, setActiveChat, onSendPrivateMessage, userList}) =>{
    
    const [receiver, setReceiver] = useState("");
    

    let handleSubmit = (e : SyntheticEvent)=>{
        console.log("receiver:" + receiver);
        e.preventDefault();
        onSendPrivateMessage(receiver);
        setReceiver("");
    }

    const optionFunction = () => {
        return Object.keys(userList.userList).map((key, index)=>{
            console.log(userList);
            if(key != user.name){
                if(index == 0)
                return(<option key={index} value={key}>{key} </option>);
            }
            })
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
                    <select 
                    onChange={(e)=>{setReceiver(e.target.value)}} 
                    >
                        <option value={""}>Select User</option>
                        {optionFunction()}
                    </select>
                    <div className="plus" onClick={handleSubmit}></div>
                </form>
                <div className="users"
                    onClick={(e)=>{const target : any = e.target; (target.className === "users")&& setActiveChat(null)}}>
                        
                        {chats.map((chat : ChatData)=>{
                            if(chat.name){
                                const lastMessage = chat.messages[chat.messages.length-1];
                                //Fix later
                                let thisUser : any = chat.users.find(({name} : any)=>{
                                    return name !== user?.name;
                                }) || {name:"Community"};
                                const classNames = (activeChat && activeChat.id === chat.id) ? 'active' : '';

                                return(<div
                                    key={chat.id}
                                    className={`user ${classNames}`}
                                    onClick={()=>{
                                        setActiveChat(chat);
                                    }}>
                                        <div className="user-photo">{thisUser.name[0].toUpperCase()}</div>
                                        <div className="user-info">
                                            <div className="name">{thisUser.name}</div>
                                            {lastMessage && <div className="last-message">{lastMessage.message}</div>}
                                        </div>
                                </div>
                                );
                            }
                            return null;
                        })}
                    </div>
                    <div className="current-user">
                        <span>{user?.name}</span>
                        <div onClick={()=>{logout()}} title="Logout" className="logout">
                            <MdEject/>
                        </div>
                    </div>
            </div>
    );
}

export default SideBar;