import React, { Component } from 'react';
import { Table, Dropdown, Input, Container, Button } from 'semantic-ui-react'
import './TeamMembers.css'
import AddMemberModal from '../../Modal/AddMemberModal';

const rightOptions = [
    {
        key: "admin",
        value: "admin",
        text: "Admin"
    },
    {
        key: "normal",
        value: "normal",
        text: "Normal"
    }
]
class TeamMembers extends Component {


    render(){
        return (
            <div className="team-members">
                <h2>Team members ({this.props.team.members.length})</h2>
                <Container className="action-team-members">
                    <Input placeholder='Search...' />
                    <AddMemberModal className="add-member"/>
                </Container>
                        {
                            this.props.team.members.length > 0 ?
                                <Table singleLine>  
                                    <Table.Body>
                                        {
                                             this.props.team.members.map(member => {
                                                return (
                                                    <Table.Row>
                                                        <Table.Cell className="member-cell">
                                                            <div className="member-fullname">
                                                                <span className="span-fullname">{ member.fullname }</span>
                                                            </div>
                                                            <div className="member-right-dropdown">
                                                                <Dropdown
                                                                    defaultValue={rightOptions[0].value}
                                                                    options={rightOptions}
                                                                />
                                                            </div>
                                                            <Button className="remove-member-button" color="red">Remove</Button>
                                                        </Table.Cell>
                                                    </Table.Row>
                                                )
                                            })
                                        }
                                    </Table.Body>
                                </Table> :
                            <span>No member in this team</span>
                        }
            </div>
        )
    }
}

export default TeamMembers