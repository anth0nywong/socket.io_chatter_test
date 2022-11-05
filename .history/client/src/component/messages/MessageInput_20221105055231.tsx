import React, {Component} from 'react';

export default class MessageInput extends Component<{sendMessage: Function, sendTyping:Function},{message: string, isTyping: boolean}>
{
    lastUpdateTime : number = Date.now();
    typingInterval : NodeJS.Timer | null = null;
    constructor(props : any)
    {
        super(props);
        this.state = {
            message:"",
            isTyping: false
        };
    }
    sendMessage = ()=>{
        this.props.sendMessage(this.state.message);
    }

    handleSubmit = (e : any)=>{
        e.preventDefault();
        this.sendMessage();
        this.setState({message:""});
    }
    componentWillUnmount(){
        this.stopCheckingTyping();
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