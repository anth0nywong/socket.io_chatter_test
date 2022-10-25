import React, {Component} from 'react';


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
                </div>
                
            </div>
        )
    }
}