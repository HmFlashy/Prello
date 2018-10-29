import React from 'react';
import './Header.css'
import { Button, Icon } from 'semantic-ui-react'
import Members from '../../../Card/CardDetail/SubComponents/Members'

export default (props) => (
    <div className="displayRow boardHeader">
        <p>Name</p>
        <Button icon>
            <Icon name='star' />
        </Button>
        <Members></Members>
    </div>
)