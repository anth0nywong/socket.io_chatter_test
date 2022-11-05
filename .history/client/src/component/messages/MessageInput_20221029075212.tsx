import React, {Component, useEffect, useState} from 'react';

const MessageInput : React.FC<{sendMessage: Function, sendTyping:Function}> = ({sendMessage, sendTyping})=>{

    const [message, setMessage] = useState(""); 
    const [isTyping, setIsTyping] = useState<boolean>(false);
    
    let lastUpdateTime : number = Date.now();
    let typingInterval : NodeJS.Timer | null = null;
    
    useEffect(() => {
        
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
        lastUpdateTime = Date.now();
        if(!isTyping){
            setIsTyping(true);
            sendTyping(true);
            startCheckingTyping();
        }
    }

    const startCheckingTyping = () =>{
        console.log('Typing');
        typingInterval = setInterval(()=>{
            if((Date.now() -lastUpdateTime > 300)){
                setIsTyping(false);
                stopCheckingTyping();
            }
        }, 300)
    }

    const stopCheckingTyping = () =>{
        console.log('Stop typing');
        if(typingInterval){
            clearInterval(typingInterval);
            sendTyping(false);
        }
    }

        return(
            <div className="message-input">
                <form onSubmit={handleSubmit}
                className="message-form">
                    <input id='message'
                    //ref={"messageinput"}
                    type="text"
                    className="form-control"
                    value={message}
                    autoComplete={"off"}
                    placeholder = "Type something"
                    onKeyUp = {e => {e.keyCode !== 13 && sendTyping()}}
                    onChange = {({target})=>{
                        setMessage(target.value);
                    }}/>
                    <button disabled = {message.length < 1}
                    type = "submit"
                    className = "send">Send</button>
                </form>
            </div>
        )
    
}

export default MessageInput;