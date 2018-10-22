import React from 'react';
import './Description.css'
import { Icon } from 'semantic-ui-react'

export default (props) => (
    <div className={props.className + " displayRow"}>
        <Icon name='align left' />
        <div>
            <p>Description</p>
            <p onClick={props.textToTextInput}>
                {props.description}
            </p>
        </div>
    </div>
)