import React, {Component, useEffect, useState} from 'react';

const MessageInput : React.FC<{sendMessage: Function, sendTyping:Function}> = ({sendMessage, sendTyping})
{
    let lastUpdateTime : number = Date.now();
    let typingInterval : NodeJS.Timer | null = null;

    const [message, setMessage] = useState(""); 
    const [isTyping, setIsTyping] = useState<boolean>(false);
    
    useEffect(() => {
        
        return () => {
            stopCheckingTyping();
        };
      }, []);

    const sendLocalMessage = ()=>{
        this.props.sendMessage(this.state.message);
    }

    const handleSubmit = (e : any)=>{
        e.preventDefault();
        sendLocalMessage();
        this.setState({message:""});
    }
    
    
    sendTyping = () => {
        this.lastUpdateTime = Date.now();
        if(!this.state.isTyping){
            this.setState({isTyping: true});
            this.props.sendTyping(true);
            this.startCheckingTyping();
        }
    }

    startCheckingTyping = () =>{
        console.log('Typing');
        this.typingInterval = setInterval(()=>{
            if((Date.now() - this.lastUpdateTime > 300)){
                this.setState({isTyping: false});
                this.stopCheckingTyping();
            }
        }, 300)
    }

    stopCheckingTyping = () =>{
        console.log('Stop typing');
        if(this.typingInterval){
            clearInterval(this.typingInterval);
            this.props.sendTyping(false);
        }
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

export default MessageInput