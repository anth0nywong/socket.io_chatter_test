import React, {Component} from 'react';

export default class SideBar extends Component<{chats: any, activeChat: any, logout:Function, user:any}, {}>{
    
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