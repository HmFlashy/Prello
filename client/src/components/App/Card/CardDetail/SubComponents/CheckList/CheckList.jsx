import React, { Component } from 'react';
import './CheckList.css'
import { Progress, Form, Button, Icon } from 'semantic-ui-react'

export default (props) => (
    <div className={props.className}>
        {props.checklists.map(checklist =>
            <div className="checklist displayRow">
                <Icon name='check square outline' />
                <div className="progress">
                    <p className="title">{checklist.title} <Button>Delete</Button></p>
                    <Progress total={checklist.items.length} percent={checklist.items.filter(item => item.isChecked).length / checklist.items.length * 100} indicating size='tiny' progress />
                    <div>{checklist.items.map(item => <Form.Checkbox checked={item.isChecked} label={item.name} />)}</div>
                    <Button className="addItem">Add item</Button>
                </div>
            </div>
        )
        }

        {console.log(props)}
    </div>
)