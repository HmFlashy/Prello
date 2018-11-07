import React from 'react';
import './Description.css'
import { Icon } from 'semantic-ui-react'

export default (props) => (
    <div>
        <div className={props.className + " displayRow"}>
            <Icon name='align left' />
            <p>Description</p>
        </div>
        <div>
            <p onClick={props.textToTextInput}>
                {props.description}
            </p>
        </div>
    </div>
)