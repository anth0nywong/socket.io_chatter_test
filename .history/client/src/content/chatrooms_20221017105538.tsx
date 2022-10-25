
import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import logo from './logo.svg';
import socket from "../socket";
import UserModel from "../model/user";

let ChatRoom = (props : any) =>
{
  const [myUsers, setUsers] : any[] = useState([]);
  const [currentUser, setCurrentUser] : any = useState(null);

  useEffect(()=>
  {
        const username = localStorage.getItem("username");
        socket.auth = { username };
        console.log("step1");
        socket.connect();
  },[]);

  // useEffect(()=>
  // {
  //   localStorage.setItem("users", JSON.stringify(myUsers));
  //   console.log(JSON.stringify(myUsers));
  // }, [myUsers]);

const initReactiveProperties = (user : UserModel) => {
    user.connected = true;
    user.messages = [];
    user.hasNewMessages = false;
}
socket.on("users", async (users) => {
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
        
    await setUsers(users);
});

socket.on("user disconnected", async (id)=>
{
  let users = myUsers;
  let updateUsers = users.map((user: UserModel)=>
  {
    if(user.userID === id)
    {
      return null;
    }
    else
    {
      console.log("user");
      return user;
    }
  });
  updateUsers.filter(n => n);
  console.log(updateUsers);
  await setUsers(updateUsers);
});

socket.on("user connected", async (user) => {
    let users = myUsers;
    console.log("Receive user from local storage");
    console.log(users);
    users = users.sort((a : UserModel, b  : UserModel) => {
      if (a.self) return -1;
      if (b.self) return 1;
      if (a.username < b.username) return -1;
      return a.username > b.username ? 1 : 0;});
    const userList = [...users, user];
    await setUsers(userList);
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
        </div>
        <div className="right-panel">
        </div>
      </div>
    );
}

export default ChatRoom;