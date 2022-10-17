import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import logo from './logo.svg';
import socket from "./socket";
import ChatRoom from './content/chatrooms';
import HomePage from './content/home'

import './App.css';

function App() {

  

  useEffect(()=>{
    socket.on("connect_error", (err) => {
    if (err.message === "invalid username") {
      setUsernameAlreadySelected(false);
    }});
    
    return () => {
      socket.off("connect_error");
    };
  
  
  }, []);


  

  return (
      

      );
}

export default App;
