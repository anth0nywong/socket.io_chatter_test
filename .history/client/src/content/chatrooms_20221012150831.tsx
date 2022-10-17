
import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import logo from './logo.svg';
import socket from "../socket";

function ChatRoom(props : any)
{
  const [users, setUsers] : any = useState([]);
  const [myArray, updateMyArray] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(()=>
  {

  

    const initReactiveProperties = (user : any) => {
        user.hasNewMessages = false;
    }
    socket.on("users", (users) => {
        console.log("not working");
        users.forEach((user : any) => {
          user.self = user.userID === socket.id;
          initReactiveProperties(user);
        });
        // put the current user first, and then sort by username
        setUsers(users.sort((a : any, b  : any) => {
            if (a.self) return -1;
            if (b.self) return 1;
            if (a.username < b.username) return -1;
            return a.username > b.username ? 1 : 0;
          }));});


    socket.on("user connected", (user) => {
    initReactiveProperties(user);
    setUsers({ arr: [...users, user] });
    });
  }, []);

    return(<div>
        <div className="left-panel">
          {users && users.map((userID: string, username: string)=>
          {
            return(<div>
              {username}
            </div>);
          })}
        </div>
        <div className="right-panel">
        </div>
      </div>
    );
}

export default ChatRoom;