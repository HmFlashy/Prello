import React from 'react';
import './Header.css'
import { Icon } from 'semantic-ui-react'

export default (props) => (
    <div className={props.className + " displayRow"}>
        <Icon name='file alternate outline' />

        <div>
            <h1>
                {props.name}
            </h1>
            <p>
                to list <b>{props.list.name}</b>
            </p>
        </div>
    </div>
)