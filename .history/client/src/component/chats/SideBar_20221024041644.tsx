import React, {Component} from 'react';
import {RiMenuFill} from 'react-icons/ri';
import {FaSearch} from 'react-icons/fa';
import {MdEject} from 'react-icons/md';
import ChatData from '../../model/chat';


export default class SideBar extends Component<{chats: ChatData[], activeChat: any, logout:Function, user: {id:number, name:string} | null, setActiveChat:Function, onSendPrivateMessage: Function}, {receiver: string}>{
    constructor(props: any){
        super(props)
        this.state={
            receiver:""
        }
    }
    
    handleSubmit = (e : any)=>{
        e.preventDefault();
        const {receiver} = this.state;
        const {onSendPrivateMessage} = this.props;

        onSendPrivateMessage(receiver);
    }
    render(){
        
        const { chats, activeChat, user, setActiveChat, logout} = this.props;
        const { receiver } = this.state;
        return(
            <div id="side-bar">
                <div className="heading">
                    <div className="app-name">Our Cool Chat</div>
                    <div className="menu">
                        <RiMenuFill/>
                    </div>
                </div>
                <form onSubmit={this.handleSubmit} className="search">
                    <i className="search-icon"><FaSearch/></i>
                    <input onChange={(e)=>{this.setState({receiver:e.target.value})}} placeholder="Search" type="text"/>
                    <div className="plus"></div>
                </form>
                <div className="users"
                    onClick={(e)=>{(e.target === this.refs.user) && setActiveChat(null)}}>
                        
                        {chats.map((chat : ChatData)=>{
                            if(chat.name){
                                const lastMessage = chat.messages[chat.messages.length-1];
                                //Fix later
                                const chatSideName : any = chat.users.find((name : any)=>{
                                    return name !== user?.name;
                                }) || {name:"Community"};
                                const classNames = (activeChat && activeChat.id === chat.id) ? 'active' : '';

                                return(<div
                                    key={chat.id}
                                    className={`user${classNames}`}
                                    onClick={()=>{
                                        setActiveChat(chat);
                                    }}>
                                        <div className="user-photo">{chatSideName[0].toUpperCase()}</div>
                                        <div className="user-info">
                                            <div className="name">{chatSideName}</div>
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
        )
    }
}