import React, { Component } from 'react';
import './Avatar.css'
import { Popup } from 'semantic-ui-react'
import Avatar from 'react-avatar';

export default class MyAvatar extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (<Popup
            key={this.props.fullName}
            trigger={<span><Avatar key={this.props._id}
                name={this.props.fullName}
                round
                size="25"
                textSizeRatio={1.4} /></span>}
            on='hover'>
            <Popup.Header>{this.props.fullName}</Popup.Header>
            <Popup.Content>{this.props.bio}</Popup.Content>
        </Popup>
        )
    }
}