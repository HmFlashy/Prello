import React, { Component } from 'react';
import './LabelsModal.css'
import { Icon, Modal, Header, Button, Label, Checkbox} from 'semantic-ui-react'


class LabelsModal extends Component{

    constructor(){
        super()
        this.state = {
            labels: [],
            labelsChecked: []
        }
        
    }
  
    render() {
        return <Modal open={this.props.isOpened} onClose={this.props.onCancel}>
<Header icon='tags' content='Manage labels' />
<Modal.Content>
    {
    <div className="inline">
        

    <div> 
    Select labels
    {this.props.board.labels && this.props.card.labels
    ?
    this.props.board.labels.map(label => console.log(this.props.board.labels) ||  
    <p><Checkbox id={label._id}  defaultChecked={this.props.card.labels.map(cardLabel => cardLabel._id).includes(label._id)} onClick={(event, data) => event.target.checked ? this.props.onAddLabel(label._id) : this.props.onRemoveLabel(label._id)}/>
    <Label color={label.color} size='big' horizontal>
    {label.name}
    </Label></p>)
    : ""}</div></div>}

    
</Modal.Content>
<Modal.Actions>
    <Button color='green' onClick={() => this.props.onValidate()}>
        <Icon name='checkmark' /> Validate
    </Button>
</Modal.Actions>
</Modal>

    }
}

export default LabelsModal