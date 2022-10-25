import React, {Component} from 'react';

export default class MessageInput extends Component<{sendMessage:Function, sendTyping:Function},{}>
{
    handleSubmit(){}
    render(){
        return(
            <div className="message-input">
                <form onSubmit={this.handleSubmit}
                className="message-form">
                    <input id='message'
                    ref={"messageinput"}
                    type="text"
                    className="form-control"
                    value={message}
                    autoComplete={"off"}
                    placeholder = "Type something"
                    onKeyUp = {e => {e.keyCode !== 13 && this.sendTyping()}}
                    onChange = {({target})=>{
                        this.setState({message:target.value})
                    }}
                </form>
            </div>
        )
    }
    
}