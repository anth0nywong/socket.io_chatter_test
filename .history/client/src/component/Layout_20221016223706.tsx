import React, {Component} from 'react';
import io from 'socket.io-client';

const socketUrl = ""

export default class Layout extends Component 
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
        const socket = 
    }

    render()
    {
        const {title} : any = this.props;

        return(<div className="container">
            {title}
        </div>);
    }
    
}