import React, {Component} from 'react';
import UserModel from '../../model/user';

export default class Messages extends Component<{messages:any, user:UserModel| null, typingUser:Function},{}>
{
    const {user} : any = this.props;

    render(){
        return(
            <div ref='container'
            className='thread-container'>
                <div className="thread">
                    {
                        messages.map((mes, i)=>{
                            return(
                                <div key={mes.id}
                                className={`message-container ${mes.sender === user.name && 'right'}`}>
                                    <div className="time">{mes.time}</div>
                                    <div className="data">
                                        <div className="message">{mes.message}</div>
                                        <div className="name">{mes.sender}</div>
                                    </div>
                                </div>
                            )
                        })
                    }
                    {
                        typingUsers.map((name)=>{
                            return(<div key={name} className="typing-user">
                                {`${name} is typing`}
                            </div>)
                        })
                    }
                </div>
            </div>
        )
    }
}