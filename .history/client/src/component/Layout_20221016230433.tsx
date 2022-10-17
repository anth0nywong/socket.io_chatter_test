import React, {Component} from 'react';
import io from 'socket.io-client';

const socketUrl = "http://"

interface IMyProps {
    title: string;
  }


export default class Layout extends Component 
{
    constructor(props : IMyProps)
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
        const {title} : any = this.props;

        return(<div className="container">
            {title}
        </div>);
    }
    
}
