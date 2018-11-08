import React, { Component } from 'react';
import './BoardLabelsModal.css'
import { Button, List, Modal, Label, Icon, Input } from 'semantic-ui-react'
import LabelColorPicker from '../../../Input/LabelColorPicker'

class BoardLabelsModal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isLabelUpdating: false,
            newLabelName:"",
            newLabelColor:"",
            currentLabel:{},
            updatedLabelName:"",
            updatedLabelColor:""

            
        };
    }

    render(){
        return (
            <div>
            <Modal open={ this.props.open } onClose={ this.props.onClose} size='tiny' trigger={this.props.trigger}>
                <Modal.Header>Manage labels</Modal.Header>
                <Modal.Content  className="board-labels">
                    <List>
                        {
                            this.props.boardLabels ?
                            
                                this.props.boardLabels.map(label => <p><Label color={label.color} size='big' horizontal onClick={() => this.setState({ isLabelUpdating: true, currentLabel:label, updatedLabelName:label.name, updatedLabelColor: label.color})} >
                                {label.name}
                                </Label><Button icon onClick={ () => this.props.onDeleteLabel(label._id)} >
                                    <Icon name='trash alternate' />
                                </Button></p>)
                                
                                
                            :
                           <p>No labels created</p> 
                        }
                        <p>Create a label</p>
                        <LabelColorPicker
                            onSelect={color => this.setState({ newLabelColor: color })}
                            size='big'
                              />
                        <Input placeholder="Label name" onChange={(event, data) => this.setState({ newLabelName: data.value })}></Input>
                    </List> 
                    <Button color='green' onClick={ () => (this.state.newLabelName && this.state.newLabelColor) ? this.props.onNewLabel(this.state.newLabelName, this.state.newLabelColor):console.log("Please fill all the fields")}>
                         <Icon name='checkmark' /> Validate
                      </Button>
                </Modal.Content>
                <Modal.Actions>
                    <Button negative onClick={this.props.onClose}>Back</Button>
                </Modal.Actions>
            </Modal>


            <Modal open={ this.state.isLabelUpdating } onClose={() => this.setState({ isLabelUpdating: false })} size='tiny' trigger={this.props.trigger}>
            <Modal.Header>Update label</Modal.Header>
            <Modal.Content  className="board-labels">
                    <p>Update a label</p>
                    <LabelColorPicker
                        color={this.state.currentLabel.color}
                        onSelect={color => this.setState({ updatedLabelColor: color })}
                        size='big'
                          />
                    <Input placeholder="Label name" defaultValue={this.state.currentLabel.name} onChange={(event, data) => this.setState({ updatedLabelName: data.value })}></Input>
            </Modal.Content>
            <Modal.Actions>
            <Button color='green' onClick={() => (this.state.updatedLabelColor === "" || this.state.updatedLabelName === "") ? console.log("Please fill all the fields"):(this.setState({ isLabelUpdating: false,  currentLabel:{},
            updatedLabelName:"", updatedLabelColor:""}), this.props.onUpdateLabel(this.state.currentLabel._id, this.state.updatedLabelName, this.state.updatedLabelColor))}>
                     <Icon name='checkmark' /> Validate
                  </Button>
            </Modal.Actions>
        </Modal>
        </div>
        )
    }
}

export default BoardLabelsModal