import React, {useState, useEffect, Component} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './component/Layout'
import {Link} from 'react-router-dom';
import logo from './logo.svg';

//Socket
import socket from "./socket";

//Component
import ChatRoom from './content/chatrooms';
import HomePage from './content/home'

import './App.css';

interface IMyProps {
  title: string;
}

class App extends Component<{},{title: string}> 
 {
    constructor(props : any) {
      super(props);
      this.state = { title: '' };
  }

  render()
  {
  return (
    <div className="container">
     <Layout title={"Chat App Baby"} value={this.props.title}/>
    </div>
    );
  }
}

export default App;

