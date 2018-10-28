import React, { Component } from 'react';
import './CheckList.css'
import { Progress, Form, Button, Icon, Input } from 'semantic-ui-react'
import DynamicInput from '../../../../Input'

export default class CheckList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isAddingItem: false,
            newItemName: ""
        };
        this.validateNewChecklistName = this.validateNewChecklistName.bind(this)
        this.updateItem = this.updateItem.bind(this)
    }

    validateNewChecklistName(checklistId, old, newVal, name) {
        this.props.onChangeName(checklistId, old, newVal, { name })
    }

    updateItem(checklistId, itemId, oldVal, newVal, data) {
        this.props.onUpdateItem(checklistId, itemId, oldVal, newVal, data)
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
                        <div>{checklist.items.map(item =>
                            <div className="displayRow title">
                                <div className="displayRow">
                                    <Form.Checkbox checked={item.isChecked} onClick={() => {
                                        const newVal = [...this.props.checklists]
                                        const newStatus = !item.isChecked
                                        for (let index = 0; index < Object.keys(newVal).length; index++) {
                                            if (newVal[index]._id == checklist._id) {
                                                for (let ind = 0; ind < Object.keys(newVal[index].items).length; ind++) {
                                                    if (newVal[index].items[ind]._id == item._id) {
                                                        newVal[index].items[ind].isChecked = newStatus
                                                    }
                                                }
                                            }
                                        }
                                        this.updateItem(checklist._id, item._id, this.props.checklists, { checklists: newVal }, { isChecked: newStatus })
                                    }} />
                                    <DynamicInput
                                        type='text'
                                        textToDisplay={item.name}
                                        placeholder={item.name}
                                        onValidate={(event) => {
                                            const newVal = [...this.props.checklists]
                                            for (let index = 0; index < Object.keys(newVal).length; index++) {
                                                if (newVal[index]._id == checklist._id) {
                                                    for (let ind = 0; ind < Object.keys(newVal[index].items).length; ind++) {
                                                        if (newVal[index].items[ind]._id == item._id) {
                                                            newVal[index].items[ind].name = event.target.value
                                                        }
                                                    }
                                                }
                                            }
                                            this.updateItem(checklist._id, item._id, this.props.checklists, { checklists: newVal }, { name: event.target.value })
                                        }} />
                                </div>
                                <Button icon='cancel' size="mini" onClick={() => this.props.onDeleteItem(checklist._id, item._id)} />
                            </div>)}
                        </div>
                        {this.state.isAddingItem
                            ? <Input className="addItemTF" value={this.state.newItemName} onKeyPress={(event) => event.charCode === 13 ? this.props.onAddItem(checklist._id, this.state.newItemName) || this.setState({ newItemName: "" }) : ""} onChange={(event, target) => this.setState({ newItemName: target.value })}></Input>
                            : ""
                        }
                        <Button className="addItem" onClick={() => this.state.isAddingItem
                            ? this.props.onAddItem(checklist._id, this.state.newItemName) || this.setState({ newItemName: "" })
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