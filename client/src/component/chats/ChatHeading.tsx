import React, {Component} from 'react';
import { FaUserPlus, FaVideo } from 'react-icons/fa';
import { MdMenu } from 'react-icons/md';
import ChatModel from '../../model/chat';


// eslint-disable-next-line import/no-anonymous-default-export
const ChatHeading : React.FC<{name:string}> = ({name}) =>
{
    return(
        <div className="chat-header">
            <div className="user-info">
                <div className="user-name">
                    {name}
                </div>
                <div className="status">
                    <div className="indicator">
                        {/* <span>{numberOfUser?numberOfUser: null}</span> */}
                    </div>
                </div>
            </div>
            <div className="options">
                <FaVideo/>
                <FaUserPlus/>
                <MdMenu/>
            </div>
        </div>
    );
}
export default ChatHeading;