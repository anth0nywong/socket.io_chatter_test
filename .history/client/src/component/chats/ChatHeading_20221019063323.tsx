import React, {Component} from 'react';


// eslint-disable-next-line import/no-anonymous-default-export
export default function({name, numberOfUser}:{string, number})
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