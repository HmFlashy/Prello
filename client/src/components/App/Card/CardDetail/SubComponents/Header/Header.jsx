import React from 'react';
import './Header.css'
import { Icon } from 'semantic-ui-react'
import DynamicInput from '../../../../Input/DynamicInput'

export default (props) => (
    <div className={props.className + " displayRow"}>
        <Icon name='file alternate outline' />

        <div>

            <h1>
                <DynamicInput
                    type='text'
                    textToDisplay={props.name}
                    placeholder={props.name}
                    onValidate={props.validateNewName}
                />
            </h1>
            <p>
                to list <b>{props.list.name}</b>
            </p>
        </div>
    </div>
)