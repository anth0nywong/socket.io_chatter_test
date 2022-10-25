import React, {Component} from 'react';

export default class SideBar extends Component<{chat: any, activeChat: any, logout:Function}, {}>{
    
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
        return(
            <div className="container">
                
            </div>
        )
    }
}