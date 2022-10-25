import { render } from '@testing-library/react';
import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import socket from '../socket';

function HomePage()
{
  const navigate = useNavigate();

  useEffect(()=>{
    socket.on("connect_error", (err) => {
    if (err.message === "invalid username") {
      setUsernameAlreadySelected(false);
    }});
    
    return () => {
      socket.off("connect_error");
    };
  }, []);

    const [usernameAlreadySelected, setUsernameAlreadySelected] = useState(false);
    const [username, setUsername] = useState('');

    function onChangeUsername(event: any)
    {
      setUsername(event.target.value);
    }
    
    function isValid()
    {
      return username.length > 2;
    }

    function onUsernameSelection(event : any) {
        event.preventDefault();
        setUsernameAlreadySelected(true);
        socket.auth = { username };
        console.log("step1");
        socket.connect();
        localStorage.setItem("username", username);
        navigate("/chat");
      }
      
    return(
      <div className="container mt-5">
      <form  onSubmit={onUsernameSelection} method="post" action="/" >
        <div className="form-group row">
            <div className="col-5 col-md-3 mb-3">
                <input onChange={  onChangeUsername } type="text" className="form-control" id="username" name="username" value={username} required
                    placeholder="Your username..."/>
            </div>
            <div className="col-md-10">
                <button {...()=>{if(isValid())return "enable"; else return "disable";}}type="submit" className="btn btn-primary">Send</button>
            </div>
        </div>
      </form>
    </div>
    )
}

export default HomePage;