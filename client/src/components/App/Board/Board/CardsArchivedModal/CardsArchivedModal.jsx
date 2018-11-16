import React, { Component } from 'react';
import './CardsArchivedModal.css'
import { Button, List, Modal, Segment } from 'semantic-ui-react'
import CardOverviewContainer from './../../../../../containers/CardContainers/CardOverviewContainer'

class CardsArchivedModal extends Component {

    render() {
        return (
            <Modal open={this.props.open} onClose={this.props.onClose} size='tiny' trigger={this.props.trigger}>
                <Modal.Header>Archived Elements</Modal.Header>
                <Modal.Content className="list-card-archived">
                    <List center>
                        {
                            [[...this.props.archivedCards.length > 0
                                ? [<h1>Cards archived</h1>, ...this.props.archivedCards.map(card => (<List.Item key={card._id} ><CardOverviewContainer key={card._id} cardId={card._id} /></List.Item>))]
                                : [<h1>No Cards archived</h1>]],
                            [...this.props.archivedLists.length > 0
                                ? [<h1>Lists archived</h1>, ...this.props.archivedLists.map(list => (<List.Item key={list._id} >
                                    <Segment className="displayRow spacebetween">
                                        <div>
                                            <p>{list.name}</p>
                                        </div>
                                        <div>
                                            <Button color="green" onClick={() => this.props.onRestore(list._id)}>Restore</Button>
                                            <Button color="red" onClick={() => this.props.onDelete(list._id)}>Delete</Button>
                                        </div>
                                    </Segment>
                                </List.Item>))]
                                : [<h1>No Lists archived</h1>]]]
                        }
                    </List>
                </Modal.Content>
                <Modal.Actions>
                    <Button negative onClick={this.props.onClose}>Back</Button>
                </Modal.Actions>
            </Modal>
        )
    }
}

export default CardsArchivedModal