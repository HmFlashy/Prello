import React, { Component } from 'react';
import './Labels.css'
import { Icon } from 'semantic-ui-react'

export default (props) => (
    <div className={props.className}>
        <p>Labels</p>
        <div className="displayRow">
            {props.labels.map(label => <p className="label" style={{ background: label.color }}>{label.name}</p>)}
            <Icon name='plus' />
        </div>
    </div>
)