import React from 'react';
import './Labels.css'
import { Icon, Label } from 'semantic-ui-react'

export default (props) => (
    <div className={props.className}>
        <p>Labels</p>
        <div className="displayRow">
            {props.card.labels 
            ?
            props.card.labels.map(label => <p><Label color={label.color} horizontal>
            {label.name}
          </Label></p>)
        :""}
        </div>
    </div>
)