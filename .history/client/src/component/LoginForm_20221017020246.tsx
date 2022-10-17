import React, {Component} from 'react';
import events from '../Events';

export default class LoginForm extends Component<{socket:any, setUser:any}, {nickname:string, error:string}>
{
    constructor(props : any)
    {
        super(props);

        this.state={
            nickname:"",
            error:""
        };
    }

    handleSubmit = (e)=>
    {
        e.preventDefault();

        const {socket} = this.props;
        const {nickname} = this.state;
        socket.emit(events.VERIFY_USER, nickname, this.props.setUser);
    }

    handleChange = (e)=>
    {
        this.setState({nickname: e.target.value})
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
                    <input ref={(input)=>{this.textInput = input}}
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