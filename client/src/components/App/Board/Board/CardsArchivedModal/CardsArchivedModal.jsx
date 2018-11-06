import React, { Component } from 'react';
import './CardsArchivedModal.css'
import { Button, Icon, Modal } from 'semantic-ui-react'

class CardsArchivedModal extends Component {


    render(){
        return (
            <Modal size='tiny' trigger={this.props.trigger}>
                <Modal.Header>Delete Your Account</Modal.Header>
                <Modal.Content>
                    <p>Are you sure you want to delete your account</p>
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