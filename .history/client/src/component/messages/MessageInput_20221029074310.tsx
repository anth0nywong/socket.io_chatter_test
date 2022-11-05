import React, {Component, useState} from 'react';

const MessageInput : React.FC<{sendMessage: Function, sendTyping:Function}> = ({sendMessage, sendTyping})=>{
{
    const [message, setMessage] = useState<string>(""); 
    const [isTyping, setIsTyping] = useState<boolean>(false);
    
    let lastUpdateTime : number = Date.now();
    let typingInterval : NodeJS.Timer | null = null;
    
    useEffect(() => {
        function handleStatusChange() {
        }
        
        return () => {
            stopCheckingTyping();
        };
      });

    sendMessage = ()=>{
       sendMessage(message);
    }

    const handleSubmit = (e : any)=>{
        e.preventDefault();
        sendMessage();
        setMessage("");
    }
    
    
    sendTyping = () => {
        this.lastUpdateTime = Date.now();
        if(!this.state.isTyping){
            this.setState({isTyping: true});
            this.props.sendTyping(true);
            this.startCheckingTyping();
        }
    }

    const startCheckingTyping = () =>{
        console.log('Typing');
        this.typingInterval = setInterval(()=>{
            if((Date.now() - this.lastUpdateTime > 300)){
                this.setState({isTyping: false});
                this.stopCheckingTyping();
            }
        }, 300)
    }

    const stopCheckingTyping = () =>{
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