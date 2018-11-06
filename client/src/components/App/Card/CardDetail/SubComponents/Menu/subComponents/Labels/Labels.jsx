import React from 'react';
import './Labels.css'
import { Icon, Modal, Header, Button, Label, Checkbox} from 'semantic-ui-react'

export default (props) => (
  
<Modal open={props.isOpened} onClose={props.onCancel}>
<Header icon='tags' content='Manage labels' />
<Modal.Content>
    {
    <div className="inline">
        

    <div> 
    Select labels
    {props.board.labels && props.card.labels
    ?
    props.board.labels.map(label => console.log(props.board.labels) ||  
    <p><Checkbox id={label._id} defaultChecked={props.card.labels.map(cardLabel => cardLabel._id).includes(label._id)}/>
    <Label color={label.color} size='big' horizontal>
    {label.name}
    </Label></p>)
    : ""}</div></div>}

    
</Modal.Content>
<Modal.Actions>
    <Button color='red' onClick={props.onCancel}>
        <Icon name='remove' /> Cancel
    </Button>
    <Button color='green' onClick={() => props.onValidate(props.cardLabels, props.boardLabels)}>
        <Icon name='checkmark' /> Validate
    </Button>
</Modal.Actions>
</Modal>
)