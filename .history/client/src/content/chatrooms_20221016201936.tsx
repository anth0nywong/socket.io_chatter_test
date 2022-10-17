
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

    const initReactiveProperties = (user : UserModel) => {
        user.connected = true;
        user.messages = [];
        user.hasNewMessages = false;
    }
    
    socket.on("users", (users) => {
      console.log("users: ------------");
      console.log(users);
        users.forEach((user : UserModel) => {
          user.self = user.userID === socket.id;
          initReactiveProperties(user);
    });
        // put the current user first, and then sort by username
        
        users = users.sort((a : UserModel, b  : UserModel) => {
            if (a.self) return -1;
            if (b.self) return 1;
            if (a.username < b.username) return -1;
            return a.username > b.username ? 1 : 0;});
        setUsers(users);
        localStorage.setItem("users", JSON.stringify(users));
    });

    socket.on("user connected", (user) => {
    let users = JSON.parse(localStorage.getItem("users") as string);
    users = users.sort((a : UserModel, b  : UserModel) => {
      if (a.self) return -1;
      if (b.self) return 1;
      if (a.username < b.username) return -1;
      return a.username > b.username ? 1 : 0;});
      console.log(user);
      console.log(users);
    const userList = [...users, user];
    console.log(userList);
    setUsers(userList);
    });

    socket.on("user disconnected", (id)=>
    {
      console.log(id);
      const updateUsers = myUsers && myUsers.map((user: UserModel)=>
      {
        if(user.userID == id)
        {
          return null;
        }
        else
        {
          return user;
        }
      });
      console.log(updateUsers);
      setUsers(updateUsers);
    })
    return ()=>
    {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("users");
      socket.off("user connected");
      socket.off("user disconnected");
      socket.off("private message");
    };
  }, []);

    return(<div>
        <div className="left-panel">
          <div> user name: </div> 
          {myUsers && myUsers.map((user: UserModel)=>
          {
            if(user.connected)
            return(
            <div key={user.userID}>
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