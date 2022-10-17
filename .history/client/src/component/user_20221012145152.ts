import { useState, useEffect } from "react";
import socket from "../socket";


function UserHandler() {

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
}

export default UserHandler;