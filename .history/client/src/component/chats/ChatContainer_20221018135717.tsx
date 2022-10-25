import React, {Component} from 'react';
import SideBar from './SideBar';
import { Socket } from 'socket.io-client';
import UserModel from '../../model/user';

export default class ChatContainer extends Component<{socket: Socket | null, user:UserModel| null, logout:Function},{chats: any, activeChat: any | null, name:any}>{
    
    constructor(props : any)
    {
        super(props);
        this.state=
        {
        chats:[],
        activeChat: null
        }
    }

    setActiveChat = (activeChat : any)=>{
        this.setState({activeChat: activeChat})
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
            </div>
        )
    }
}