import React, { Component } from 'react';
import './CheckList.css'
import { Progress, Form, Button, Icon, Input } from 'semantic-ui-react'
import DynamicInput from '../../../../Input'

export default class CheckList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isAddingItem: false,
        };
        this.validateNewChecklistName = this.validateNewChecklistName.bind(this)
    }

    validateNewChecklistName(checklistId, old, newVal, name) {
        this.props.onChangeName(checklistId, old, newVal, { name })
    }

    render() {
        return <div className={this.props.className}>
            {this.props.checklists.map(checklist =>
                <div className="checklist displayRow">
                    <Icon name='check square outline' />
                    <div className="progress">
                        <div
                            className="title">
                            <DynamicInput
                                type='text'
                                textToDisplay={checklist.title}
                                placeholder={checklist.title}
                                onValidate={(event) => {
                                    const newVal = [...this.props.checklists]
                                    for (let index = 0; index < Object.keys(newVal).length; index++) {
                                        if (newVal[index]._id == checklist._id) {
                                            newVal[index].title = event.target.value
                                        }
                                    }
                                    this.validateNewChecklistName(checklist._id, this.props.checklists, { checklists: newVal }, event.target.value)
                                }}>
                            </DynamicInput>
                            <Button onClick={() => this.props.onDelete(checklist._id)}>Delete</Button>
                        </div>
                        <Progress total={checklist.items.length} percent={checklist.items.length == 0 ? 100 : checklist.items.filter(item => item.isChecked).length / checklist.items.length * 100} indicating size='tiny' progress />
                        <div>{checklist.items.map(item => <Form.Checkbox checked={item.isChecked} label={item.name} />)}</div>
                        {this.state.isAddingItem
                            ? <Input></Input>
                            : ""
                        }
                        <Button className="addItem" onClick={() => this.state.isAddingItem
                            ? console.log("send to back")
                            : this.setState({ isAddingItem: true })}>Add item</Button>
                        {this.state.isAddingItem
                            ? <Button icon='cancel' onClick={() => this.setState({ isAddingItem: false })} />
                            : ""
                        }
                    </div>
                </div>
            )
            }
        </div>
    }
}