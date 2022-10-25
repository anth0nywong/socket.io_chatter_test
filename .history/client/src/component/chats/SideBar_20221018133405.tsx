import React, {Component} from 'react';
import {RiMenuFill} from 'react-icons/ri';
import {FaSearch} from 'react-icons/fa';

export default class SideBar extends Component<{chats: any, activeChat: any, logout:Function, user:any, setActiveChat:Function}, {}>{
    
    constructor(props : any)
    {
        super(props);
        this.state=
        {
        chats:[],
        acitveChat: null
        }
    }

    setActiveChat = (activeChat : any)=>{
        this.setState({activeChat: activeChat})
    }

    render(){
        const { chats, activeChat, user, setActiveChat, logout} = this.props;
        return(
            <div id="side-bar">
                <div className="heading">
                    <div className="app-name">Our Cool Chat</div>
                    <div className="menu">
                        <RiMenuFill/>
                    </div>
                </div>
                <div className="search">
                    <i className="search-icon"><FaSearch/></i>
                    <input placeholder="Search" type="text"/>
                    <div className="plus"></div>
                </div>
                <div className="users"
                    ref="users"
                    onClick={(e)=>{(e.target === this.refs.user) && setActiveChat(null)}}>
                        {chats.map((chat : any)=>{
                            if(chat.name){
                                const lastMessage = chat.messages[chat.messages.length-1];
                                const user = chat.users.find(({name : name} : any)=>{
                                    return name!== this.props.name;
                                })|| {name:"Community"};
                                const classNames = (activeChat && activeChat.id === chat.id) ? 'active' : '';
                            }
                        })}
                    </div>
            </div>
        )
    }
}