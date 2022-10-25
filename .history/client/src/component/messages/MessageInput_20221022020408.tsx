import React, {Component} from 'react';

export default class MessageInput extends Component<{sendMessage: Function, sendTyping:Function},{message: string, isTyping: boolean}>
{
    constructor(props : any)
    {
        super(props);
        this.state = {
            message:"",
            isTyping: false
        };
    }
    sendMessage = ()=>{
        console.log("2");
        this.props.sendMessage(this.state.message);
    }
    
    handleSubmit(e : any){
        e.preventDefault();
        console.log(this);
        this.sendMessage();
        this.setState({message:""});
    }

    
    sendTyping = () => {
        
    }
    render(){
        const {message} = this.state;
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
                    }}/>
                    <button disabled = {message.length < 1}
                    type = "submit"
                    className = "send">Send</button>
                </form>
            </div>
        )
    }
    
}