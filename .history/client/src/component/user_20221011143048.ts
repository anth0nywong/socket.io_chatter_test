import { unstable_createStaticHandler } from "@remix-run/router";
import socket from "../socket";


function Handler() {


    {socket.on("users", (users) => {
        users.forEach((user : any) => {
          user.self = user.userID === socket.id;
          initReactiveProperties(user);
        });
        // put the current user first, and then sort by username
        users = users.sort((a : any, b  : any) => {
          if (a.self) return -1;
          if (b.self) return 1;
          if (a.username < b.username) return -1;
          return a.username > b.username ? 1 : 0;
        });
      });
    
    const initReactiveProperties = (user : any) => {
    user.hasNewMessages = false;
    };
    }
} 