
import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import logo from './logo.svg';
import socket from "../socket";
import UserModel from "../model/user";

let ChatRoom = (props : any) =>
{
  const [myUsers, setUsers] : any[] = useState([]);
  const [test, setTest] : any = useState(0);

  useEffect(()=>
  {
    console.log(test);
  }, [test]);

const initReactiveProperties = (user : UserModel) => {
    user.connected = true;
    user.messages = [];
    user.hasNewMessages = false;
}
socket.on("users", (users) => {
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

socket.on("user disconnected", (id)=>
{
  let users = JSON.parse(localStorage.getItem("users") as string);
  console.log("user disconnect");
  console.log(id);
  const updateUsers = myUsers && myUsers.map((user: UserModel)=>
  {
    console.log("what");
    if(user.userID === id)
    {
      console.log("null");
      return null;
    }
    else
    {
      console.log("user");
      return user;
    }
  });
  console.log(updateUsers);
  setUsers(updateUsers);
});

function GetValue(event:any)
{
  setTest(10);
  console.log(test);
}

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
          <button onClick={GetValue}>click</button>
        </div>
        <div className="right-panel">
        </div>
      </div>
    );
}

export default ChatRoom;