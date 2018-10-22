import React from 'react';
import './Activity.css'
import Icon from 'semantic-ui-react'

export default (props) => (
    <div className={props.className + " displayRow"}>
        <Icon name='tasks' />
        <p>Activity</p>
    </div>
)