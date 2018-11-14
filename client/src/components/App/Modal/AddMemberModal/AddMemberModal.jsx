import React, { Component } from 'react';
import { Modal, Button, Input, Segment, Checkbox, Container, Dropdown, Icon, Label } from 'semantic-ui-react'
import './AddMemberModal.css'
import UserServices from '../../../../services/UserServices';

class AddMemberModal extends Component {

    constructor(){
        super()
        this.state = {
            users: [],
            usersChecked: [],
            isOpen: false
        }
        this.fetchUsers = this.fetchUsers.bind(this)
        this.checkUser = this.checkUser.bind(this)
        this.addUsers = this.addUsers.bind(this)

    }


    async fetchUsers(event){
        const regex = event.target.value
        if(regex !== ''){
            try {
                const users = await UserServices.getUsersWithQuery(regex)
                this.setState({
                    users: users
                })
            } catch(error) {
                
            }
        } else {
            this.setState({
                users: []
            })
        }

    }

    checkUser(user, isChecked){
        if(!isChecked){
            this.setState({
                usersChecked: [...this.state.usersChecked, user]
            })
        } else {
            this.setState({
                usersChecked: [...this.state.usersChecked.filter(userChecked => userChecked._id !== user._id)]
            })
        }
    }
    
    addUsers(){
        this.props.addUsers(this.state.usersChecked)
    }

    render(){

        return (
            <Modal size="tiny" trigger={<Button className={`${this.props.className}`} color="teal">Add someone to the team</Button>}>
                <Modal.Header>Add a user to the team</Modal.Header>
                <Modal.Content>
                    <Input className="user-input" onChange={this.fetchUsers} placeholder="Enter the username or email"></Input>
                    {
                        this.state.users.length > 0 ?
                        <Container className="container-users-found">
                            <h3>Users found:</h3>
                            <div className="users-found">
                            {
                                this.state.users.map(user => {
                                    const isChecked = this.state.usersChecked.filter(userChecked => userChecked._id === user._id ).length === 1
                                    console.log(user)
                                    return (
                                        <div key={user._id} onClick={() => this.checkUser(user, isChecked)} className="container-user-item" >
                                            <Segment color={isChecked ? "green" : null}  >
                                                <span className="user-item">
                                                    <span className="user-item-info">{user.fullName} ({user.username})</span>
                                                    <Checkbox className="user-item-checkbox" checked={isChecked} />
                                                </span>
                                            </Segment>
                                        </div>
                                    )
                                })
                            }
                            </div>
                        </Container> :
                        null
                    }
                    {
                        this.state.usersChecked.length > 0 ?
                        <Container className="container-users-checked">
                            <h3>Users to add:</h3>
                            <Segment>
                            {
                                this.state.usersChecked.map(userChecked => {
                                    return (
                                        <Label onClick={() => this.checkUser(userChecked, true)}><span>{userChecked.username}</span><Icon className="user-checked-icon" name='remove'/></Label>
                                    )
                                })
                            }
                            </Segment>
                        </Container> :
                        null
                    }
                </Modal.Content>
                <Modal.Actions>
                    <Button negative>No</Button>
                    <Button positive icon='checkmark' labelPosition='right' content='Add' onClick={this.addUsers} />
                </Modal.Actions>
            </Modal>
        )
    }
}

export default AddMemberModal