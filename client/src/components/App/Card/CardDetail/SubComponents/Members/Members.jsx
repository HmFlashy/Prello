import React, { Component } from 'react';
import './Members.css'
import { Icon } from 'semantic-ui-react'

export default (props) => (
    <div className={props.className}>
        <p>Members</p>
        <Icon name='plus' />
    </div>
)