import React, { Component } from 'react';
import './BoardLabelsModal.css'
import { Button, List, Modal, Label, Icon, Input } from 'semantic-ui-react'
import LabelColorPicker from '../../../Input/LabelColorPicker'

class BoardLabelsModal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isCreatingLabel: false,
            newLabelName:"",
            newLabelColor:""

            
        };
    }

    render(){
        return (
            <Modal open={ this.props.open } onClose={ this.props.onClose} size='tiny' trigger={this.props.trigger}>
                <Modal.Header>Manage labels</Modal.Header>
                <Modal.Content  className="board-labels">
                    <List>
                        {
                            this.props.boardLabels ?
                            
                                this.props.boardLabels.map(label => <p><Label color={label.color} size='big' horizontal>
                                {label.name}
                                </Label><Button icon>
                                    <Icon name='trash alternate' />
                                </Button></p>)
                                
                            :
                        //    <p>No labels created</p> 
                           console.log("Helloooo" + this.props)
                        }
                        <p>Create a label</p>
                        <LabelColorPicker
                            onSelect={color => this.setState({ newLabelColor: color })}
                            size='big'
                              />
                        <Input placeholder="Label name" onChange={(event, data) => this.setState({ newLabelName: data.value })}></Input>
                    </List> 
                    <Button color='green' onClick={() => { this.setState({ isCreatingLabel: false }, () => this.props.onNewLabel(this.state.newLabelName, this.state.newLabelColor)); }}>
                         <Icon name='checkmark' /> Validate
                      </Button>
                </Modal.Content>
                <Modal.Actions>
                    <Button negative onClick={this.props.onClose}>Back</Button>
                </Modal.Actions>
            </Modal>
        )
    }
}

export default BoardLabelsModal