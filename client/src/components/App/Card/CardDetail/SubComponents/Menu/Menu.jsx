import React, { Component } from 'react';
import './Menu.css'
import { Button, Icon, Divider, Modal, Header, Input, Popup, Loader, Dimmer } from 'semantic-ui-react'
import DatePicker from './datepicker';
import Move from './subComponents/Move/MoveContainer.js'
import moment from 'moment';
import Labels from '../../../../Modal/LabelsModal'
import LabelColorPicker from '../../../../Input/LabelColorPicker';
import DropboxChooser from 'react-dropbox-chooser'
import { FilePicker } from 'react-file-picker'

class Menu extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isPickingDate: false,
            isCreatingChecklist: false,
            isLabelClicked: false,
            duedate: null,
            checklistName: "",
            url: "",
            isMovingCard: false,
            isDeleting: false,
            isAttaching: false,
            newCardLabels: []
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
                    <p>Add to card</p>
                    <Button.Group vertical size='medium' compact>
                        <Button icon labelPosition='left'>
                            <Icon name='users' />
                            Members
                        </Button>
                        <Button icon labelPosition='left' onClick={() => {
                            this.setState({ isLabelClicked: true });
                            console.log("Change labels: " + this.state.isLabelClicked)
                        }}>
                            <Icon name='tag' />
                            Labels
                        </Button>
                        <Labels
                            card={this.props.card}
                            board={this.props.board}
                            isOpened={this.state.isLabelClicked}
                            onRemoveLabel={(labelId) => { this.props.onRemoveLabel(labelId) }}
                            onAddLabel={(labelId) => { this.props.onAddLabel(labelId) }}
                            onValidate={(labelId) => { this.setState({ isLabelClicked: false }) }}
                        >
                        </Labels>
                        <Popup
                            trigger={<Button icon labelPosition='left'>
                                <Icon name='check square outline' />
                                Checklist
                            </Button>}
                            on='click'
                            open={this.state.isCreatingChecklist}
                            onClose={() => this.setState({ isCreatingChecklist: false })}
                            onOpen={() => this.setState({ isCreatingChecklist: true })}
                            position='bottom left'>
                            <Header icon='calendar check outline' content='Enter a name' />
                            <Popup.Content>
                                <Input onChange={(event, data) => this.setState({ checklistName: data.value })} />
                            </Popup.Content>
                            <div className={"checklist-div-add-button"}>
                                <Button color='green' className={"checklist-add-button"}
                                    onClick={() => { this.state.checklistName ? this.setState({ isCreatingChecklist: false }, () => this.props.onChecklist(this.state.checklistName)) : console.log("Please fill the name of the checklist"); }}>
                                    <Icon name='add' /> add
                                </Button>
                            </div>
                        </Popup>
                        <Button icon labelPosition='left'
                            onClick={() => this.setState({ duedate: moment(new Date()).add(1, "days") }, () => this.setState({ isPickingDate: true }))}>
                            <Icon name='calendar check' />
                            Due date
                        </Button>
                        <Modal open={this.state.isPickingDate}>
                            <Header icon='calendar' content='Select a date' />
                            <Modal.Content>
                                <DatePicker
                                    onChange={this.handleOnDateSelect}
                                    startDate={this.state.duedate}
                                />
                            </Modal.Content>
                            <Modal.Actions>
                                <Button color='red' onClick={() => this.setState({ isPickingDate: false })}>
                                    <Icon name='remove' /> Cancel
                                </Button>
                                <Button color='green' onClick={() => {
                                    this.setState({ isPickingDate: false });
                                    this.props.onDueDate(this.state.duedate);
                                    console.log("Change due date")
                                }}>
                                    <Icon name='checkmark' /> Validate
                                </Button>
                            </Modal.Actions>
                        </Modal>
                        <Popup
                            trigger={<Button icon labelPosition='left'>
                                <Icon name='paperclip' />
                                Attachments
                            </Button>}
                            on='click'
                            open={this.state.isAttaching}
                            onClose={() => this.setState({ isAttaching: false })}
                            onOpen={() => this.setState({ isAttaching: true })}
                            position='bottom left'>
                            <Header icon='paperclip' content='Choose a method' />
                            {this.state.isUploading
                                ? <Dimmer active inverted>
                                    <Loader content="Loading" inverted />
                                </Dimmer>
                                : ""
                            }
                            <Popup.Content>
                                <FilePicker
                                    extensions={['pdf']}
                                    onChange={file => this.setState({ isUploading: true }, async () => { await this.props.onUploadLocalFile(file); this.setState({ isUploading: false }) })}
                                    onError={error => alert("Not a pdf file !")}
                                >
                                    <Button positive className="fullsize attaching-button">
                                        <Icon name='computer' /> Local
                                        </Button>
                                </FilePicker>
                                <DropboxChooser
                                    appKey={'ad87evrukye9cq0'}
                                    success={file => this.setState({ isUploading: true }, async () => { await this.props.onUploadFile({ url: file[0].link, name: file[0].name }); this.setState({ isUploading: false }) })}
                                    cancel={() => console.log("cancel")}
                                    extensions={['.pdf']} >
                                    <Button positive className="fullsize attaching-button">
                                        <Icon name='dropbox' /> Dropbox
                                            </Button>
                                </DropboxChooser>
                            </Popup.Content>
                        </Popup>
                    </Button.Group>
                </div>
                <Divider />
                <div>
                    <p>Actions</p>
                    <Button.Group vertical size='medium' compact>
                        <Button icon labelPosition='left' onClick={() => this.setState({ isMovingCard: true })}>
                            <Icon name='arrow right' />
                            Move
                        </Button>
                        <Move
                            boardId={this.props.card.board}
                            isOpened={this.state.isMovingCard}
                            onValidate={(boardId, listId, newName, pos) => {
                                this.setState({ isMovingCard: false });
                                this.props.onMove(boardId, this.props.card.list._id, listId, newName, pos)
                            }}
                            onCancel={() => this.setState({ isMovingCard: false })}
                        />
                        <Button icon labelPosition='left'>
                            <Icon name='copy' />
                            Copy
                        </Button>
                        <Button icon labelPosition='left'>
                            <Icon name='eye' />
                            Watch
                        </Button>
                        {this.props.isArchived
                            ? <Button icon labelPosition='left' onClick={() => this.setState({ isDeleting: true })}
                                color="red">
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
                <Modal size="mini" open={this.state.isDeleting} onClose={() => this.setState({ isDeleting: false })}>
                    <Modal.Header>{"Delete the card"}</Modal.Header>
                    <Modal.Content>
                        <p>{"Are you sure you want to delete this card ?"}</p>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={() => this.setState({ isDeleting: false })} negative>No</Button>
                        <Button onClick={() => this.setState({ isDeleting: false }, () => this.props.onDelete())} positive
                            icon='checkmark' labelPosition='right' content='Yes' />
                    </Modal.Actions>
                </Modal>
            </div>
        )
    }
}

export default Menu