
import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import logo from './logo.svg';
import User from '../component/user';

function ChatRoom(props : any)
{

    return(<div>
        {this.props.users}
    </div>
    );
}

export default ChatRoom;