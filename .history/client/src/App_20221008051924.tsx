import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

function App() {

  const [usernameAlreadySelected, setUsernameAlreadySelected] = useState(false);

  useEffect(()=>
  {
    
  })
  function onUsernameSelection(event : any) {
    setUsernameAlreadySelected(true);
    socket.auth = { username };
    socket.connect();
  }

  return (
     <div className="container mt-5">
      <form  onSubmit={onUsernameSelection} method="post" action="/" >
        <div className="form-group row">
            <div className="col-5 col-md-3 mb-3">
                <input type="text" className="form-control" id="areacode" name="areacode"
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

