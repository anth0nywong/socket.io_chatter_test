import React, {Component} from 'react';
import io from 'socket.io-client';

const socketUrl = "http://"




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
        this.setState({socket}); 
    }

    render()
    {

        return(<div className="container">
            {title}
        </div>);
    }
    
}
