import React from 'react';
import './Labels.css'
import { Icon } from 'semantic-ui-react'

export default (props) => (
    <div className={props.className}>
        <p>Labels</p>
        <div className="displayRow">
            {props.card.labels 
            ?
            props.card.labels.map(label => console.log(label) || <p>{label}</p>)
        :""}
            <Icon name='plus' />
        </div>
    </div>
)