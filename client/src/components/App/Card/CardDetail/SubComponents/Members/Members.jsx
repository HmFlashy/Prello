import React from 'react';
import './Members.css'
import { Icon } from 'semantic-ui-react'
import Avatar from 'react-avatar';

export default (props) => (
    <div className={props.className}>
        <p>Members</p>
        <div className="displayRow">
        {props.card
        ? 
        props.card.members.map(member =>
            console.log(member) || <Avatar key={member._id} name={member.fullName} round size="25" textSizeRatio={1.4}></Avatar>) 
        : ""}
        <Icon name='plus' />
        </div>
    </div>
)