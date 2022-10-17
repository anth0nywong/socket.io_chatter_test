import React, {Component} from 'react';

export class Layout extends Component 
{
    render()
    {
        let title = this.props;

        return(<div className="container">
            {title}
        </div>);
    }
}