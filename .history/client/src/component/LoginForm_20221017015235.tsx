import React, {COmponent} from 'react';

export class LoginForm extends Component 
{
    constructor(props)
    {
        super(props);
        
        this.state={
            nickname:"",
            error:""
        };
    }


    render()
    {
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
                    placeholder={'My Cool Username'}
                </form>
            </div>
        ) 
    }
}