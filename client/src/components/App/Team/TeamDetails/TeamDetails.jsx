import React, { Component } from 'react';
import './TeamDetails.css'
import { Menu, Segment, Container } from 'semantic-ui-react';
import TeamBoards from '../TeamBoards';
import TeamMembers from '../TeamMembers';

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
                    <h1 className="team-name" style={{ fontWeight: "bold" }}>{this.props.team.name}</h1>
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
                                activeItem === "boards" ? <TeamBoards team={this.props.team} /> :
                                    activeItem === "members" ? <TeamMembers changeRole={this.changeRole} deleteMember={this.deleteMember} addUsers={this.addUsers} team={this.props.team} /> :
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