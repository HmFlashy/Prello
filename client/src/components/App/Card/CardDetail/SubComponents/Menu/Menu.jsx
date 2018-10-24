import React, { Component } from 'react';
import './Menu.css'
import { Button, Icon, Divider, Modal, Header } from 'semantic-ui-react'
import DatePicker from './datepicker';

class Menu extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isPickingDate: false,
            duedate: null
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
                        <Button icon labelPosition='left'>
                            <Icon name='check square outline' />
                            Checklist
                        </Button>
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
                        <Button icon labelPosition='left'>
                            <Icon name='archive' />
                            Archive
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