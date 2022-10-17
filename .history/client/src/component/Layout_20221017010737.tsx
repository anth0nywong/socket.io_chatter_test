import React, {Component} from 'react';
import io from 'socket.io-client';
import {USER_CONNECTED} from '../Event';
const socketUrl = "http://192.168.2.37:3231";

export default class Layout extends Component<{title: string}, {socket: any, user:any}> 
{
    constructor(props : any)
    {
        super(props);

        this.state = {
            socket: null,
            user: null
        };
    }

    componentWillMount()
    {
        this.initSocket();
    }

    initSocket = ()=>
    {
        const socket = io(socketUrl);
        socket.on('connect', ()=>{
            console.log("connected");
        })
        this.setState({socket}); 
    }

    setUser = (user :any)=>
    {
        const {socket} = this.state;
        socket.emit(USER_CONNECTED);

    }
    render()
    {
        const {title} : any = this.props;

        return(<div className="container">
            {title}
        </div>);
    }
    
}
