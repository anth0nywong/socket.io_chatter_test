import React, {Component} from 'react';
import io from 'socket.io-client';
import events from '../Events';
import LoginForm from './LoginForm';
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

    setUser = (user : any)=>
    {
        const {socket} = this.state;
        socket.emit(events.USER_CONNECTED, user);
        this.setState({user})
    }

    logout = ()=>{
        const {socket} = this.state;
        socket.emit(events.LOGOUT);
        this.setState({user:null})
    }

    render()
    {
        const {title} : any = this.props;
        const {socket} : any = this.state;
        
        return(
        <div className="container">
            !user?
            <LoginForm socket={socket} setUser={this.setUser}/>
            :
            <ChatContainer socket={socket} user={user} logout={this.props}></ChatContainer>
        </div>);
    }
    
}
