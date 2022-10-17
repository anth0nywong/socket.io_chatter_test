import React, {useState, useEffect} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {Link} from 'react-router-dom';
import logo from './logo.svg';

//Socket
import socket from "./socket";

//Component
import ChatRoom from './content/chatrooms';
import HomePage from './content/home'

import './App.css';

function App() {

  return (
    <div className="container">
     <Layout title="Chat App Baby"/>>
    </div>
    );
}

export default App;

