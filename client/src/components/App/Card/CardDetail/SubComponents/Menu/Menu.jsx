import React, { Component } from 'react';
import './Menu.css'
import { Button, Icon, Divider, Modal, Header, Input } from 'semantic-ui-react'
import DatePicker from './datepicker';

class Menu extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isPickingDate: false,
            isCreatingChecklist: false,
            duedate: null,
            checklistName: "",
            isMovingCard: false
        };
        this.handleOnDateSelect = this.handleOnDateSelect.bind(this);
    }

    handleOnDateSelect(data) {
        this.setState({ duedate: data })
    }

    render() {
        return (
            <div>
                <div>
                    <p>Ajouter a la carte</p>
                    <Button.Group vertical size='medium' compact>
                        <Button icon labelPosition='left'>
                            <Icon name='users' />
                            Members
                        </Button>
                        <Button icon labelPosition='left'>
                            <Icon name='tag' />
                            Labels
                        </Button>
                        <Button icon labelPosition='left' onClick={() => this.setState({ isCreatingChecklist: true })}>
                            <Icon name='check square outline' />
                            Checklist
                        </Button>
                        <Modal open={this.state.isCreatingChecklist}>
                            <Header icon='calendar' content='Enter a name' />
                            <Modal.Content centered={true}>
                                <Input onChange={(event, data) => this.setState({ checklistName: data.value })}></Input>
                            </Modal.Content>
                            <Modal.Actions>
                                <Button color='red' onClick={() => this.setState({ isCreatingChecklist: false })}>
                                    <Icon name='remove' /> Cancel
                                </Button>
                                <Button color='green' onClick={() => { this.setState({ isCreatingChecklist: false }, () => this.props.onChecklist(this.state.checklistName)); }}>
                                    <Icon name='checkmark' /> Validate
                                </Button>
                            </Modal.Actions>
                        </Modal>
                        <Button icon labelPosition='left' onClick={() => this.setState({ isPickingDate: true })}>
                            <Icon name='calendar check' />
                            Due date
                        </Button>
                        <Modal open={this.state.isPickingDate}>
                            <Header icon='calendar' content='Select a date' />
                            <Modal.Content>
                                <DatePicker onChange={this.handleOnDateSelect}
                                />
                            </Modal.Content>
                            <Modal.Actions>
                                <Button color='red' onClick={() => this.setState({ isPickingDate: false })}>
                                    <Icon name='remove' /> Cancel
                                </Button>
                                <Button color='green' onClick={() => { this.setState({ isPickingDate: false }); this.props.onDueDate(this.state.duedate); console.log("Change due date") }}>
                                    <Icon name='checkmark' /> Validate
                                </Button>
                            </Modal.Actions>
                        </Modal>
                        <Button icon labelPosition='left'>
                            <Icon name='paperclip' />
                            Attachments
                        </Button>
                    </Button.Group>
                </div>
                <Divider />
                <div>
                    <p>Actions</p>
                    <Button.Group vertical size='medium' compact>
                        <Button icon labelPosition='left'>
                            <Icon name='arrow right' />
                            Move
                        </Button>
                        <Button icon labelPosition='left'>
                            <Icon name='copy' />
                            Copy
                        </Button>
                        <Button icon labelPosition='left'>
                            <Icon name='eye' />
                            Watch
                        </Button>
                        {this.props.isArchived
                            ? <Button icon labelPosition='left' onClick={this.props.onDelete} color="red">
                                <Icon name='trash' />
                                Delete
                        </Button>
                            : ""}
                        <Button icon labelPosition='left' onClick={() => this.props.onArchive(!this.props.isArchived)}>
                            <Icon name='archive' />
                            {this.props.isArchived
                                ? "Restore"
                                : "Archive"
                            }
                        </Button>

                        <Button icon labelPosition='left'>
                            <Icon name='share' />
                            Share
                        </Button>
                    </Button.Group>
                </div>
            </div >
        )
    }
}
export default Menu