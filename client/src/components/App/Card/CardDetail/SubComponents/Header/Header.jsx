import React from 'react';
import './Header.css'
import { Icon } from 'semantic-ui-react'

export default (props) => (
    <div className={props.className + " displayRow"}>
        <Icon name='file alternate outline' />

        <div>
            <p>
                {props.name}
            </p>
            <p>
                to list {props.list}
            </p>
        </div>
    </div>
)