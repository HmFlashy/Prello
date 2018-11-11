import React, { Component } from 'react';
import './CardsArchivedModal.css'
import { Button, List, Modal } from 'semantic-ui-react'
import CardOverviewContainer from './../../../../../containers/CardContainers/CardOverviewContainer'

class CardsArchivedModal extends Component {

    render(){
        return (
            <Modal open={ this.props.open } onClose={ this.props.onClose} size='tiny' trigger={this.props.trigger}>
                <Modal.Header>Archived cards</Modal.Header>
                <Modal.Content  className="list-card-archived">
                    <List>
                        {
                            this.props.archivedCards.length > 0 ?
                                this.props.archivedCards.map(card => (<List.Item key={card._id} ><CardOverviewContainer key={card._id} cardId={card._id} /></List.Item>))
                            :
                            <p>No cards archived</p>
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