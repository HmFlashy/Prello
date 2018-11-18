import React, { Component } from 'react';
import './MessageCard.css'
import { Message } from 'semantic-ui-react'

class MessageCard extends Component {

    componentDidMount(){
        this.props.timeNotification(this.props.error._id)
    }

    render() {
        return (
            <Message negative className="elementToFadeInAndOut" hidden={this.props.error ? this.props.error.hidden : false}>
                <Message.Header>An error occured !</Message.Header>
                <p>{this.props.error ? `We couldn't ${(this.props.error.message + "").toLowerCase()}.` : ""}</p>
            </Message>
        )
    }
}

export default MessageCard
