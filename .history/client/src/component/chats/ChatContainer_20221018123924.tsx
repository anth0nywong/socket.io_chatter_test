import React, {Component} from 'react';
import SideBar from './SideBar';
export default class ChatContainer extends Component{
    
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