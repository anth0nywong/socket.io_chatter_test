import React, {Component} from 'react';
import io from 'socket.io-client';

const socketUrl = "http://192.168.2.37:3231";

export default class Layout extends Component<{title: string}> 
{
    constructor(props : any)
    {
        super(props);

        this.state = {
            socket: null
        };
    }

    initSocket = ()=>
    {
        const socket = io(socketUrl);
        socket.on('connect', ()=>{
            console.log("connected");
        })
        this.setState({socket}); 
    }

    render()
    {
        const {title} : any = this.props;

        return(<div className="container">
            {title}
        </div>);
    }
    
}
