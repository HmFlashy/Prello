import React, { Component } from 'react';
import './MessagesDisplayer.css'
import MessageCardContainer from '../../../../containers/MessageContainers/MessageCardContainer';

class MessagesDisplayer extends Component {

    render() {
        return (
            <div className="notification">
                {
                    this.props.errors.map(error => <MessageCardContainer key={error._id} timeNotification={this.props.timeNotification} errorId={error}></MessageCardContainer>)
                }
            </div>
        )
    }
}

export default MessagesDisplayer
