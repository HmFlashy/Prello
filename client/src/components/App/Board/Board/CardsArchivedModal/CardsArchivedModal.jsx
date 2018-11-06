import React, { Component } from 'react';
import './CardsArchivedModal.css'
import { Button, List, Modal } from 'semantic-ui-react'
import CardOverviewContainer from './../../../../../containers/CardContainers/CardOverviewContainer'

class CardsArchivedModal extends Component {


    render(){
        return (
            <Modal size='tiny' trigger={this.props.trigger}>
                <Modal.Header>Archived cards</Modal.Header>
                <Modal.Content  className="list-card-archived">
                    <List>
                        {
                            this.props.archivedCards.length > 0 ?
                                this.props.archivedCards.map(card => (<List.Item key={card._id} ><CardOverviewContainer key={card._id} cardId={card._id} /></List.Item>))
                            :
                            null
                        }
                    </List>
                </Modal.Content>
                <Modal.Actions>
                    <Button negative>No</Button>
                    <Button positive icon='checkmark' labelPosition='right' content='Yes' />
                </Modal.Actions>
            </Modal>
        )
    }
}

export default CardsArchivedModal