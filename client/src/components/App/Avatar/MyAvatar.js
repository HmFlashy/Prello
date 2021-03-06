import React, { Component } from 'react';
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
                size={this.props.size}
                textSizeRatio={this.props.textSizeRatio} /></span>}
            on='hover'>
            <Popup.Header>{this.props.fullName}</Popup.Header>
            <Popup.Content>{this.props.bio}</Popup.Content>
        </Popup>
        )
    }
}