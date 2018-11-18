import React, { Component } from 'react';
import { Table, Dropdown, Input, Container, Button } from 'semantic-ui-react'
import './TeamMembers.css'
import AddMemberModal from '../../Modal/AddMemberModal';

const rightOptions = [
    {
        key: "admin",
        value: "Admin",
        text: "Admin"
    },
    {
        key: "member",
        value: "Member",
        text: "Member"
    }
]
class TeamMembers extends Component {

    constructor(){
        super()
        this.addUsers = this.addUsers.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.updateSearch = this.updateSearch.bind(this);
        this.state = {
                    }
    }

    componentWillMount() {
        this.props.updateSearchMembers("")
    }

    addUsers(users){
        this.props.addUsers(users)
    }
    handleChange(e, {value, id}) {
        this.props.changeRole(id, value)
    }

    updateSearch(e, { value }) {
        this.props.updateSearchMembers(value)
    }

    render(){
        return (
            <div className="team-members">
                <h2>Team members ({this.props.team.members.length})</h2>
                <Container className="action-team-members">
                    <div className="team-members-header"><Input placeholder='Search...' value={this.props.queryMember} onChange={this.updateSearch}/>
                    <Button className="leave-team-button" color="red" onClick={()=> { this.props.history.push('/home'); this.props.deleteMember(this.props.user._id) }}>Leave Team</Button></div>
                    {this.props.isAdmin
                    ?<AddMemberModal addUsers={this.addUsers} className="add-member"/>
                    : ""} 
                </Container>
                        {
                            this.props.team.members.length > 0 ?
                                <Table singleLine>  
                                    <Table.Body>
                                        {
                                             this.props.team.members.map(member => {

                                                return (
                                                    <Table.Row key={ member.member._id }>
                                                        <Table.Cell className="member-cell">
                                                            <div className="member-fullname">
                                                                <span className="span-fullname">{ member.member.fullName }</span>
                                                            </div>
                                                            <div className="member-right-dropdown">
                                                            {this.props.isAdmin
                                                            ?
                                                                <Dropdown
                                                                    defaultValue={member.role}
                                                                    id={member.member._id}
                                                                    options={rightOptions}
                                                                    onChange={this.handleChange}
                                                                    // value={this.state.currentRole}
                                                                />
                                                                :member.role}
                                                                
                                                            </div>
                                                            {this.props.isAdmin
                                                            ?<Button className="remove-member-button" color="red" onClick={()=>this.props.deleteMember(member.member._id)}>Remove</Button>
                                                            : ""
                                                            } 
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