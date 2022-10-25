import React, {Component} from 'react';
import SideBar from './SideBar';
import { Socket } from 'socket.io-client';
export default class ChatContainer extends Component<{socket: Socket | null, user:any, logout:Function},{chat: [], activeChat: any}>{
    
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
        const {user, logout} = this.props;
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