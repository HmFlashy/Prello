import React, { Component } from 'react';
import './TeamDetails.css'
import { Menu, Segment, Container, Icon, Button } from 'semantic-ui-react';
import TeamBoards from '../TeamBoards';
import TeamMembers from '../TeamMembers';
import DynamicInput from "../../Input/DynamicInput"

class TeamDetails extends Component {

    constructor(props) {
        super(props)
        this.state = {
            activeItem: "boards"
        }
        this.handleItemClick = this.handleItemClick.bind(this)
        this.addUsers = this.addUsers.bind(this)
        this.deleteMember = this.deleteMember.bind(this)
        this.changeRole = this.changeRole.bind(this)


    }

    handleItemClick(e, { name }) {
        this.setState({
            activeItem: name
        })
    }

    addUsers(users) {
        this.props.addUsersToTeam(this.props.team._id, users)
    }
    deleteMember(memberId) {
        this.props.deleteMember(this.props.team._id, memberId)
    }
    changeRole(userId, role) {
        this.props.changeRole(this.props.team._id, userId, role)
    }


    render() {
        const { activeItem } = this.state
        return (
            <div className="team-layout">
                <div className="team-header">
                    <h1 className="team-name" style={{ fontWeight: "bold" }}><DynamicInput
                                    type='text'
                                    textToDisplay={this.props.team.name}
                                    placeholder={this.props.team.name}
                                    onValidate={(name) => this.props.updateTeamName(this.props.team._id, this.props.team.name, name.target.value)}
                                /></h1>
                               {this.props.isAdmin
                                ?
                                <div> <Button icon onClick={() => this.props.deleteTeam(this.props.team._id)} >
                            <Icon name='trash alternate' />
                        </Button></div>
                        :""}
                    
                </div>
                <div className="team-content">
                    <Menu attached='top' color="grey" className="menu-content" tabular>
                        <Menu.Item name='boards' active={activeItem === 'boards'} position="center-left" onClick={this.handleItemClick} />
                        <Menu.Item
                            name='members'
                            position="center-right"
                            active={activeItem === 'members'}
                            onClick={this.handleItemClick}
                        />
                    </Menu>

                    <Segment attached='bottom' className="item-content">
                        <Container className="item-info">
                            {
                                activeItem === "boards" ? <TeamBoards boards={this.props.boards} team={this.props.team} /> :
                                    activeItem === "members" ? <TeamMembers user= {this.props.user} history={this.props.history} isAdmin={this.props.isAdmin} changeRole={this.changeRole} deleteMember={this.deleteMember}
                                        updateSearchMembers={this.props.updateSearch}
                                        addUsers={this.addUsers} team={this.props.team} /> :
                                        <div>Error</div>
                            }
                        </Container>
                    </Segment>
                </div>
            </div>
        )
    }
}

export default TeamDetails