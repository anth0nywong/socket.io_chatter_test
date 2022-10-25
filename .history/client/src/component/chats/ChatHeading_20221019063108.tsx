import React, {Component} from 'react';


export default function({name : string, numberOfUser})
{
    return(
        <div className="chat-header">
            <div className="user-info">
                <div className="user-name">
                    {name}
                </div>
                <div className="status">
                    <div className="indicator">
                        <span>{numberOfUser?numberOfUser: null}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}