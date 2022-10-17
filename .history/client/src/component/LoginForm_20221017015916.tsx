import React, {Component} from 'react';

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


    render()
    {
        const {nickname, error} = this.state;
        return(
            <div className="login">
                <form onSubmit={} className="login-form">
                    <label htmlFor="nickname">
                        <h2>Got a nickname?</h2>
                    </label>
                    <input ref={(input)=>{}}
                    type="text"
                    id="nickname"
                    value={nickname}
                    onChange={}
                    placeholder={'My Cool Username'}/>
                    <div className="error">
                    {error ? error:null}
                    </div>
                </form>
            </div>
        ) 
    }
}