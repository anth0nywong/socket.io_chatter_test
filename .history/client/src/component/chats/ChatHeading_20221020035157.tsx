import React, {Component} from 'react';
import { FaUserPlus, FaVideo } from 'react-icons/fa';
import { MdMenu } from 'react-icons/md';


interface FullName {
    name: string;
    lastName: string;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function(name : string, numberOfUser: number)
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