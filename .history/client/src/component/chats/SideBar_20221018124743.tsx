import React, {Component} from 'react';
import FAChevronDown from 'react-icons/md/index'
import FAMenu from 'react-icons/lib/fa/list-ul'
import FASearch from 'react-icons/lib/fa/search'
import MdEject from 'react-icons/lib/md/eject'


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
        const {}
        return(
            <div className="container">
                
            </div>
        )
    }
}