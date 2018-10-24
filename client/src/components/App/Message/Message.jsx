import React, { Component } from 'react';
import './Message.css'
import { Message } from 'semantic-ui-react'

class Header extends Component {

    constructor(props) {
        super(props)
        this.isHidden = this.isHidden.bind(this);
    }

    isHidden() {
        if (this.props.message.error) {
            this.props.timeNotification()
            return false
        }
        else {
            return true
        }
    }

    render() {
        return (
            <Message negative className="notification elementToFadeInAndOut" hidden={this.isHidden()}>
                <Message.Header>An error occured !</Message.Header>
                <p>{this.props.message ? `We couldn't ${(this.props.message.error + "").toLowerCase()}.` : ""}</p>
            </Message>
        )
    }
}

export default Header
