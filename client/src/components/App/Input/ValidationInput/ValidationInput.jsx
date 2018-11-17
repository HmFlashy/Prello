import React, { Component } from 'react';
import { Modal, Button } from 'semantic-ui-react'

class ValidationInput extends Component {

    render() {
        return (
            <Modal size="mini" open={this.props.isVisible} onClose={() => this.props.onResult(false)}>
                <Modal.Header>{this.props.header}</Modal.Header>
                <Modal.Content>
                    <p>{this.props.content}</p>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={() => this.props.onResult(false)} negative>No</Button>
                    <Button onClick={() => this.props.onResult(true)} positive icon='checkmark' labelPosition='right' content='Yes' />
                </Modal.Actions>
            </Modal>
        )
    }
}

export default ValidationInput