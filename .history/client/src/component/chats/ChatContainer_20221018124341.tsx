import React, {Component} from 'react';
import SideBar from './SideBar';
import { Socket } from 'socket.io-client';
export default class ChatContainer extends Component<{socket: Socket | null, user:any, logout:Function},{chats: any, activeChat: any | null}>{
    
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