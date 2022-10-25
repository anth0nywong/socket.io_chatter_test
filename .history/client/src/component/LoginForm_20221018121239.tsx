import React, {Component} from 'react';
import events from '../Events';

export default class LoginForm extends Component<{socket:any, setUser:Function}, {nickname:string, error:string}>
{
    constructor(props : any)
    {
        super(props);

        this.state={
            nickname:"",
            error:""
        };
    }

    setUser = ({user, isUser} : any) =>
    {
        if(isUser)
        {
            this.setError("User name taken");
        }
        else
        {
            this.props.setUser(user);
            this.setError("");
        }
    }

    handleSubmit = (e : any)=>
    {
        e.preventDefault();
        console.log("submit");
        const {socket} = this.props;
        const {nickname} = this.state;
        socket.emit(events.VERIFY_USER, nickname, this.setUser);
    }

    handleChange = (e : any)=>
    {
        this.setState({nickname: e.target.value})
    }

    setError = (error : string)=>
    {
        this.setState({error:error});
    }

    render()
    {
        const {nickname, error} = this.state;
        return(
            <div className="login">
                <form onSubmit={this.handleSubmit} className="login-form">
                    <label htmlFor="nickname">
                        <h2>Got a nickname?</h2>
                    </label>
                    <input 
                    // ref={(input)=>{this.textInput = input}}
                    type="text"
                    id="nickname"
                    value={nickname}
                    onChange={this.handleChange}
                    placeholder={'My Cool Username'}/>
                    <div className="error">
                    {error ? error:null}
                    </div>
                </form>
            </div>
        ) 
    }
}