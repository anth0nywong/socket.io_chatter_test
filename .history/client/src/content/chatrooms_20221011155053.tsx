
import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import logo from './logo.svg';
import User from '../component/user';

function ChatRoom(props : JSX.Element)
{

    return(<div>
        {props.users}
    </div>
    );
}

export default ChatRoom;