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
                    <i className="search-icon"><FASearch/></i>
                </div>
            </div>
        )
    }
}