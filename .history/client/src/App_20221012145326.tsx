import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import logo from './logo.svg';
import socket from "./socket";
import ChatRoom from './content/chatrooms';

import './App.css';

function App() {

  const [usernameAlreadySelected, setUsernameAlreadySelected] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(()=>{
    socket.on("connect_error", (err) => {
    if (err.message === "invalid username") {
      setUsernameAlreadySelected(false);
    }});
    
    return () => {
      socket.off("connect_error");
    };
  
  
  }, []);

  function onChangeUsername(event: any)
  {
    setUsername(event.target.value);
  }

  function onUsernameSelection(event : any) {
    event.preventDefault();
    setUsernameAlreadySelected(true);
    socket.auth = { username };
    socket.connect();

  }

  return (
     <div className="container mt-5">
      <form  onSubmit={onUsernameSelection} method="post" action="/" >
        <div className="form-group row">
            <div className="col-5 col-md-3 mb-3">
                <input onChange={  onChangeUsername } type="text" className="form-control" id="username" name="username" value={username} required
                    placeholder="Your username"/>
            </div>
            <div className="col-md-10">
                <button type="submit" className="btn btn-primary">Send</button>
            </div>
        </div>
      </form>
    </div>

      );
}

export default App;
