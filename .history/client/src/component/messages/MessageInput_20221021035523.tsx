import React, {Component} from 'react';

export default class MessageInput extends Component<{sendMessage:Function, sendTyping:Function},{}>
{
    handleSubmit(){}
    render(){
        return(
            <div className="message-input">
                <form onSubmit={this.handleSubmit}
                className="message-form"></form>
            </div>
        )
    }
    
}