
import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import logo from './logo.svg';
import socket from "../socket";
import UserModel from "../model/user";

let ChatRoom = (props : any) =>
{
  const [myUsers, setUsers] : any[] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(()=>
  {

    const initReactiveProperties = (user : any) => {
        user.hasNewMessages = false;
    }
    
    socket.on("users", (users) => {
        users.forEach((user : any) => {
          user.self = user.userID === socket.id;
          initReactiveProperties(user);
    });
        console.log("Check" + users);
        // put the current user first, and then sort by username
        // setUsers(users.sort((a : any, b  : any) => {
        //     if (a.self) return -1;
        //     if (b.self) return 1;
        //     if (a.username < b.username) return -1;
        //     return a.username > b.username ? 1 : 0;}));
        console.log(typeof(JSON.stringify(users)));
        if(myUsers.length > 0)localStorage.setItem("users", JSON.stringify(myUsers));
    });

    socket.on("user connected", (user) => {
    setUsers(localStorage.getItem("users"));
    setUsers([...myUsers, user] );
    });
  }, []);

    return(<div>
        <div className="left-panel">
          <div> user name: </div> 
          {myUsers && myUsers.map((user: UserModel)=>
          {
            return(<div key={user.userID}>
              {user.username}
            </div>);
          })}
        </div>
        <div className="right-panel">
        </div>
      </div>
    );
}

export default ChatRoom;