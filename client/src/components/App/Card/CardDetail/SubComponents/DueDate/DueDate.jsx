import React from 'react';
import './DueDate.css'
import { Icon } from 'semantic-ui-react'

export default (props) => (
    <div className={props.className}>
        <p>Due date</p>
        <div className="displayRow">
            <Icon name={props.isCompleted ? 'calendar check' : 'window close outline'} />
            <p>{props.date}</p>
        </div>
    </div>
)