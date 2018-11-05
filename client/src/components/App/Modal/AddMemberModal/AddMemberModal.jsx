import React, { Component } from 'react';
import { Modal, Button, Input } from 'semantic-ui-react'
import './AddMemberModal.css'
import UserServices from '../../../../services/UserServices';

class AddMemberModal extends Component {

    constructor(){
        super()
        this.state = {
            users: []
        }
        this.fetchUsers = this.fetchUsers.bind(this)
    }


    async fetchUsers(event){
        const regex = event.target.value
        try {
            const users = await UserServices.getUsers(regex)
            this.setState({
                users: users
            })
        } catch(error) {

        }

    }

    render(){

        return (
            <Modal size="tiny" trigger={<Button className={`${this.props.className}`} color="teal">Add someone to the team</Button>}>
                <Modal.Header>Add a member to the team</Modal.Header>
                <Modal.Content>
                    <Input onChange={this.fetchUsers} placeholer="Enter the username or email"></Input>
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

export default AddMemberModal